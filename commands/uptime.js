const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
// let totalSeconds = (client.uptime / 1000);
// let days = Math.floor(totalSeconds / 86400);
// let hours = Math.floor(totalSeconds / 3600);
// totalSeconds %= 3600;
// let minutes = Math.floor(totalSeconds / 60);
// let seconds = totalSeconds % 60; 

module.exports.run = async (bot, message, args) => {
    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60); 
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    let noDays = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    let noHours = `${minutes} minutes and ${seconds} seconds`;
    let noMinutes = `${seconds} seconds`;
    if (minutes === 0) {
        message.channel.send("I've been awake for " + noMinutes);
    } else if (hours === 0) {
        message.channel.send("I've been awake for " + noHours);
    } else if (days === 0) {
        message.channel.send("I've been awake for " + noDays);
    } else {
        message.channel.send("I've been awake for " + uptime);
    }
  }
  
  module.exports.help = {
    name: "uptime"
  }