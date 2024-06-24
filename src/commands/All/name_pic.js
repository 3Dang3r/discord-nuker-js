const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dmass')
        .setDescription('Change the server name and picture.'),
    
    async execute(interaction) {
        const member = interaction.user
        try {
            await interaction.guild.setName(config.newservername);
            await interaction.guild.setIcon(config.newservericon);

            await member.send('Server name and picture have been changed successfully!');
        } catch (error) {
            console.error(error);
            await member.send('There was an error while changing the server name or picture.');
        }
    }
};
