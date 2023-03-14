const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { regGameVinc } = require("../hooks/request");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("vincgames")
    .setDescription("ADMIN: Use /vincgames @player")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
    .addUserOption((option) =>
      option
        .setName("player")
        .setDescription("Vincular jogos desse player")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("force")
        .setDescription("Ignora restrição de tempo.")
        .setRequired(false)
    ),

  async execute(i) {
    try {
      var args = i.options;
      const player = args.getUser("player");
      const force = args.getBoolean("force");
      const res = await regGameVinc(player, force);
      if (res) {
        i.reply(`Jogos foram vinculados com sucesso ao player ${player}...`);
      } else {
        i.reply(
          `Verifique se o jogador foi devidamente registrado.\nTente isso:\n/registrar ${player} ID64DASTEAM12345\nOu então voce já atualizou os Jogos a pouco tempo, nesse caso tente:\n/vincgames @player true`
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
};
