// whenever "client" is mentioned it means the bot
// set up dotenv to read the .env file
require('dotenv').config()
const { EmbedBuilder, ActivityType, messageLink } = require('discord.js');


// Require the necessary discord.js classes
const { Client, GatewayIntentBits, IntegrationApplication } = require('discord.js');
const token = process.env.BOT_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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

    console.log(interaction.ChatInputCommandInteraction);

	const { commandName } = interaction;
  
  // Basic admin commands (Needing permissions)

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}\nServer ID: ${interaction.guild.id}`);
	} else if (commandName === 'user') {
	  await interaction.reply((`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`));
  } else if (commandName === 'chain') {
    await interaction.reply({ content: 'hello', ephemeral: true });
    //await interaction.followUp('who deleted this')
    //console.log(interaction);
    //const channel = client.channels.cache.get(message.channel.id);
    //channel.send('content');
  } else if (commandName === 'echo') {
    console.log('echo command was used')
}
});

// Login to Discord with your client's token
client.login(token);