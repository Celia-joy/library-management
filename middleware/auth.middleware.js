import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../config/env.js';
import Member from '../Models/member.model.js';
const authorize = async (req, res, next)=>{
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token){
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const member = await Member.findById(decoded.memberId);
        if(!member){
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        req.member = member;
        next();
    }
    catch(error){
        res.status(401).json({
            message: 'Unauthorized',
            error:error.message
        });
    }
}

export default authorize