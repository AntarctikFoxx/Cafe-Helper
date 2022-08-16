//set up dotenv to read the .env file
require('dotenv').config()



// Require the necessary discord.js classes
const { Client, GatewayIntentBits, IntegrationApplication } = require('discord.js');
const token = process.env.BOT_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Respond to
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

    console.log(interaction.options.data);

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply((`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`));
	}
});


// Sarcasmify function
function sarcasmify(plainText) {
    let sarcasticText = '';
    const plainTextArray = plainText.toString().toLocaleLowerCase().split('');

    plainTextArray.map((item, index) => {
      if (index % 2 === 0 && item !== ' ') {
        sarcasticText += item.toString().toUpperCase();
      } else {
        sarcasticText += item.toString();
      }
    });
    return sarcasticText;
  };

// Login to Discord with your client's token
client.login(token);