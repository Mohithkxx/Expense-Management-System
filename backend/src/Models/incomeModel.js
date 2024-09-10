import mongoose from "mongoose"

const {Schema} = mongoose;

const IncomeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        default:"income"
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        
    },
}, {timestamps: true})

const Income = mongoose.model("Income", IncomeSchema)

export default Income;