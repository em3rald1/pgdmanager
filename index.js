var discord = require("discord.js");
var fs = require("fs");
//var gd = new require("gd.js")();
var gdp = require("gdprofiles");
const { read } = require("./db");
var client = new discord.Client();
client.commands = new discord.Collection();
const _T = "NzU0NTc3NjU5NzY1MzI1ODU1.X12xNQ.MkXyjgG2Sgs7u70MoyHqjhzDqZy1";
fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);
  
  var jsFiles = files.filter(f => f.split(".").pop() === "js");
  
  if(jsFiles.length <= 0) {
    console.log('\x1b[33m%s\x1b[0m', `[ DEBUG ] No files in directory \"./commands\"`);
  }
  
  jsFiles.forEach((f, i) => {
    var props = require(`./commands/${f}`);
    console.log('\x1b[33m%s\x1b[0m', "[INIT] " + f + " - loaded");
    client.commands.set(props.info.tag, props);
  })
});

client.on("ready", async() => {
  client.user.setActivity("I am verified!", { type : "PLAYING" } );
  client.generateInvite(["ADMINISTRATOR"]).then(l => { console.log('\x1b[34s%m\x1b[0m', l) });
  
  setInterval(async() => {
    var _daily = await gdp.getDailyLevel();
    var _weekly = await gdp.getWeeklyDemon();
    
    setTimeout(async() => {
      var daily = await gdp.getDailyLevel();
      var weekly = await gdp.getWeeklyDemon();
      if(_daily.name.split(/ +/g).join('') != daily.name.split(/ +/g).join('')) {
             var embed = new discord.MessageEmbed();
             embed.setTitle("> __Daily__");
             embed.setDescription("<:info:740968491967971449> Уровень: " + daily.name + "\n" +
             "<:cp:740968456576434230> Строитель: " + daily.creator + "\n" +
             "<:astar:740971007522898022> Сложность: " + daily.diff + "\n" +
             "<:locked:740970154971889704> Айди: " + daily.id + "\n" )
             embed.setColor("ae96f8")
             embed.setThumbnail("https://i.imgur.com/TDsJkTk.png")
             embed.setFooter("GDManager", "https://i.imgur.com/TDsJkTk.png")
             client.channels.cache.get("754742014389518339").send(embed)
         }
         else if(_weekly.name.split(/ +/g).join('') != weekly.name.split(/ +/g).join('')) {
            var embed = new discord.MessageEmbed();
            embed.setTitle("> __Weekly__");
            embed.setDescription("<:info:740968491967971449> Уровень: " + weekly.name + "\n" +
            "<:cp:740968456576434230> Строитель: " + weekly.creator + "\n" +
            "<:astar:740971007522898022> Сложность: " + weekly.diff + "\n" +
            "<:locked:740970154971889704> Айди: " + weekly.id + "\n" )
            embed.setColor("ae96f8")
            embed.setThumbnail("https://i.imgur.com/IHKNoyR.png")
            embed.setFooter("GDManager", "https://i.imgur.com/IHKNoyR.png")
            client.channels.cache.get("742710389610905612").send(embed)
        }
    }, 5000)
  }, 5000)
});


client.on("message", async(message) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    const _msgarr = message.content.split(/ +/g);
    const cmd = _msgarr[0];
    const _arg = _msgarr.slice(1);
    let prefix = ".";
    //console.log('\x1b[35m%s\x1b[0m', message)
    let guild_ = message.guild.id;
    let guild_lang = read(`${guild_}`) || 'en_EN';
    if(cmd.substring(0, prefix.length) == prefix) {
        let cmdFile = client.commands.get(cmd.slice(prefix.length))
        if(cmdFile) {
            if(cmd.slice(prefix.length)) cmdFile.run(client, message, _arg, prefix, guild_lang);
            console.log('\x1b[35m%s\x1b[0m', `<${Date()}>: <Command> - ${message.content};<User>: ${message.author.tag}`)
        }
    }
})

client.login(_T);
