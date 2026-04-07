import {Router} from 'express';
import authorize , {isAdmin} from '../middleware/auth.middleware.js';
import {validateBook, addBook, getOneBook, getAllBooks, updateBook, deleteBook} from '../Controllers/book.controller.js';

const bookRouter = Router();

bookRouter.post('/', authorize, isAdmin, validateBook, addBook);
bookRouter.get('/',authorize,  getAllBooks);
bookRouter.get('/:id', authorize, getOneBook);
bookRouter.put('/:id', authorize, isAdmin, validateBook, updateBook);
bookRouter.delete('/:id', authorize, isAdmin, deleteBook);


export default bookRouter;