// DOTENV
const dotenv = require("dotenv");
dotenv.config();
const { DISCORD_TOKEN: token } = process.env;

//COMMANDS IMPORT
const fs = require("node:fs");
const path = require("node:path");

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
client.commands = new Collection();

module.exports = {
  client: client,
};

for (i of commandFiles) {
  const filePath = path.join(commandsPath, i);
  const command = require(filePath);
  command.data && command.execute
    ? client.commands.set(command.data.name, command)
    : console.log(
        `Comando inválido ${
          commandsPath + commandFiles
        }, sem "data" ou "execute"...`
      );
}
// LOGIN
client.once(Events.ClientReady, (c) => {
  console.log(`Logado como ${c.user.tag}`);
});
client.login(token);

// HANDLE REPLY
const res = (interaction) => {
  try {
    const resposta = interaction.client.commands.get(interaction.commandName);
    resposta.execute(interaction);
  } catch (e) {
    interaction.reply(e.message);
  }
};

// LISTENER
client.on(Events.InteractionCreate, (interaction) => {
  !interaction.isChatInputCommand()
    ? interaction.reply("Comando não encontrado :(")
    : res(interaction);
});
