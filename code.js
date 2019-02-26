const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const rChannel  = "reports";
const lChannel = "logs";

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

//const bot = new Discord.Client({disableEveryone: true});
//const rChannel  = "reports";
//const lChannel = "logs";

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setPresence({
        game: {
            name: 'AntiChristLouis @ twitch',
            type: "WATCHING",
            url: "https://www.twitch.tv/antichristlouis"
        }
    });
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  //if(message.channel.id === "534205770158571530"){
  //  return message.channel.send("Please use the right channel");
  //};

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  //let commandfile = bot.commands.get(command.slice(prefix.length));
  let commandfile = bot.commands.get(cmd.slice(prefix.length));﻿
  if(commandfile) commandfile.run(bot,message,args);

/*
  if(cmd === `${prefix}kick`){

    //kick @user for reason

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Couldn't find user!");
    let kReason = args.join("  ").slice(22);
    if(!kReason) return message.channel.send("Please include a reason!");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You aren't cool enough for that.");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: That person can't be kicked.");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#26619c")
    .addField("User", `${kUser} with ID: ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let logChannel = message.guild.channels.find(logChannel => logChannel.name === lChannel);
    if(!logChannel) return message.channel.send("Couldn't find log channel!");

    message.guild.member(kUser).kick(kReason);
    logChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`){

    //ban @user for reason

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Couldn't find user!");
    let bReason = args.join("  ").slice(22);
    if(!bReason) return message.channel.send("Please include a reason!");
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You aren't cool enough to ban lmao");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: That person can't be banned.");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#b70000")
    .addField("User", `${bUser} with ID: ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let logChannel = message.guild.channels.find(logChannel => logChannel.name === lChannel);
    if(!logChannel) return message.channel.send("Couldn't find log channel!");

    message.guild.member(bUser).ban(bReason);
    logChannel.send(banEmbed);

    return;
  }


  if(cmd === `${prefix}report`){

    //report @user for reason

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

    return;
  }



  if(cmd === `${prefix}server`){

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

  if(cmd === `${prefix}info`){

    let bIcon = bot.user.displayAvatarURL;
    let bEmbed = new Discord.RichEmbed()
    .setDescription("Bot Info")
    .setColor("#26619c")
    .setThumbnail(bIcon)
    .addField("Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    return message.channel.send(bEmbed);
  }

  if(cmd === `${prefix}user`){

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
*/

});


bot.login(botconfig.token)
