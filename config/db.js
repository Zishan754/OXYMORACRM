const mongoose = require('mongoose')

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connect to mongodb")
    } catch (err) {
        console.log(err.message)
        console.log("error",err)
    }
}

module.exports = ConnectDB;