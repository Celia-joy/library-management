import mongoose from 'mongoose';
const loanSchema = new mongoose.Schema({
    member:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Member',
        index:true
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Book',
        index:true
    },
    copyNumber:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    borrowedDate:{
        type: Date,
        required: true,
        validate:{
            validator: function(value) {
                return value <= new Date();
            },
            message: 'Borrowing date must be in the past'
        }
    },
    returnDate:{
        type: Date,
        validate:{
            validator: function(value) {   
                return value > this.borrowedDate;
            },
            message: 'Return date must be after the borrowing date'
        }
    },
    limitDate:{
        type:Date,
        validate:{
            validator: function(value){
                return value > this.borrowedDate;
            },
            message:'Limit date must be after the borrowing date'
        }
    },
    status:{
        type:String,
        enum:['borrowed','returned'],
        default:'borrowed'
    }
    
},{
    timestamps:true
});
const Loan = mongoose.model('Loan', loanSchema);
export default Loan;