let discord = require("discord.js");
let GD = require("gd.js");
let gd = new GD();
const fs = require("fs")

module.exports.run = async(client, message, args, prefix, lang) => {
    let nick = args[0];
    const user = await gd.users.get(nick)
    if(!user) {
        return message.channel.send(
            `\`\`\`User ${nick} not found!\`\`\``
        );
    }
    var accID = user.accountID;
    var userID = user.id;
    var stars = user.stats.stars
    var cps = user.stats.cp;
    var perms = user.permissions.pretty;
    var rawIMG = await user.cosmetics.renderIcon('cube', false);
    let buf_ = Buffer.from(rawIMG);
    fs.writeFileSync(`${nick}i.png`, buf_);
    
    let file = new discord.MessageAttachment(`./${nick}i.png`, `${nick}i.png`)

    var embed = new discord.MessageEmbed()
    .setTitle(`> <:info:740968491967971449> **~${nick}'s account~**`)
    .attachFiles(file)
    .setDescription(lang === 'ru_RU' ? `<:player:754721773441908856> Ник: \`${nick}\`\n<:locked:740970154971889704> Права: \`${perms}\`\n> <:az:740969006214807644> **~Статистика~**\n<:astar:740971007522898022> \`${stars}\`\n<:diamond:754766803607093419> \`${user.stats.diamonds}\`\n<:coingold:740968730003243128> \`${user.stats.coins.normal}\`\n<:coiniron:740968625078272023> \`${user.stats.coins.user}\`\n<:demon:740969478044516392> \`${user.stats.demons}\`\n<:cp:740968456576434230> \`${cps}\`` : `<:player:754721773441908856> Nickname: \`${nick}\`\n<:locked:740970154971889704> Permission: \`${perms}\`\n> <:az:740969006214807644> **~Stats~**\n<:astar:740971007522898022> \`${stars}\`\n<:diamond:754766803607093419> \`${user.stats.diamonds}\`\n<:coingold:740968730003243128> \`${user.stats.coins.normal}\`\n<:coiniron:740968625078272023> \`${user.stats.coins.user}\`\n<:demon:740969478044516392> \`${user.stats.demons}\`\n<:cp:740968456576434230> \`${cps}\``)
    .setThumbnail(`attachment://${nick}i.png`);
    setTimeout(() => {
        fs.unlinkSync(`./${nick}i.png`);
    }, 1000);
    console.log(user.stats.coins)
    message.channel.send(embed)
    console.log('\x1b[34m%s\x1b[0m', user.stats)
}

module.exports.info = {
    tag: "profile",
    usage: 'profile <nickname>',
    description_ru: 'Получает информацию о пользователе с Geometry Dash сервера',
    descripton_en: 'Gets info about user from Geometry Dash server',
    category: 'gd_manage'
}
