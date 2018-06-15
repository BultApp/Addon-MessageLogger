let api;
let helper;
let database;

exports.constructor = (api, helper) => {
    this.api = api;
    this.helper = helper;
    this.database = require("./database");
    this.database.messages.sync();
};

exports.onEraseMessage = {
    execute: (data, IErasedMessage) => {
    }
};

exports.onChatMessage = {
    execute: (data, IChatMessage) => {
        this.database.messages.findOrCreate({
            where: {
                id: IChatMessage.messageId
            },
            defaults: {
                id: IChatMessage.messageId,
                roomId: IChatMessage.roomId,
                userId: IChatMessage.userId,
                name: IChatMessage.username,
                message: IChatMessage.message
            }
        }).spread((message, created) => {
            if(process.env.MESSAGE_LOGGER_OUTPUT_MESSAGES) {
                console.log(message.name + ": " + message.message);
            }
        });
    }
};
