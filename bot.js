const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const YTDL = require("ytdl-core");
const PREFIX = "DataCommand-";
const opusscript = require("opusscript");
const FFMPEG = require('fluent-ffmpeg');
const axios = require('axios');
console.log(`secret-key: ${secret}`)
let musicplaying = false;
var servers = {};


