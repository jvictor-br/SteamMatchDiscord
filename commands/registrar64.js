const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const { regUser } = require("../hooks/request");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("registrar64")
    .setDescription("ADMIN: Use /registrar64 @player id64")
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
        .setName("id64")
        .setDescription("Cadastrar com essa id64 da Steam")
        .setRequired(true)
    ),

  async execute(i) {
    try {
      var args = i.options;
      const id64 = args.getString("id64");
      const player = args.getUser("player");
      let valido = await regUser(player, id64);
      if (valido) {
        await i.reply(
          `<@${i.user.id}> o usuario ${player} foi cadastrado com a id64: ${id64} com sucesso! Link: ${valido}`
        );
      } else {
        await i.reply(
          `<@${i.user.id}> o usuario ${player} não foi cadastrado, a chave ${id64} não foi encontrada!`
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
};
