const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getURL } = require("../hooks/steamurl");

const { regUser } = require("../hooks/request");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("registrarlink")
    .setDescription(
      "ADMIN: Use /registrarLink @player 'Link do perfil da Steam'"
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
    .addUserOption((option) =>
      option
        .setName("player")
        .setDescription("Cadastrar esse user")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("Cadastrar com esse link de perfil")
        .setRequired(true)
    ),

  async execute(i) {
    try {
      var args = i.options;
      const link = args.getString("link");
      const player = args.getUser("player");
      const id64 = await getURL(link);
      let valido = await regUser(player, id64);
      if (valido) {
        await i.reply(
          `${player} foi cadastrado com a id64: ${id64} com sucesso! Link: ${valido}`
        );
      } else {
        await i.reply(
          `${player} não foi cadastrado, o perfil ${link} não foi encontrado! Verifique o link do perfil...`
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
};
