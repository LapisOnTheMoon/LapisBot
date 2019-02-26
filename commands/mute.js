const Discord = require("discord.js");
const ms = require("ms");
const mChannel  = "mod-logs";

module.exports.run = async (bot, message, args) => {
  var otherUser = message.mentions.users.first();
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You aren't cool enough for that.").then(message => {message.delete(5000)});
  let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
  if(!toMute) return message.channel.send("No user specified.").then(message => {message.delete(5000)});
  if(toMute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Can't mute them!").then(message => {message.delete(5000)});
  let muteRole = message.guild.roles.find(muteRole => muteRole.name === "muted");
  let mReason = args.join(" ").slice(25);
  if(!mReason) return message.channel.send("Please include a reason!").then(message => {message.delete(5000)});
  //start of create role
  if(!muteRole){
    try{
      muteRole = await message.guild.createRole({
        name: "muted",
        color: "#36393F",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await message.channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          READ_MESSAGES: true
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  //end create role
  let muteTime = args[1];
  if(!muteTime) return message.channel.send("Specify a time, 1s/1m/1d/1w").then(message => {message.delete(5000)});

  await(toMute.addRole(muteRole.id)); {
    message.channel.send(`<@${toMute.id}> has been muted for ${ms(ms(muteTime))}`)
      .then(message => {
        message.delete(1000)
      })
  }
  //message.channel.send(`<@${toMute.id}> has been muted for ${ms(ms(muteTime))}`);

  setTimeout(function(){
    toMute.removeRole(muteRole.id);
    message.channel.send(`<@${toMute.id}> has been unmuted.`)
      .then(message => {
        message.delete(1000)
      })
  }, ms(muteTime));

  var ouIcon = otherUser.displayAvatarURL;
  let muteEmbed = new Discord.RichEmbed()
  .setTitle("**User Muted**")
  .setDescription("~Mute~")
  .setColor("#818689")
  .setThumbnail(ouIcon)
  .addField("**Muted User**", `${toMute}`)// with ID: ${message.author.id}`)
  .addField("**Muted By**", `${message.author}`)// with ID: ${message.author.id}`)
  .addField("**Channel**", message.channel)
  .addField("**Time**", message.createdAt)
  .addField("**Reason**", mReason)
  .addField("**Length**", muteTime);

  let muteChannel = message.guild.channels.find(muteChannel => muteChannel.name === mChannel);
  if(!muteChannel) return message.channel.send("Couldn't find log channel!").then(message => {message.delete(3000)});
  //
  // message.delete().catch(O_o=>{});
   muteChannel.send(muteEmbed);

  message.delete().catch(O_o=>{});

//end of module
}

module.exports.help = {
  name: "mute"
}
