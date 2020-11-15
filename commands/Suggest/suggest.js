const Discord = require("discord.js");
const config = require("../../config.json");
const suggest = require("../../models/suggest");

module.exports = {
      //Command Information
      name: "suggest",
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
    
    const suggestCode = Math.random().toString(36).substr(2, 8);

    // let announcementEmbed = new Discord.MessageEmbed()
    //         .setTitle("Suggestion")
    //         .setDescription(`${args.join(" ")}`)
    //         .setFooter(`SuggestID: ${suggestCode}`)
    // message.channel.send(announcementEmbed).then(function (message) {
    //   message.react("👍")
    //   message.react("👎")
    // });

    if (data.guild.suggestLogs == "null") {
      let announcementEmbed = new Discord.MessageEmbed()
      .setTitle("Suggestion Channel")
      .setColor(config.color)
      .setDescription(`This server does not have a suggestion channel. \n\nYou can run *r!suggest help* if you are the server owner`)
      return message.channel.send(announcementEmbed)
  }

  if (data.guild.suggestApproveLogs == "null") {
    let announcementEmbed = new Discord.MessageEmbed()
    .setTitle("Suggestion Approval Channel")
    .setColor(config.color)
    .setDescription(`This server does not have a suggestion approval channel. \n\nYou can run *r!suggest help* if you are the server owner`)
    return message.channel.send(announcementEmbed)
}

    if (!args.slice(0).join(" "))
        return message.channel.send(`You did not suggest anything!`);
    
    let approveChannel = data.guild.reportChannel;

    if (args[0] == "approve") {
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have the `MANAGE_MESSAGES` permission");
        let tagName = args.slice(1).join(" ");
        suggest.findOneAndDelete(
          { Guild: message.guild.id, SuggestID: tagName },
                async(err, data) => {
                  if(err) throw err;
                  let suggestApprove = new Discord.MessageEmbed()
                  .setTitle("Approved Suggestion")  
                  .addField("Suggestion", `${data.Content}`)
                  .setFooter(`SuggestID: ${data.SuggestID}`)
                  .setColor("#FA8334")
                  client.channels.cache.get(approveChannel).send(suggestApprove);
                  return message.channel.send(`${tagName} was Approved`)
                }
            );
    } else if (args[0] == "deny") {
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have the `MANAGE_MESSAGES` permission");
      let tagName = args.slice(1).join(" ");
      suggest.findOneAndDelete(
        { Guild: message.guild.id, SuggestID: tagName },
        async(err, data) => {
          if(err) throw err;
          return message.channel.send(`Suggestion **${data.SuggestID}** was denied \n**Content**: ${data.Content}`)
        }
      )
    } else {
            let newData = new suggest({
              Guild: message.guild.id,
              Content: args.join(" "),
              MessageID: message.id,
              SuggestID: suggestCode,
            });
            newData.save();
            message.channel.send(`Thank you for the suggestion!`);
            let suggestNew = new Discord.MessageEmbed()
              .setTitle("New Suggestion")  
              .addField("Suggestion", `${args.join(" ")}`)
              .setFooter(`SuggestID: ${suggestCode}`)
              .setColor("#FA8334")
              client.channels.cache.get(`${data.guild.reportChannel}`).send(suggestNew).then(function (message) {
                  message.react("👍")
                  message.react("👎")
                });
        }
    }

}