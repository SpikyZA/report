const Discord = require("discord.js");
const config = require("../../config.json");
const suggest = require("../../models/suggest");

module.exports = {
      //Command Information
      name: "suggestapproval",
      description: "Sets the report channel",
      usage: "`prefix reportchannel #channelname`",
      enabled: true,
      guildOnly: true,
      aliases: ["sac"],
      memberPermissions: ["MANAGE_MESSAGES"],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {
    
      if(args.length == 0){

        if(data.guild.suggestApproveLogs == "null") {
          let announcementEmbed = new Discord.MessageEmbed()
          .setTitle("Suggestions Approval Channel")
          .setColor(config.color)
          .setDescription(`This server does not have a Suggestions **Approval** Channel setup yet. \n\nYou can run \`r!help suggestchannel\` to find out more`)
          return message.channel.send(announcementEmbed)
        }

        else {
        let announcementEmbed = new Discord.MessageEmbed()
        .setTitle("Suggestions Approval Channel")
        .setColor(config.color)
        .setDescription(`This servers Suggestions **Approval** Channel is: <#${data.guild.suggestApproveLogs}>`)
        return message.channel.send(announcementEmbed)
    //   return message.channel.send("This servers report log channel is: " + `<#${data.guild.reportchannel}>`);
        }
    }

    else {
      let channel = message.mentions.channels.first().id;
      data.guild.suggestApproveLogs = channel;
      await data.guild.save();
      let announcementEmbed = new Discord.MessageEmbed()
      .setTitle("Successfully Set Suggestions Approval Channel")
      .setColor(config.color)
      .setDescription(`This servers Suggestions **Approval** Channel is now set to: <#${data.guild.suggestApproveLogs}>`)
      return message.channel.send(announcementEmbed)
      //return message.channel.send("Server report channel updated to " + `<#${data.guild.reportchannel}>`)
    }

    }

}