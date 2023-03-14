const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { regGameVinc } = require("../hooks/request");
const { getURL } = require("../hooks/steamurl");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("steamid")
    .setDescription("ADMIN: Use /steamid (link do perfil steam)")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("Link do perfil steam")
        .setRequired(true)
    ),

  async execute(i) {
    try {
      var args = i.options;
      const link = args.getString("link");
      const res = await getURL(link);
      if (res) {
        i.reply(`${link}\nAqui está o id64: ${res}`);
      } else {
        i.reply(`Não foi possivel encontrar o id64 para esse perfil ${link}`);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
