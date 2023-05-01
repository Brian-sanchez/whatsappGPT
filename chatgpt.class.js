const { CoreClass } = require("@bot-whatsapp/bot");

class ChatGPTClass extends CoreClass {
    queue = [];
    optionsGPT = { model: "text-davinci-003" };
    openai = undefined;

    constructor(_database, _provider) {
        super(null, _database, _provider);
        this.init().then();
    }

    init = async () => {
        const { ChatGPTAPI } = await import("chatgpt");

        this.openai = new ChatGPTAPI({
            apiKey: process.env.OPENAI_API_KEY
        });
    };

    handleMsg = async (ctx) => {
        const { from, body } = ctx;

        const completation = await this.openai.sendMessage(body);

        this.queue.push(completation);

        const parseMessage = {
            ...completation,
            answer: completation.text
        };

        this.sendFlowSimple([parseMessage], from);
    }
}

module.exports = ChatGPTClass;