import {Router} from 'express';
import {borrowBook, returnBook, getAllLoans, getMyLoans, getMyCurrentLoans} from '../Controllers/loan.controller.js';
import authorize from '../middleware/auth.middleware.js';

const loanRouter = Router();

loanRouter.post('/:id/borrow', authorize, borrowBook);
loanRouter.put('/:id/return', authorize, returnBook);
loanRouter.get('/', authorize, getAllLoans);
loanRouter.get('/my-loans', authorize, getMyLoans);
loanRouter.get('/my-current', authorize, getMyCurrentLoans);
export default loanRouter;