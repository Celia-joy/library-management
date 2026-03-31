import mongoose from 'mongoose';
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true  
    }, 
    author:{
        type:String,
        required:true,
        trim:true
    },
    totalCopies:{
        type:Number,
        required:true,
        min:[1, 'Number of copies of the book must be at least 1'],
        max:[5, 'Number of copies of the book must be at most 5']
    },
    copyNumber:{
        type:Number,
        required:true,
        min:[1, 'Copy number must be at least 1'],
        max:[5, 'Copy number must be at most 5']
    }
},{timestamps:true});
bookSchema.index({title:1, author:1},{unique:true});
const Book = mongoose.model('Book', bookSchema);
export default Book;