const { SlashCommandBuilder } = require("discord.js");
const { getMatch } = require("../hooks/match");
const { saveMatch } = require("../hooks/useFirebase");

const newsplit = (array, max) => {
  var saida = [];
  var momento = "";
  array.map((e, i) => {
    if (e === undefined) {
      return;
    }
    let quebra = e + "\n";
    if (i === array.length - 1) {
      saida.push(momento + quebra);
      return;
    }
    if (momento.length + quebra.length > max) {
      saida.push(momento);
      momento = quebra;
    } else {
      momento = momento + quebra;
    }
  });
  return saida;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("match")
    .setDescription("Retorna jogos tem comum entre os players da call."),

  async execute(i) {
    try {
      await i.reply("Trabalhando nisso... :saluting_face:");
      var members = [];
      i.member.voice.channel.members.each((member) => {
        members.push(member.user.id);
      });
      const match = await getMatch(members);
      const cod = members[0];
      const semUnd = [];

      const matchName = match.map((e) => {
        try {
          semUnd.push(e.name);
          return e.name;
        } catch (error) {}
      });

      const matchappid = match.map((e) => {
        try {
          return e.appid;
        } catch (error) {}
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
      var quais = "";
      for (const i of matchName) {
        if (i !== undefined) {
          quais = quais + "\n" + i;
        }
      }
      const resposta = newsplit(matchName, 1900);
      const respond = await Promise.all(
        resposta.map(async (res, ind) => {
          if (ind === 0) {
            await i.followUp("Missão dada é missão cumprida :smirk:")
            await i.followUp(
              "Entre os players " +
                str +
                `Foram encontrados ${matchName.length} jogos em comum...\n${res} `
            );
          } else {
            i.followUp(`... ${str}\n${res}`);
          }
        })
      );
      const save = await saveMatch(cod, { semUnd });
      if (save) {
        i.followUp(
          `Código da busca ** ${cod} **\nVocê pode usar mais tarde para fazer um sorteio :wink:`
        );
      }
    } catch (error) {
      console.log(error.message);
      i.followUp("Não consegui dessa vez :cry:");
    }
  },
};
