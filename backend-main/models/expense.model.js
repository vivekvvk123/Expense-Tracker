const mongoose= require('mongoose');

const expenseSchema = new Schema({

    amount:{
        type: Number,
        required: true,
        min: 0
    },
    category:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        trim: true,
    },


},{timestamps:true});

module.exports = mongoose.model("Expense", expenseSchema);