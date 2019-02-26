const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  var otherUser = message.mentions.users.first();
  if(!otherUser){
    var uIcon = message.author.displayAvatarURL;
    var uEmbed = new Discord.RichEmbed()
    .setDescription("User Info")
    .setColor("#26619c")
    .setThumbnail(uIcon)
    .addField("Name", message.author.tag)
    .addField("User ID", message.author.id)
    //.addField("what is this", message.author.toString())
    .addField("Created On", message.author.createdAt);

    return message.channel.send(uEmbed);
  }else{
    var ouIcon = otherUser.displayAvatarURL;
    var uEmbed = new Discord.RichEmbed()
    .setDescription("User Info")
    .setColor("#26619c")
    .setThumbnail(ouIcon)
    .addField("Name", otherUser.tag)
    .addField("User ID", otherUser.id)
    .addField("Created On", otherUser.createdAt);
  }

  return message.channel.send(uEmbed);
}

module.exports.help = {
  name: "user",
}
