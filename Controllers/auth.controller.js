import Member from '../Models/member.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {JWT_EXPIRES_IN, JWT_SECRET} from '../config/env.js';

export const signUp = async (req, res, next) =>{
    const {name, email, password} = req.body;
    try {
        if(!name || !email || !password){
            const error = new Error('Name, email and password are required');
            error.statusCode = 400;
            throw error;
        }
        const existingMember = await Member.findOne({email});
        if(existingMember){
            console.log(existingMember);
            const error = new Error('Member already exists');
            error.statusCode = 400;
            throw error;
        } 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const [newMember] = await Member.create(
            [{name, email, password:hashedPassword}],
        );

        res.status(201).json({
            success: true,
            message: 'Member created successfully',
            data: {
                member: {
                    _id: newMember._id,
                    name: newMember.name,
                    email: newMember.email
                }
            }
        });
    }
    catch(error){
        next(error);
    }
}

export const signIn = async (req, res, next) =>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            const error = new Error('Email and password are required');
            error.statusCode = 400;
            throw error;
        }
        const member = await Member.findOne({email}).select('+password');
        if(!member){
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {memberId: member._id},
            JWT_SECRET,
            {expiresIn: JWT_EXPIRES_IN || "1d"}
        );
        res.status(200).json({
            success: true,
            message: 'Member signed in successfully',
            data: {
                token,
                member: {
                    _id: member._id,
                    name: member.name,
                    email: member.email
                }
            }
        });
    }
    catch(error){
        next(error);
    }
}

export const signOut = async(req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Member signed out successfully'
    });
}