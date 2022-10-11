// whenever "client" is mentioned it means the bot
// set up dotenv to read the .env file
require('dotenv').config()

// Require the necessary discord.js classes

const { Client, Collection, GatewayIntentBits, IntegrationApplication, EmbedBuilder, ActivityType, messageLink } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');
const token = process.env.BOT_TOKEN, clientId = process.env.CLIENT_ID, guildId = process.env.GUILD_ID;

// creates a new instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'modules');
// iterate through the folders and import any .js that you find.
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready it will run this code (only once)
// Custom presence and status
client.once('ready', () => {
	console.log('Ready!');
  client.user.setPresence({ activities: [{ name: 'Cat Videos', type: ActivityType.Watching }], status: 'online' });
  console.log(client.user);
});

// Respond to
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;
  
  // Basic admin commands
	if (commandName === 'ping') {
		// await interaction.reply('Pong!');
		interaction.deferReply();
		interaction.deleteReply();
		interaction.channel.send("Pong!");
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}\nServer ID: ${interaction.guild.id}`);
	} else if (commandName === 'user') {
	  await interaction.reply((`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`));
  }

	/* Dynamic event listening - https://discordjs.guide/creating-your-bot/command-handling.html#dynamically-executing-commands */
  const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

// Login to Discord with your client's token
client.login(token);