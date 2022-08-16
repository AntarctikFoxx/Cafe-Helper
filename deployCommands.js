require('dotenv').config();
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const clientId = process.env.CLIENT_ID, guildId = process.env.GUILD_ID, token = process.env.BOT_TOKEN;

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with basic server info'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with basic user info')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

//Do a reset first and delete all old commands:

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
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

    


