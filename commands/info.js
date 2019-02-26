const Discord = require("discord.js");
const createdBy = "LapisOnTheMoon#2526"

module.exports.run = async (bot, message, args) => {
  let bIcon = bot.user.displayAvatarURL;
  let bEmbed = new Discord.RichEmbed()
  .setDescription("Bot Info lol")
  .setColor("#26619c")
  .setThumbnail(bIcon)
  .addField("Name", bot.user.username)
  .addField("Created On", bot.user.createdAt)
  .addField("Created By", createdBy)

  return message.channel.send(bEmbed);
}

module.exports.help = {
  name: "info"
}
