const Session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(Session);
const mongoUri = 'mongodb+srv://USER1:USER1@nanfiles.4pr4chi.mongodb.net/test';



const store = new MongoDBSession({
    uri:mongoUri,
    collection:'session'
});

module.exports = store;
