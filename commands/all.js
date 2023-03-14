const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("all")
    .setDescription("Retorna todos os usuarios do canal que foi chamado"),

  async execute(i) {
    try {
      var members = [];
      i.member.voice.channel.members.each((member) => {
        members.push(member.user.id);
      });
      var str = "";
      members.map((e, i) => {
        var ec = `<@${e}>`;
        if (i + 1 === members.length) {
          str = str + ec;
        } else {
          str = str + ec + ", ";
        }
      });
      var members = [];
      i.client.users.cache.delete(i.user.id);
      await i.reply(str);
      
    } catch (error) {
      i.reply("Não consegui encontrar alguem...")
    }

  },
};
