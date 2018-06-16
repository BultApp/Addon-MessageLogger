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
        IErasedMessage.messageIds.forEach(id => {
            this.database.messages.update({
                deleted_by: IErasedMessage.removedBy.userId
            }, {
                where: {
                    id: id
                }
            }).then(message => {
                return this.database.messages.destroy({
                    where: {
                        id: id
                    }
                });
            }).then(erased => {
                if(erased) {
                    console.log("Message with the id " + id + " has been erased.");
                }
            });
        });
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
