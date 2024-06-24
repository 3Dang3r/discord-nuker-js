 
        // ███╗   ██╗██╗   ██╗██╗  ██╗███████╗██████╗ 
        // ████╗  ██║██║   ██║██║ ██╔╝██╔════╝██╔══██╗
        // ██╔██╗ ██║██║   ██║█████╔╝ █████╗  ██████╔╝
        // ██║╚██╗██║██║   ██║██╔═██╗ ██╔══╝  ██╔══██╗
        // ██║ ╚████║╚██████╔╝██║  ██╗███████╗██║  ██║
        // ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
                                                   
const fs = require('fs');
const {Collection,Client,GatewayIntentBits,ActivityType, EmbedBuilder} = require('discord.js');
const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildVoiceStates,
  ],
});
client.commands = new Collection();
const config = require('./config.json')

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

const process = require('node:process')

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

(async () => {
  for (file of functions) {
      require(`./functions/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./src/events");
  client.handleCommands(commandFolders, "./src/commands");
  client.login(config.token)
})();


setInterval(() => {
  client.user.setPresence({
    activities: [{ name: `999`, type: ActivityType.Watching }],
    status: 'dnd',
  });
}, 20000); 