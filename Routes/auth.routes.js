import {Router} from 'express';
import {signUp, signIn, signOut} from '../Controllers/auth.controller.js';
import {body} from 'express-validator';

const authRouter = Router();

const validateSignUp = [
    body('name').isLength({min: 6}).withMessage('Name must be at least 6 characters'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({min: 6, max: 100}).withMessage('Password must be 6-100 characters')
];

const validateSignIn = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

authRouter.post('/signup', validateSignUp, signUp);
authRouter.post('/signin', validateSignIn, signIn);
authRouter.post('/signout', signOut);

export default authRouter;