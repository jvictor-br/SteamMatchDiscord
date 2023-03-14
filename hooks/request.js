const { db } = require("../firestore/firestore");
const { getDoc, doc, setDoc } = require("firebase/firestore");
const { default: fetch } = require("node-fetch");
const { addVinc, getSteamID, addVincSum, getSum } = require("./useFirebase");
// DOTENV
const dotenv = require("dotenv");
dotenv.config();
const { API_KEY } = process.env;

module.exports = {
  regUser: async function (disc, steam) {
    try {
      const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steam}`;
      let response = await fetch(url, {
        headers: { id: steam },
      });
      try {
        let resJson = await response.json();
        let profile = resJson.response.players[0].profileurl;
        addVinc(disc, steam, resJson.response.players[0]);
        return profile;
      } catch (error) {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  },
  regGameVinc: async (disc, force = false) => {
    const id = disc.id || disc;
    const steam = await getSteamID(id);
    if (steam) {
      const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steam}&format=json`;
      const response = await fetch(url);
      const resJson = await response.json();
      const total = resJson.response.game_count;
      const games = resJson.response.games;
      const datatime = new Date();
      var time = parseInt(datatime.getTime() / 1000);
      const data = { total, steam, games, time };
      const res = addVincSum(disc.id || disc, data, force);
      return res;
    } else {
      return false;
    }
  },
};
