const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const YTDL = require("ytdl-core");
const PREFIX = "-401-";
const opusscript = require("opusscript");
const FFMPEG = require('fluent-ffmpeg');
let musicplaying = false;
console.log(`${musicplaying}`);
var servers = {};

function play(connection, message) {
  var server = servers[msg.guild.id]
  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
  
  server.queue.shift();
  
  server.dispatcher.on('end', function() {
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.generateInvite(["ADMINISTRATOR"])
  .then(link => {
    console.log(`Generated bot invite link: ${link}`);
  });
  let tempguild = client.guilds.find(`name`, `Coruscant Guard`);
  console.log(`Guild "${tempguild.name}" was found.`);
  let temprole = tempguild.roles.find('name', 'CAR: 401st Discord Manager');
  console.log(`Role "${temprole.name}" was found.`);
  if (temprole.hoist === true) {
    console.log('Hoist is active.');
    return;
  }
  if (!temprole.hoist === true) {
    temprole.hoist = true;
    console.log(temprole.hoist);
  }
  if(!tempguild.channels.find(`name`, `messagelogs`)) {
    console.log(`Unable to find messagelogs channel.`);
    tempguild.createChannel(`messagelogs`, `text`);
    console.log(`Created messagelogs channel.`);
    return;
  }
  if(tempguild.channels.find(`name`, `messagelogs`)) {
    console.log(`messasgelogs channel was found.`);
  }
  client.user.setGame('with the wonderful Coruscant Guard.');
});
client.on('message', msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return msg.channel.sendMessage("Sorry, but I am currently not capable of responding to DMs.");
  console.log(`${msg.author.username} sent "${msg.content}" in #${msg.channel.name}`);
  let channel = msg.channel.guild.channels.find(`name`, `messagelogs`);
  let embed = new Discord.RichEmbed();
  embed.setTitle("Message sent.");
  embed.setThumbnail("https://awesomewallpaper.files.wordpress.com/2011/01/star-wars-evil-senate.jpg");
  embed.setColor("#A52A2A");
  embed.setDescription(`${msg.author.username} sent a message.`);
  embed.addField("Location:", `${msg.channel}`);
  embed.addField('Content:', `${msg.content}`);
  channel.sendMessage({embed});
  if (!msg.content.startsWith(PREFIX)) return;
  var args = msg.content.substring(PREFIX.length).split(" ");
  switch (args[0].toLowerCase()) {
    case "music":
      if (!args[1]) {
        msg.reply('you did not provide a link to the video.');
        return;
      }
      if (!msg.member.voiceChannel) {
        msg.reply('you must be in a voice channel to use the -401-music command.');
        return;
      }
      if (!servers[msg.guild.id]) servers[msg.guild.id] = {
        queue: []
      };
      var server = servers[msg.guild.id];
      if (!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(connection) {
        play(connection, message);
      });
      break;
    case "test":
      msg.reply('this is a response to a test prompt message.');
      break;
    case "skip":
      var server = servers[msg.guild.id];
      
      if (server.dispatcher) server.dispatcher.end();
      break;
    case "stop":
      var server = servers[msg.guild.id]
      
      if (msg.guild.voiceConnection) msg.guild.voiceConnection.disconnect();
      break;
    default:
      msg.reply('the command you called for does not exist. Available commands are: -401-test, -401-help, -401-commands, -401-music, -401-botinfo');
      break;
      
  }
});
client.on('messageUpdate', function(oldmsg, newmsg) {
  let channel = newmsg.channel.guild.channels.find('name', 'messagelogs');
  let person = newmsg.author.username;
  let pic = newmsg.author.avatarID;
  let embed = new Discord.RichEmbed();
  embed.setTitle('Message edit.');
  embed.setColor("#A52A2A");
  embed.setDescription(`${person} edited a message.`);
  embed.addField('Original message:', `${oldmsg}`);
  embed.addField('Message edit:', `${newmsg}`);
  embed.setThumbnail("https://awesomewallpaper.files.wordpress.com/2011/01/star-wars-evil-senate.jpg");
  console.log(`${person} edited a message.`);
  console.log(`Before: ${oldmsg}`);
  console.log(`After: ${newmsg}`);
  console.log('______________');
});
client.login(process.env.BOT_TOKEN);
