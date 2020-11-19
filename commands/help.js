const discord = require("discord.js");
const fs = require("fs");

/**
 * 
 * @param {discord.Client} client 
 * @param {discord.Message} message 
 * @param {String[]} args 
 * @param {String} prefix 
 * @param {String} lang
 */

module.exports.run = async(client, message, args, prefix, lang) => {
    let commands = fs.readdirSync("commands");
    commands.forEach((el, i) => {
        commands[i] = el.replace(".js", '');
    })

    let usages = {};
    let descriptions = {};
    let categories = {};
    let categories_ = {};
    categories_.help = [];
    categories_.fun = [];
    categories_.moderation = [];
    categories_.gd_manage = [];
    //categories_.useless = [];
    commands.forEach((el, i) => {
        usages[el] = require(`${process.cwd()}/commands/${el}`).info.usage;
        descriptions[el] = require(`${process.cwd()}/commands/${el}`).info[lang === 'en_EN' ? 'description_en' : 'description_ru'];
        categories[el] = require(`${process.cwd()}/commands/${el}`).info.category;
        categories_[require(`${process.cwd()}/commands/${el}`).info.category] ? categories_[require(`${process.cwd()}/commands/${el}`).info.category].push( el ) : null;
    })

    let embed = new discord.MessageEmbed();
    embed
        .setTitle(lang === 'ru_RU' ? 'Комманда помощи' : 'Help command')
        for(let i = 0; i < Object.keys(categories_).length; i++) {
            let f_ = '';
            let s_ = '';
            f_ = Object.keys(categories_)[i][0].toUpperCase() + Object.keys(categories_)[i].slice(1);
            categories_[Object.keys(categories_)[i]].forEach((el, i) => {
                s_ += `\`${require(`${process.cwd()}/commands/${el}`).info.tag}:\` \`${prefix}${usages[el]}\`, \`${descriptions[el]}\`\n`;
            })
            embed.addField(f_.replace("Gd_manage", 'GD Management'), s_);
        }
        message.channel.send(embed);
}

module.exports.info = {
    tag: "help",
    usage: 'help',
    description_ru: 'Получает все доступные комманды бота.',
    description_en: 'Gets all bot\'s commands',
    category: 'help'
}