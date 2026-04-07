import Book from '../Models/book.model.js';
import {body, validationResult} from 'express-validator';

const validateBook = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('author').trim().notEmpty().withMessage('Author is required'),
    body('totalCopies').isInt({min: 1, max: 5}).withMessage('Total copies must be between 1 and 5')
];

export const addBook = async(req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 400;
        error.details = errors.array();
        return next(error);
    }
    
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

export const updateBook = async(req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 400;
        error.details = errors.array();
        return next(error);
    }
    
    try{
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );
        if(!book){
            const error = new Error('Book not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success:true,
            data:book
        });
    }
    catch(error){
        next(error);
    }
}

export {validateBook, addBook, getOneBook, getAllBooks, updateBook, deleteBook};

