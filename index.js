const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

let token = '6527505829:AAHsULxUV5D2VowrQ4-4JBVwk2eDfxfjZD8'
const bot = new TelegramBot(token, {polling: true});
const channelId = '-1001906426963'
const port = 3000|process.env.PORT
const app = express();
app.use(cors())
app.use(express.json())


// Object users
const ObjectUsers = {};


// FUNCTIONS

const KickChatMember = (userId) => {
    bot.banChatMember(channelId, userId)
    .then(() => {
        console.log(`User kick from the channel ${userId}`)
    })
    .catch(err => console.log(`Error to kick user ${err}`))
};

const UnbanChatMember = (userId) => {
    bot.UnbanChatMember(channelId, userId)
    .then(() => {
        console.log(`User kick from the channel ${userId}`)
    })
    .catch(err => console.log(`Error to kick user ${err}`))
};

const WelcomeUser = () => {
    bot.on("message", (chat) => {
        if(!ObjectUsers[chat.chat.id]) {
            ObjectUsers[chat.chat.id] = true;
            const buttonsLinks = {
                inline_keyboard : [
                    [
                        {
                            text : "Griko Picks Premium",
                            url: "https://t.me/+-6a7bUUDsCdiMTUx"
                        }
                    ]
                ]
            }
            const options = {
                reply_markup: JSON.stringify(buttonsLinks),
              };
            const message = "Ey parcerooo, Te doy una bienvenida a mis canales premium papi, espero ganemos juntos. Mucha mucha suerte!"

            bot.sendMessage(chat.chat.id, message, options)
        }
    })
};

//ENDPOINTS

app.post("/KickUser", (req, res) => {
    const { telegram_id } = req.body
    KickChatMember(telegram_id)
    res.sendStatus(200)
});

app.post("/UnbanUser", (req, res) => {
    const { telegram_id } = req.body
    UnbanChatMember(telegram_id)
    res.sendStatus(200)
});


app.post("/WelcomeUser", (req, res) => {
    WelcomeUser()
    res.sendStatus(200)
});

//SERVER ON PORT

app.listen(port, () => {
    console.log('Server on PORT', port)
})