const Discord = require("discord.js");
const config = require("../../config.json")
const imgur = require("imgur")

module.exports = {
      //Command Information
      name: "report",
      description: "Sets the report channel",
      usage: "`prefix reportchannel #channelname`",
      enabled: true,
      guildOnly: true,
      aliases: ["channel"],
      memberPermissions: ["MANAGE_MESSAGES"],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {

        const msg = args.join(" ");
        
        let messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null;
        imgur.setClientId('b4a5295aceba8f2');
        imgur.setAPIUrl('https://api.imgur.com/3/');

        if (data.guild.reportChannel == "null") {
            let announcementEmbed = new Discord.MessageEmbed()
            .setTitle("Report Log Channel")
            .setColor(config.color)
            .setDescription(`This server does not have a report channel setup yet. \n\nYou can run the *rb!helpsetup* to see how to do it`)
            return message.channel.send(announcementEmbed)
        }
        
        if(args.length == 0){

              let announcementEmbed = new Discord.MessageEmbed()
              .setTitle("Report Empty")
              .setColor(config.color)
              .setDescription(`You need to report something?`)
              return message.channel.send(announcementEmbed)

        }  
        else {
            let ifimage;
            let imageUrl;
            if(messageAttachment == null)
                ifimage = "No";
            else
                ifimage = "Yes";

            let announcementEmbed = new Discord.MessageEmbed()
            .setTitle(`<:check:723597104261365953> New Report from **${message.member.user.username}**`)
            .setColor(config.color)
            .addField("Reporter/Reported By:", `${message.member.user}\n${message.member.user.username}#${message.member.user.discriminator} — ID: ${message.member.id}`)
            .addField("Contents of the Report:", `${msg}`)
            .addField("Is there an image?", `${ifimage}`)
                //announcementEmbed.setImage(imageUrl)
            message.delete({ timeout: 1000,});
            message.reply("Thank you for logging a report! <a:PusheenCompute:723598493112991767>");
            client.channels.cache.get(`${data.guild.reportChannel}`).send(announcementEmbed)
            if(ifimage == "Yes") {
                imgur.uploadUrl(`${messageAttachment}`)
                .then(function (json) {
                    client.channels.cache.get(`${data.guild.reportChannel}`).send(json.data.link)
                })
                .catch(function (err) {
                    console.error(err.message);
                });
            }
            
        }


    },
};