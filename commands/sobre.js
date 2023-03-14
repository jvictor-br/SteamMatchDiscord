const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("sobre")
    .setDescription("Sobre o bot"),

  async execute(i) {
    try {
      await i.reply(`Oi <@${i.user.id}>\nEste bot foi idealizado por nEO#5169 e desenvolvido por J.Victor#0357 :sunglasses: `);
    } catch (error) {
      console.log(error)
    }
  },
};
