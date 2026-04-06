import Member from '../Models/member.model.js';
import bcrypt from 'bcryptjs';
import connectDB from '../Database/mongodb.js';

await connectDB();
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash('adminpassword', salt);

await Member.create({
    name: 'Library Admin',
    email: 'admin@library.com',
    password: hashedPassword,
    role: 'admin'
});

console.log('Admin created successfully');
process.exit(0);