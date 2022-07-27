const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns bot ping.'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `API Latency: ${client.ws.ping}\nClientPing: ${message.createdTimestamp - interaction.createdTimestamp}`
        console.log(newMessage)
        await interaction.editReply({
            content: newMessage
        });
    }
}

// Ping latency from guild to server and back. 