import cron from 'node-cron';
import Loan from '../Models/loan.model.js';
import Book from '../Models/book.model.js';
import Member from '../Models/member.model.js';
import sendReturnReminderEmail from './reminder.js';

export const startReminderScheduler = () => {
    // Run every day at 9 AM
    cron.schedule('0 9 * * *', async () => {
        console.log('Running daily reminder check...');
        
        try {
            // Find loans that are due in 3 days
            const threeDaysFromNow = new Date();
            threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
            
            const upcomingDueLoans = await Loan.find({
                status: 'borrowed',
                limitDate: {
                    $gte: new Date(),
                    $lte: threeDaysFromNow
                }
            }).populate('member book');
            
            console.log(`Found ${upcomingDueLoans.length} loans due soon`);
            
            for (const loan of upcomingDueLoans) {
                const daysUntilDue = Math.ceil((loan.limitDate - new Date()) / (1000 * 60 * 60 * 24));
                
                await sendReturnReminderEmail(
                    loan.member.email,
                    loan.member.name,
                    {
                        name: loan.book.title,
                        author: loan.book.author,
                        limitDate: loan.limitDate,
                        copyNumber: loan.copyNumber
                    }
                );
                
                console.log(`Sent reminder to ${loan.member.email} for book "${loan.book.title}" (due in ${daysUntilDue} days)`);
            }
        } catch (error) {
            console.error('Error in reminder scheduler:', error);
        }
    });
    
    console.log('Reminder scheduler started - runs daily at 9 AM');
};
