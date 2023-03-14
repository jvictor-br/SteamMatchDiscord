const { default: fetch } = require("node-fetch");

// DOTENV
const dotenv = require("dotenv");
dotenv.config();
const { API_KEY } = process.env;

module.exports = {
  getURL: async (link) => {
    try {
      console.log(link);
      try {
        var van = link.split("https://steamcommunity.com/id/")[1].split("/")[0];
      } catch (error) {
        var van = link;
      }
      const res = await fetch(
        `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${API_KEY}&vanityurl=${van}`
      );
      const resJson = await res.json();
      return resJson.response.steamid;
    } catch (error) {
      return false;
    }
  },
};
