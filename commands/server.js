const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let sIcon = message.guild.iconURL;
  let sEmbed = new Discord.RichEmbed()
  .setDescription("Server Info")
  .setColor("#26619c")
  .setThumbnail(sIcon)
  .addField("Name", message.guild.name)
  .addField("Created On", message.guild.createdAt)
  .addField("You Joined", message.member.joinedAt)
  .addField("Total Members", message.guild.memberCount)

  return message.channel.send(sEmbed);
}

module.exports.help = {
  name: "server"
}
