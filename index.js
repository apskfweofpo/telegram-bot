const TelegramApi = require('node-telegram-bot-api')

const {gameOptions, againOptions} = require('./options')
const token = "5826269109:AAHlBZZSbsdb5ZzaCcZ6lRhI7aOKpL9yweY"

const bot = new TelegramApi(token, {polling: true})



const chats = {}

const startGame = async (idChat)=> {
    const randomNumber = Math.floor(Math.random() * 10)
    chats[idChat] = randomNumber;
    await bot.sendMessage(idChat, 'Отгадай', gameOptions)
}

const start = async () => {
    await bot.setMyCommands([
        {command: '/question', description: 'Старт'},
        {command: '/answer', description: 'описание'},
        {command: '/game', description: 'Игра угадай число'}

    ])

    await bot.on('message', async msg => {
        console.log(msg)

        const text = msg.text
        const chatId = msg.chat.id
        if (text == '/question') {
            return bot.sendMessage(chatId, `хуй будешь??`)

        }
        if (text == '/answer') {
            return bot.sendMessage(chatId, 'ДАААААААААААА')

        }
        if (text == '/game') {
            await startGame(chatId)
        }

        return bot.sendMessage(chatId, 'Не понимаю')
    })
    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if(data == '/again'){
            return  startGame(chatId)
        }
        if (data == chats[chatId]) {
            return  bot.sendMessage(chatId, `Отгадал! цифра ${chats[chatId]}`, againOptions)
        } else
        {
            return  bot.sendMessage(chatId, `Не отгадал! ${chats[chatId]}`, againOptions)
        }
        console.log(msg)
    })
}
start()