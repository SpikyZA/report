const Discord = require("discord.js");
const moment = require('moment');
const emojis = require('../../tools/emojis.json');
//const { trimArray } = require('../../tools/Util');
const statuses = {
  online: `${emojis.online} \`Online\``,
  idle: `${emojis.idle} \`AFK\``,
  offline: `${emojis.offline} \`Offline\``,
  dnd: `${emojis.dnd} \`Do Not Disturb\``
};
const flags = {
    DISCORD_EMPLOYEE: `${emojis.discord_employee} \`Discord Employee\``,
    DISCORD_PARTNER: `${emojis.discord_partner} \`Partnered Server Owner\``,
    BUGHUNTER_LEVEL_1: `${emojis.bughunter_level_1} \`Bug Hunter (Level 1)\``,
    BUGHUNTER_LEVEL_2: `${emojis.bughunter_level_2} \`Bug Hunter (Level 2)\``,
    HYPESQUAD_EVENTS: `${emojis.hypesquad_events} \`HypeSquad Events\``,
    HOUSE_BRAVERY: `${emojis.house_bravery} \`House of Bravery\``,
    HOUSE_BRILLIANCE: `${emojis.house_brilliance} \`House of Brilliance\``,
    HOUSE_BALANCE: `${emojis.house_balance} \`House of Balance\``,
    EARLY_SUPPORTER: `${emojis.early_supporter} \`Early Supporter\``,
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: `${emojis.verified_bot} \`Verified Bot\``,
    VERIFIED_DEVELOPER: `${emojis.verified_developer} \`Early Verified Bot Developer\``
  };



module.exports = {
    //Command Information
    name: "userinfo",
    description: "Get the currently latency of the bot",
    usage: "ping",
    enabled: true,
    guildOnly: true,
    aliases: [],
    memberPermissions: [],
    botPermissions: ["SEND_MESSAGES"],
    nsfw: false,
    cooldown: 5000,
    ownerOnly: false,

    async execute(client, message, args, data) {

      const member = message.mentions.members.first() || message.member;
      //const userFlags = (await member.user.fetchFlags()).toArray();
      const activities = [];
      let customStatus;
      for (const activity of member.presence.activities.values()) {
        switch (activity.type) {
          case 'PLAYING':
            activities.push(`Playing **${activity.name}**`);
            break;
          case 'LISTENING':
            if (member.user.bot) activities.push(`Listening to **${activity.name}**`);
            else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
            break;
          case 'WATCHING':
            activities.push(`Watching **${activity.name}**`);
            break;
          case 'STREAMING':
            activities.push(`Streaming **${activity.name}**`);
            break;
          case 'CUSTOM_STATUS':
            customStatus = activity.state;
            break;
        }
      }
      
      // Trim roles
      // let roles = message.client.utils.trimArray(member.roles.cache.array().filter(r => !r.name.startsWith('#')));
      // roles = message.client.utils.removeElement(roles, message.guild.roles.everyone)
      //   .sort((a, b) => b.position - a.position).join(' ');
      
      const embed = new Discord.MessageEmbed()
        .setTitle(`${member.displayName}'s Information`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addField('User', member, true)
        .addField('Discriminator', `\`#${member.user.discriminator}\``, true)
        .addField('ID', `\`${member.id}\``, true)
        .addField('Status', statuses[member.presence.status], true)
        .addField('Bot', `\`${member.user.bot}\``, true)
        .addField('Color Role', member.roles.color || '`None`', true)
        .addField('Highest Role', member.roles.highest, true)
        .addField('Joined server on', `\`${moment(member.joinedAt).format('MMM DD YYYY')}\``, true)
        .addField('Joined Discord on', `\`${moment(member.user.createdAt).format('MMM DD YYYY')}\``, true)
        .addField('Roles', `${member.roles.cache.map(role => role.toString()).join(' ')}`)
        //.addField('Roles', roles || '`None`')
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(member.displayHexColor);
      if (activities.length > 0) embed.setDescription(activities.join('\n'));
      if (customStatus) embed.spliceFields(0, 0, { name: 'Custom Status', value: customStatus});
      // if (userFlags.length > 0) embed.addField('Badges', userFlags.map(flag => flags[flag]).join('\n'));
      message.channel.send(embed);


    },
};