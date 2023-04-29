const { PermissionsBitField, EmbedBuilder, ButtonStyle, ChannelType, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder, AuditLogEvent } = require("discord.js");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const louritydb = require("croxydb")
const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users", "roles", "everyone"]
    },
    partials: PARTIALS,
    retryLimit: 3
});
// lourity - discord.gg/altyapilar
global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs")
const { TOKEN } = require("./config.json");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: props.dm_permission,
        type: 1
    });

    console.log(`[COMMAND] ${props.name} komutu yüklendi.`)

});
readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(TOKEN)

// Bir Hata Oluştu
process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p);
})
// Hata oluştuğunda botun kapanmamasını sağlar | discord.gg/altyapilar
process.on("unhandledRejection", async (error) => {
    return console.log("Bir hata oluştu! " + error)
})
//
//
// Buton rol sistemi
client.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === "butonRol") {

        let rol = louritydb.get(`butonRol_${interaction.guild.id}`)
        if (!rol) return;
        let lourity = interaction.guild.members.cache.get(client.user.id)
// discord.gg/altyapilar
        const botYetki = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bunu yapabilmek için yeterli yetkiye sahip değilim.")

        if (!lourity.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [botYetki], ephemeral: true })

        if (!interaction.member.roles.cache.has(rol)) {

            interaction.member.roles.add(rol).catch(e => { })

            const verildi = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`<@&${rol}> adlı rol başarıyla üzerine verildi!`)

            return interaction.reply({ embeds: [verildi], ephemeral: true }).catch((e) => { })

        } else {

            interaction.member.roles.remove(rol).catch(e => { })

            const alındı = new EmbedBuilder()
                .setColor("Red")
                .setDescription(`<@&${rol}> adlı rol başarıyla üzerinden alındı!`)

            return interaction.reply({ embeds: [alındı], ephemeral: true }).catch((e) => { })
        }
    }
})