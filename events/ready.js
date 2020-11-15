const { prefix } = require("../config.json");

const chalk = require("chalk");

module.exports = async (client) => {
    try {
        client.logger.ready(`${client.user.tag} is now up and running!`);
    } catch (e) {
        console.log(e);
    }

    let activities = [ `beta testers`, `version beta0.1`], i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000);

};