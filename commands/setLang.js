let discord = require('discord.js');
const { read, write } = require('../db');

/**
 * 
 * @param {discord.Client} client 
 * @param {discord.Message} message 
 * @param {String[]} args 
 * @param {String} prefix 
 * @param {String} lang
 */

module.exports.run = async(client, message, args, prefix, lang) => {
    if(args[0] === 'en') {
        write(`${message.guild.id}`, 'en_EN');
        message.channel.send('```Language changed successfully```')
    }
    else if(args[0] === 'ru') {
        write(`${message.guild.id}`, 'ru_RU');
        message.channel.send(`\`\`\`Язык сменен успешно!\`\`\``)
    }
}

module.exports.info = {
    tag: 'set_lang',
    usage: 'set_lang <ru or en>',
    description_ru: 'Сменяет язык бота',
    description_en: 'Changes bot\'s language',
    category: 'moderation'
}