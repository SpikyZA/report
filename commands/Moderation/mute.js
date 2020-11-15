const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
      //Command Information
      name: "mute",
      description: "Clear specific number of messages",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: ["MANAGE_MESSAGES"],
      botPermissions: ["MANAGE_MESSAGES"],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {

	  // You need to parse those arguments, I'll leave that to you.

  	// This is the role you want to assign to the user
      let mutedRole = message.guild.roles.cache.find(role => role.name == "Muted");
      if(!mutedRole) return message.reply("Please create a Muted role");
      // This is the member you want to mute
      let member = message.mentions.members.first();
      let minutes = args[1];
      let reason = args[2];

        
     
      // Mute the user
      member.roles.add(mutedRole);
      message.reply(`Muted by ${message.author.tag} for ${minutes} minutes. Reason: ${reason}`);

      // Unmute them after x minutes
      setTimeout(() => {
        member.roles.remove(mutedRole, `Temporary mute expired.`);
      }, minutes * 60000); // time in ms

    },
};
