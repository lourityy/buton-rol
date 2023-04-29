const { Client, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const louritydb = require("croxydb")
const Discord = require("discord.js")
// Lourity - discord.gg/altyapilar
module.exports = {
    name: "buton-rol",
    description: "Üyelerin butona basarak rol almasını sağlarsın",
    type: 1,
    options: [
        {
            name: "emoji",
            description: "Butona bir emoji ekle.",
            type: 3,
            required: true,
        },
        {
            name: "rol",
            description: "Butona tıklandığında hangi rolü vereyim?",
            type: 8,
            required: true,
        },
        {
            name: "buton-renk",
            description: "Butonun rengini seçersin.",
            type: 3,
            required: true,
            choices: [
                {
                    name: 'Kırmızı',
                    value: "red"
                },

                {
                    name: 'Mavi',
                    value: "blue"
                },

                {
                    name: 'Gri',
                    value: "gray"
                },

                {
                    name: 'Yeşil',
                    value: "green"
                }
            ]
        }
    ],

    run: async (client, interaction, message) => {

        const yetki = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komutu kullanabilmek için `Rolleri Yönet` yetkisine sahip olmalısın!")

        const emoji = interaction.options.getString('emoji')
        const rol = interaction.options.getRole('rol')
        let input = interaction.options.getString('buton-renk')

        const pozisyon = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`${rol} benim rolümden yüksekte!\n\n**Sunucu Ayarları** -> __**Roller**__ kısmından rolümü ${rol} rolünün üzerine sürüklemelisin.`)

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({ embeds: [yetki], ephemeral: true })

        if (rol.position >= rol.guild.members.me.roles.highest.position) return interaction.reply({ embeds: [pozisyon], ephemeral: true })

        const botYetki = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bunu yapabilmek için yeterli yetkiye sahip değilim.")

        let me = interaction.guild.members.cache.get(client.user.id)
        if (!me.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [botYetki], ephemeral: true })


        const emojiHata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Lütfen düzgün bir emoji girin.")

        const butonRolMesaj = new EmbedBuilder()
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setColor("Green")
            .setDescription(`Aşağıdaki butona tıklayarak rol alabilirsiniz!`)

        // Renk Seçimleri
        if (input === 'red') {

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setEmoji(`${emoji}`)
                        .setLabel(`${rol.name}`)
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId("butonRol")
                )
            louritydb.set(`butonRol_${interaction.guild.id}`, rol.id)

            const basari = new EmbedBuilder()
                .setColor("Green")
                .setDescription("Buton rol sistemi başarıyla ayarlandı.")

            interaction.reply({ embeds: [basari], ephemeral: true })
            return interaction.channel.send({ embeds: [butonRolMesaj], components: [row] }).catch(e => {
                return interaction.reply({ embeds: [emojiHata], ephemeral: true })
            })
        }

        if (input === 'blue') {

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setEmoji(`${emoji}`)
                        .setLabel(`${rol.name}`)
                        .setStyle(ButtonStyle.Primary)
                        .setCustomId("butonRol")
                )
            louritydb.set(`butonRol_${interaction.guild.id}`, rol.id)

            const basari = new EmbedBuilder()
                .setColor("Green")
                .setDescription("Buton rol sistemi başarıyla ayarlandı.")

            interaction.reply({ embeds: [basari], ephemeral: true })
            return interaction.channel.send({ embeds: [butonRolMesaj], components: [row] }).catch(e => {
                return interaction.reply({ embeds: [emojiHata], ephemeral: true })
            })
        }

        if (input === 'gray') {

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setEmoji(`${emoji}`)
                        .setLabel(`${rol.name}`)
                        .setStyle(ButtonStyle.Secondary)
                        .setCustomId("butonRol")
                )
            louritydb.set(`butonRol_${interaction.guild.id}`, rol.id)

            const basari = new EmbedBuilder()
                .setColor("Green")
                .setDescription("Buton rol sistemi başarıyla ayarlandı.")

            interaction.reply({ embeds: [basari], ephemeral: true })
            return interaction.channel.send({ embeds: [butonRolMesaj], components: [row] }).catch(e => {
                return interaction.reply({ embeds: [emojiHata], ephemeral: true })
            })
        }

        if (input === 'green') {

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setEmoji(`${emoji}`)
                        .setLabel(`${rol.name}`)
                        .setStyle(ButtonStyle.Success)
                        .setCustomId("butonRol")
                )
            louritydb.set(`butonRol_${interaction.guild.id}`, rol.id)

            const basari = new EmbedBuilder()
                .setColor("Green")
                .setDescription("Buton rol sistemi başarıyla ayarlandı.")

            interaction.reply({ embeds: [basari], ephemeral: true })
            return interaction.channel.send({ embeds: [butonRolMesaj], components: [row] }).catch(e => {
                return interaction.reply({ embeds: [emojiHata], ephemeral: true })
            })
        }
    }
};