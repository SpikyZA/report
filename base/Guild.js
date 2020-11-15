const mongoose = require("mongoose"),
Schema = mongoose.Schema,
config = require("../config.json");

module.exports = mongoose.model("Guild", new Schema({

    /* REQUIRED */
    id: { type: String }, // Discord ID of the guild

    /* STATS */
    // registeredAt: { type: Number, default: Date.now() }, // Registered date of the member

    /* CONFIGURATION */
    prefix: { type: String, default: config.prefix },

    reportChannel: { type: String, default: "null" },

    useEmbeds: { type: String, default: "false" },

    suggestLogs: { type: String, default: "null"},

    suggestApproveLogs: { type: String, default: "null"},


}));
