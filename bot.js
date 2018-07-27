const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const YTDL = require("ytdl-core");
const PREFIX = "DataCommand-";
const opusscript = require("opusscript");
const FFMPEG = require('fluent-ffmpeg');
const axios = require('axios');
const secret = `${process.env.Secret_Key}`
const pass = `${process.env.Command_Authorization_Code}`
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
  console.log(msg.channel.type)
  if (msg.channel.type === "dm") return msg.channel.sendMessage("Private bot usage is restricted.");
  //console.log(`${msg.author.username} sent "${msg.content}" in #${msg.channel.name}`);
  /*let channel = msg.channel.guild.channels.find(`name`, `messagelogs`);
  let embed = new Discord.RichEmbed();
  embed.setTitle("Message sent.");
  embed.setThumbnail("https://awesomewallpaper.files.wordpress.com/2011/01/star-wars-evil-senate.jpg");
  embed.setColor("#A52A2A");
  embed.setDescription(`${msg.author.username} sent a message.`);
  embed.addField("Location:", `${msg.channel}`);
  embed.addField('Content:', `${msg.content}`);
  channel.sendMessage({embed});*/
  if (!msg.content.startsWith(PREFIX)) return;
  if (msg.content.startsWith(PREFIX)) {
  var args = msg.content.substring(PREFIX.length).split(" ");
  switch (args[0].toLowerCase()) {
    case "requestdata":
      if (!args[1]) {
        msg.reply('please enter the authorization code to use this command.');
        return;
      }
      if (args[1] !== pass) {
        msg.reply('Invalid command authorization code.')
      }
      if (!args[2]) {
        msg.reply('please specify the bin you would like to retrieve.')
        return;
      }
      let requesturl = `https://api.jsonbin.io/b/${args[2]}`
      console.log(`RequestDATA command made to ${requesturl}`)
      axios.request({
        url: requesturl,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'secret-key': secret
        }
      }).then(function (response) {
    msg.reply(`${response.data}`);
  }).catch(function (error) {
    console.log(error);
  });
      break;
    /*case "test":
      msg.reply('this is a response to a test prompt message.');
      break;*/
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
    case "announcement":
      
      break;
    case "editdata":
      
      break;
    default:
      msg.reply("the command you called for doesn't exist.");
      break;
  }
  } else if (msg.content.startsWith('KGCommand-')) {
     switch (args[0].toLowerCase()) {
    case "botinfo":
      let embed = new Discord.RichEmbed();
      embed.setTitle('Kyber Games Services - Database and Server Management');
      embed.setDescription("Designed to assist with management of Kyber Games databases and servers.");
      embed.setColor("#0000FF");
      embed.setImage(client.user.displayAvatarURL);
      msg.channel.sendMessage({embed});
      break;
      default:
      msg.reply("the command you called for doesn't exist.")
     }
    }
  }
});
client.login(process.env.BOT_TOKEN);
