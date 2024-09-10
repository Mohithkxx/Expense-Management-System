import mongoose from "mongoose"

const {Schema} = mongoose;

const ExpenseSchema = new Schema({
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
        default:"expense"
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 30,
        trim: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now,
    }
}, {timestamps: true})

const expense =  mongoose.model('Expense', ExpenseSchema);

export default expense;