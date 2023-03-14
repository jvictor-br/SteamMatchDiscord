const { db } = require("../firestore/firestore");
const { getDoc, doc, setDoc } = require("firebase/firestore");
// DOTENV
const dotenv = require("dotenv");
dotenv.config();
const { GUILD_ID } = process.env;

module.exports = {
  addVinc: async (discord, id64, player) => {
    var disc = discord.id || discord;
    try {
      const data = { id64, player };
      await setDoc(doc(db, "d_players", disc), data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getSteamID: async (discord) => {
    const resp = await getDoc(doc(db, "d_players", discord));
    const res = resp.data();
    try {
      if (res.id64) {
        return res.id64;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
  addVincSum: async (disc, data, force = false) => {
    const cadastro = await getDoc(doc(db, "d_gamesVinc", disc));
    const datatime = new Date();
    var timenow = parseInt(datatime.getTime() / 1000);
    var timedoc = () => {
      try {
        const cadt = cadastro.data().time;
        return cadt;
      } catch (error) {
        return 0;
      }
    };
    if (timenow - timedoc() >= 10800 || force) {
      try {
        await setDoc(doc(db, "d_gamesVinc", disc), data);
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  },
  getSum: async (disc) => {
    const res = await getDoc(doc(db, "d_gamesVinc", disc));
    if (res.data() !== undefined) {
      return res.data();
    } else {
      return false;
    }
  },
  saveMatch: async (time, data) => {
    const cod = time.toString();
    const res = await setDoc(doc(db, "match", cod), data);
    return true;
  },
  reqMatch: async (cod) => {
    const res = await getDoc(doc(db, "match", cod));
    return res;
  },
};
