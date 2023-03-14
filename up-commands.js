const { REST, Routes } = require("discord.js");
// DOTENV
const dotenv = require("dotenv");
dotenv.config();
const { GUILD_ID, DISCORD_TOKEN: token, APP_ID } = process.env;

//COMMANDS
const fs = require("node:fs");
const path = require("node:path");

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const commands = [];
for (i of commandFiles) {
  const command = require(`./commands/${i}`);
  commands.push(command.data);
  console.log(commands);
}

// REST
const rest = new REST({ version: "10" }).setToken(token);

// DEPLOY
(async () => {
  try {
    console.log(`Deploy de ${commands.length} comandos...`);
    console.log(commands);
    const data = await rest.put(
      Routes.applicationGuildCommands(APP_ID, GUILD_ID),
      { body: commands }
    );
    console.log("Comandos registrados...");
  } catch (e) {
    console.log(e.message);
  }
})();
