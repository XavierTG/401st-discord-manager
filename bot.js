const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const YTDL = require("ytdl-core");
const PREFIX = "DATACOMMAND-";
const opusscript = require("opusscript");
const FFMPEG = require('fluent-ffmpeg');
const axios = require('axios');
const secret = process.env.Secret_Key
console.log(`secret-key: ${secret}`)
let musicplaying = false;
var servers = {};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
 client.user.setGame("Galactic Conquest", "https://www.roblox.com/games")
  let gamedata = {
    "game.name":"Galatic Conquest"
  };
  client.user.setPresence(gamedata);
  client.generateInvite(["ADMINISTRATOR"])
  .then(link => {
    console.log(`Generated bot invite link: ${link}`);
  });
});

client.on('message', msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return msg.channel.sendMessage("Sorry, but I am currently not capable of responding to DMs.");
  //console.log(`${msg.author.username} sent "${msg.content}" in #${msg.channel.name}`);
  let channel = msg.channel.guild.channels.find(`name`, `messagelogs`);
 /* let embed = new Discord.RichEmbed();
  embed.setTitle("Message sent.");
  embed.setThumbnail("https://awesomewallpaper.files.wordpress.com/2011/01/star-wars-evil-senate.jpg");
  embed.setColor("#A52A2A");
  embed.setDescription(`${msg.author.username} sent a message.`);
  embed.addField("Location:", `${msg.channel}`);
  embed.addField('Content:', `${msg.content}`);
  channel.sendMessage({embed});*/
  if (!msg.content.startsWith(PREFIX)) return;
  var args = msg.content.substring(PREFIX.length).split(" ");
  switch (args[0].toLowerCase()) {
    case "requestdata":
      if (!args[1]) {
        msg.reply('error');
        return;
      }
      let requesturl = `jsonbin.io/b/${args[1]}`
      console.log(`RequestDATA command made to ${requesturl}`)
      let data = axios.request({
        url: requesturl,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'secret-key': `${secret}`
        }
      });
      console.log(data.testValue)
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
    case "createdata":
      axios.request({
        url: 'https://api.jsonbin.io/b',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'secret-key': `${secret}`,
          'collection-id': (args[1])
        },
        data: {
          testValue: 21
        }
      });
      break;
    case "editdata":
      
      break;
    default:
      msg.reply('the command you called for does not exist.');
      msg.reply(args[1])
      break;
      
  }
});
client.login(process.env.BOT_TOKEN);
