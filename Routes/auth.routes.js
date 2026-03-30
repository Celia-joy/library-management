import {Router} from 'express';
import {signUp} from '../Controllers/auth.controller.js';
import {signIn} from '../Controllers/auth.controller.js';
import {signOut} from '../Controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.post('/signout', signOut);

export default authRouter;