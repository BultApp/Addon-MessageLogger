let Sequelize = require("sequelize");

let con = new Sequelize(null, null, null, {
    dialect: "sqlite",
    storage: "db.sqlite",
    operatorsAliases: false,
    logging: false,
    define: {
        underscored: true
    }
});

const database = {};

database.Sequelize = Sequelize;
database.connection = con;

database.messages = require("./models/Message")(con, Sequelize);

module.exports = database;
