const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
const bot = new Discord.Client({disableEveryone: true});
const wChannel  = "mod-logs";

module.exports.run = async (bot, message, args) => {

  let louRole = "517073362795757573";
  let modRole = "518557790579720205";
  let botCreateRole = "525837937175429120";
  let vikRole = "517082212219224086";
  if (!message.member.roles.has(modRole) /*&& !message.member.roles.has(myRole)*/) return message.channel.send("Nope");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!wUser) return message.channel.send("Who?");
  if(wUser.roles.has(louRole)) return message.channel.send("I'm not warning my daddy~");
  if(wUser.roles.has(vikRole)) return message.channel.send("He's too cool for that uwu");
  if(wUser.roles.has(botCreateRole)) return message.channel.send("Can't warn my creator");
  let warnReason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err);
  });

  var ouIcon = wUser.displayAvatarURL;
  var userWarned = message.mentions.users.first();
  let warnEmbed = new Discord.RichEmbed()
  .setTitle("**User Warned**")
  .setDescription("~Warn~")
  .setAuthor(message.author.username)
  .setColor("#26619c")
  .addField("**Warned User**", userWarned.tag)
  .addField("**Channel Warned In**", message.channel)
  .addField("**Number of Warnings**", warns[wUser.id].warns)
  .addField("**Reason**", warnReason);

  let warnChannel = message.guild.channels.find(warnChannel => warnChannel.name === wChannel);
  if(!warnChannel) message.channel.send("Couldn't find channel");

  warnChannel.send(warnEmbed);

  if(warns[wUser.id].warns == 3){
    let muteRole = message.guild.roles.find(muteRole => muteRole.name === "muted");
    if(!muteRole) return message.channel.send("Couldn't add punishment, no mute role");

    let muteTime = "10s";
    await(wUser.addRole(muteRole.id));
    message.channel.send(`${userWarned.tag} has been muted`);

    setTimeout(function(){
      wUser.removeRole(muteRole.id);
      message.channel.send(`${userWarned.tag} has been unmuted`);
    }, ms(muteTime))
  }
  if(warns[wUser.id].warns == 5){
    let muteRole = message.guild.roles.find(muteRole => muteRole.name === "muted");
    if(!muteRole) return message.channel.send("Couldn't add punishment, no mute role");

    let muteTime = "30m";
    await(wUser.addRole(muteRole.id));
    message.channel.send(`${userWarned.tag} has been muted`);

    setTimeout(function(){
      wUser.removeRole(muteRole.id);
      message.channel.send(`${userWarned.tag} has been muted`);
    }, ms(muteTime))
  }
  if(warns[wUser.id].warns == 7){
    let muteRole = message.guild.roles.find(muteRole => muteRole.name === "muted");
    if(!muteRole) return message.channel.send("Couldn't add punishment, no mute role");

    let muteTime = "12h";
    await(wUser.addRole(muteRole.id));
    message.channel.send(`${userWarned.tag} has been muted`);

    setTimeout(function(){
      wUser.removeRole(muteRole.id);
      message.channel.send(`${userWarned.tag} has been muted`);
    }, ms(muteTime))
  }
  if(warns[wUser.id].warns == 10){
    let muteRole = message.guild.roles.find(muteRole => muteRole.name === "muted");
    if(!muteRole) return message.channel.send("Couldn't add punishment, no mute role");

    let muteTime = "1d";
    await(wUser.addRole(muteRole.id));
    message.channel.send(`${userWarned.tag} has been muted`);

    setTimeout(function(){
      wUser.removeRole(muteRole.id);
      message.channel.send(`${userWarned.tag} has been muted`);
    }, ms(muteTime))
  }
  if(warns[wUser.id].warns == 12){
  message.guild.member(wUser).ban(warnReason);
  message.channel.send(`${userWarned.tag} has been banned for repeated warns. :wave:`);
  }
}

module.exports.help = {
  name: "warn"
}
