const mongoose = require("mongoose")

const connectDb = async (url) => {
    try {
        const connect = await mongoose.connect(url)
        console.log("mongoose connected", )
    } catch (error) {
        console.error(`mongoose connection Error: ${error.message}`)
        process.exit()
    }
}

module.exports = connectDb