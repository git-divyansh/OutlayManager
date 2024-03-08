const mongoos = require('mongoose');
const connectDB = async()=>{
    try {
        const MONGO_URI = process.env.MONGO_URI
        await mongoos.connect(MONGO_URI)
            console.log("Connected!!!")
    } catch (error) {
        console.log("Not Connected!!")
    }
}
module.exports = connectDB