const { SlashCommandBuilder } = require("discord.js");
const { sortear } = require("../hooks/sortear");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("sort")
    .setDescription("Use /sort CodigoDoMatch")
    .addStringOption((option) =>
      option
        .setName("match")
        .setDescription("Codigo do match")
        .setRequired(true)
    ),

  async execute(i) {
    try {
      var args = i.options;
      const match = args.getString("match");
      const prem = await sortear(match);
      await i.reply(
        "Otima decisão, não ha nada melhor que deixar o acaso decidir as coisas :smirk:"
      );
      if (prem) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        i.followUp("Rufem os tambores... :drum: :drum: :drum: ");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await i.followUp(
          "Tannnn DAMMMMMM: :tada: :tada: :tada: \n" +
            prem +
            "\nEspero que goste, não foi minha culpa hein :upside_down:"
        );
      } else {
        await i.followUp(
          "Algo muito estranho ocorreu... Por algum motivo não consegui escolher um game :cry:"
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
};
