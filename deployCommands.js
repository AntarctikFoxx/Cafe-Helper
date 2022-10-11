require('dotenv').config();
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('node:fs');
const path = require('node:path');
const clientId = process.env.CLIENT_ID, guildId = process.env.GUILD_ID, token = process.env.BOT_TOKEN;

// All commands plus names

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with basic server info'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with basic user info'),
	//new SlashCommandBuilder().setName('custom').setDescription('Creates an embed with the currently configured settings.')
];

const commandsPath = path.join(__dirname, 'modules');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

// Do a reset first and delete all old commands:

// for guild-based commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);

// Now re-add the new ones
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands: ', commands))
	.catch(console.error);