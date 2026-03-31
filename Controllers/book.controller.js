import Book from '../Models/book.model.js';
export const addBook = async(req, res, next)=>{
    try{
        const book = await Book.create({
            ...req.body
        });
        res.status(201).json({
            success: true,
            data:book
        });
    }
    catch(error){
        next (error);
    }
}

export const getOneBook = async(req, res, next)=>{
    try{
        const books = await Book.findById(req.params.id);
        if(!books){
            const error = new Error('Book not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success:true,
            data: books
        });
    }
    catch(error){
        next(error);
    }
}

export const getAllBooks = async (req, res, next)=>{
    try{
        const Allbooks = await Book.find();
        res.status(200).json({
            success:true,
            data: Allbooks
        });
    }
    catch(error){
        next(error);
    }
}

