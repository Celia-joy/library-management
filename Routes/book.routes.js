import {Router} from 'express';
import authorize , {isAdmin} from '../middleware/auth.middleware.js';
import {addBook, getOneBook, getAllBooks} from '../Controllers/book.controller.js';

const bookRouter = Router();

bookRouter.post('/', authorize, isAdmin, addBook);
bookRouter.get('/',authorize,  getAllBooks);
bookRouter.get('/:id', authorize, getOneBook);


export default bookRouter;