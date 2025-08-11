const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    userId: String,
    cartItems: [
        
    ]
})