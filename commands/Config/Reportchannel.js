const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
      //Command Information
      name: "reportchannel",
      description: "Sets the report channel",
      usage: "`prefix reportchannel #channelname`",
      enabled: true,
      guildOnly: true,
      aliases: ["rchannel"],
      memberPermissions: ["MANAGE_MESSAGES"],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {

        // let prefix = args[0];
        
        if(args.length == 0){

            if(data.guild.reportChannel == "null") {
              let announcementEmbed = new Discord.MessageEmbed()
              .setTitle("Report Log Channel")
              .setColor(config.color)
              .setDescription(`This server does not have a report channel setup yet. \n\nYou can run the *r!helpsetup* to see how to do it`)
              return message.channel.send(announcementEmbed)
            }

            else {
            let announcementEmbed = new Discord.MessageEmbed()
            .setTitle("Report Log Channel")
            .setColor(config.color)
            .setDescription(`This servers report log channel is: <#${data.guild.reportChannel}>`)
            return message.channel.send(announcementEmbed)
        //   return message.channel.send("This servers report log channel is: " + `<#${data.guild.reportchannel}>`);
            }
        }
  
        else {
          let channel = message.mentions.channels.first().id;
          data.guild.reportChannel = channel;
          await data.guild.save();
          let announcementEmbed = new Discord.MessageEmbed()
          .setTitle("Report Log Channel")
          .setColor(config.color)
          .setDescription(`This servers report log channel is now set to: <#${data.guild.reportChannel}>`)
          return message.channel.send(announcementEmbed)
          //return message.channel.send("Server report channel updated to " + `<#${data.guild.reportchannel}>`)
        }


    },
};