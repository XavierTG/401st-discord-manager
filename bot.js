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
  let gamedata = {
    "game.name":"Coruscant V2"
  };
  client.user.setPresence(gamedata);
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
    case "botinfo":
      let embed = new Discord.RichEmbed();
      embed.setTitle('CAR: 401st Discord Manager Bot Information');
      embed.setDescription("Work in progress bot developed by XavierTG for use in monitoring and advancing CAR's 401st discord server.");
      embed.setColor("#A52A2A");
      embed.setImage("https://awesomewallpaper.files.wordpress.com/2011/01/star-wars-evil-senate.jpg");
      msg.channel.sendMessage({embed});
      break;
    case "skip":
      var server = servers[msg.guild.id];
      
      if (server.dispatcher) server.dispatcher.end();
      break;
    case "stop":
      var server = servers[msg.guild.id];
      if (msg.guild.voiceConnection) msg.guild.voiceConnection.disconnect();
      break;
    default:
      msg.reply('the command you called for does not exist. Available commands are: -401-test, -401-help, -401-commands, -401-music, -401-botinfo');
      break;
      
  }
});
client.on('messageUpdate', function(old, newm) {
  if (newm.author.bot) return;
  let channel = newm.channel.guild.channels.find('name', 'messagelogs');
  let person = newm.author.username;
  console.log(`${channel.name}`);
  console.log(`${person}`);
  let oldmsg = old.content;
  let newmsg = newm.content;
  console.log('Edit thumbnail was set.');
  console.log(`${person} edited a message.`);
  console.log(`Before: ${oldmsg}`);
  console.log(`After: ${newmsg}`);
  console.log('______________');
  let embed = new Discord.RichEmbed();
  embed.setTitle('Message edit:');
  console.log('Edit title was set.')
  embed.setColor("#A52A2A");
  console.log('Edit color was set.');
  embed.setDescription(`${person} edited a message.`);
  console.log('Edit description was set.');
  embed.addField('Original message:', `${oldmsg}`);
  console.log('Original message field added.');
  embed.addField('Message edit:', `${newmsg}`);
  console.log('New message field added.');
  embed.setThumbnail("https://awesomewallpaper.files.wordpress.com/2011/01/star-wars-evil-senate.jpg");
  console.log('Thumbnail set.');
  embed.addField('Location:', `${newm.channel}`);
  console.log('Location(channel) field added.');
  channel.sendMessage({embed});
});
client.on('messageDelete', function(delmsg) {
  console.log('Message deletion detected.');
  let channel = delmsg.channel.guild.channels.find('name', 'messagelogs');
  let person = delmsg.author.username;
  let embed = new Discord.RichEmbed();
  embed.setTitle('Message deletion:');
  embed.setColor("#A52A2A");
  embed.setDescription(`${person} deleted a message.`);
  embed.addField('Content:', `${delmsg.content}`);
  embed.setThumbnail("https://awesomewallpaper.files.wordpress.com/2011/01/star-wars-evil-senate.jpg");
  embed.addField('Location:', `${delmsg.channel}`);
  channel.sendMessage({embed});
});
client.login(process.env.BOT_TOKEN);
