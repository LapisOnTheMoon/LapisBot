const Discord = require("discord.js");
const rChannel  = "reports";

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Couldn't find user!");
  let reason = args.join("  ").slice(22);
  if(!reason) return message.channel.send("Please include a reason!");


  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Report")
  .setColor("#26619c")
  .addField("Reported User", `${rUser}`)// with ID: ${message.author.id}`)
  .addField("Reported By", `${message.author}`)// with ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", reason);

  let reportChannel = message.guild.channels.find(reportChannel => reportChannel.name === rChannel);
  if(!reportChannel) return message.channel.send("Couldn't find report channel!");

  message.delete().catch(O_o=>{});
  reportChannel.send(reportEmbed);
}

module.exports.help = {
  name: "report"
}
