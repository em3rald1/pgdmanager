var gd = require("gdprofiles")
var discord = require("discord.js")

module.exports.run = async(client, message, args, prefix, lang) => {
    if(lang === 'ru_RU') {
    var daily = await gd.getWeeklyDemon();
    var embed = new discord.MessageEmbed()
    embed.setTitle("> __Weekly__")
    embed.setDescription("<:info:740968491967971449> Уровень: `" + daily.name + "`\n<:cp:740968456576434230> Строитель: `" + daily.creator + "`\n<:astar:740971007522898022> Сложность: `" + daily.diff + "`\n<:locked:740970154971889704> Айди: `" + daily.id+'`')
    embed.setThumbnail("https://i.imgur.com/IHKNoyR.png")
    embed.setFooter("GDManager", client.user.avatarURL())
    embed.setColor("ae96f8");
    message.channel.send(embed);
    }else if(lang === 'en_EN') {
        var daily = await gd.getWeeklyDemon();
    var embed = new discord.MessageEmbed()
    embed.setTitle("> __Weekly__")
    embed.setDescription("<:info:740968491967971449> Level: `" + daily.name + "`\n<:cp:740968456576434230> Creator: `" + daily.creator + "`\n<:astar:740971007522898022> Difficulty: `" + daily.diff + "`\n<:locked:740970154971889704> ID: `" + daily.id+'`')
    embed.setThumbnail("https://i.imgur.com/IHKNoyR.png")
    embed.setFooter("GDManager", client.user.avatarURL())
    embed.setColor("ae96f8");
    message.channel.send(embed);
    }
}

module.exports.info ={
    tag: "weekly",
    usage: "weekly",
    description_ru: 'Получает информацию о еженедельном демоне',
    description_en: 'Gets info about weekly demon',
    category: 'gd_manage'
}
