const Discord = require("discord.js");

const config = require("./../config.json");
guildsDB = require("./../base/Guild.js"),

//Create Guilds Database
module.exports.getGuildDB = async function (guildID){

  let guildDB = await guildsDB.findOne( { id: guildID } );

//   guildsDB.countDocuments({ prefix: ';;', number: { $gte: 89 // if larger than} }, function (err, count) {
//   console.log(count);
// });

  if(guildDB){
    return guildDB;
  } else {
    guildDB = new guildsDB({
      id: guildID
    })
    await guildDB.save().catch(err => console.log(err));
    return guildDB;
  }
}

