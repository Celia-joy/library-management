import Loan from '../Models/loan.model.js';
import Book from '../Models/book.model.js';
import Member from '../Models/member.model.js';

export const borrowBook = async (req, res, next)=>{
    try{
        const books = await Book.findById(req.params.id);
        if(!books){
            const error = new Error('Book not found');
            error.statusCode = 404;
            throw error;
        }
        const existingLoan = await Loan.findOne({
            member: req.member.id,
            status: 'borrowed'
        });
        if(existingLoan){
            const error = new Error('Please return your current book before borrowing another');
            error.statusCode = 400;
            throw error;
        }
        const activeLoans = await Loan.countDocuments({
            book: req.params.id,
            status: 'borrowed'
        });
        if(activeLoans >= books.totalCopies){
            const error = new Error ('No copies available');
            error.statusCode = 400;
            throw error;
        }
        const copyNumber = activeLoans +1;
        const borrowedDate = new Date();
        const limitDate = new Date();
        limitDate.setDate(limitDate.getDate() + 14);

        const loan = await Loan.create({
            member: req.member._id,
            book:req.params.id,
            copyNumber,
            borrowedDate,
            limitDate,
            status: 'borrowed'
        });
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data:loan
        });
    }
    catch(error){
        next(error);
    }
}

export const returnBook = async(req, res, next)=>{
    try{
        const loan = await Loan.findById(req.params.id);
        if(!loan){
            const error = new Error('Loan not found');
            error.statusCode = 404;
            throw error;
        }
        if(loan.member.toString() !== req.member._id.toString()){
            const error = new Error('You did not borrow this book');
            error.statusCode = 403;
            throw error;
        }
        
        if(loan.status === 'returned'){
            const error = new Error('Book already returned');
            error.statusCode = 400;
            throw error;
        }
        
        loan.status = 'returned';
        loan.returnedDate = new Date();
        await loan.save();
        res.status(200).json({
            success: true,
            message: 'Book returned successfully',
            data:loan
        });
    }
    catch(error){
        next(error);
    }
}

export const getAllLoans = async(req, res, next)=>{
    try{
        const allLoans = await Loan.find()
            .populate('member', 'name email')
            .populate('book', 'title author');
        res.status(200).json({
            success: true,
            data: allLoans
        });
    }
    catch(error){
        next(error);
    }
}

export const getMyLoans = async(req, res, next)=>{
    try{
        const myLoans = await Loan.find({member: req.member._id})
            .populate('book', 'title author')
            .sort({createdAt: -1});
        res.status(200).json({
            success: true,
            data: myLoans
        });
    }
    catch(error){
        next(error);
    }
}

export const getMyCurrentLoans = async(req, res, next)=>{
    try{
        const myCurrentLoans = await Loan.find({
            member: req.member._id,
            status: 'borrowed'
        })
            .populate('book', 'title author')
            .sort({limitDate: 1});
        res.status(200).json({
            success: true,
            data: myCurrentLoans
        });
    }
    catch(error){
        next(error);
    }
}