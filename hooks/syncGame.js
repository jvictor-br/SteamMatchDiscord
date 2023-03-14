const { db } = require("../firestore/firestore");
const { getDoc, doc, setDoc } = require("firebase/firestore");
const { default: fetch } = require("node-fetch");

const requestApp = async (appid) => {
  const host = `https://store.steampowered.com/api/appdetails?appids=${appid}`;
  const j = await fetch(host, { headers: { appid: appid } });

  var dec = {};
  try {
    dec = await j.json();
    return dec;
  } catch {
    console.log("deu erro no request");
  }
};

const addDb = async (appid, data) => {
  try {
    data["players"] = 0;
    await setDoc(doc(db, "jogos", appid), data);
    return true;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  syncGame: async (appId) => {
    try {
      const ref = doc(db, "jogos", appId);
      const res = await getDoc(ref);
      const result = res.data();
      if (result === undefined) {
        const resApi = await requestApp(appId);
        const appr = appId.toString();
        const data = resApi[appr].data;
        try {
          if (data.name) {
            await addDb(appId, data);
            return data;
          } else {
            return false;
          }
        } catch (error) {
          await addDb(appId, { data: { name: "Jogo removido" } });
          return error.message;
        }
      } else {
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
