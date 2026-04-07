import transporter from '../config/mailer.js';

export const sendReturnReminderEmail = async (email, name, book)=>{
  const mailerOptions = {
    from: process.env.EMAIL_USER,
    to:email,
    subject:`Reminder: Your ${book.name} must be returned  in 14 days`,
    html: `
    <div style="background-color: #f8f9fa; padding: 20px; color: #333; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h3 style="color: #ff6b35; margin-bottom: 20px;">⏰ Return book Reminder</h3>
        <p>Hi <strong>${name}</strong>,</p>
        <p>This is a friendly reminder that your <strong>${book.name}</strong> must be returned in <strong>14 days</strong>.</p>

        <div style="margin-top: 20px; padding: 20px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 5px;">
          <h4 style="color: #856404; margin-bottom: 10px;">📋 Book Details</h4>
          <p style="margin: 5px 0;">${book.name}</p>
          <p style="margin: 5px 0;"> ${book.author}</p>
          <p style="margin: 5px 0;"> ${book.copyNumber}</p>
          <p style="margin: 5px 0;"><strong>Return Date:</strong> ${new Date(book.limitDate).toDateString()}</p>

        </div>

        <div style="margin-top: 20px; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
          <h4 style="color: #333; margin-bottom: 10px;">What would you like to do?</h4>
          <ul style="color: #666;">
            <li>Return the book now and avoiding hitting the limit date and be charged</li>
            <li>Wait the limit date or return later</li>
          </ul>
        </div>

        <p style="margin-top: 30px; color: #6c757d;">Best regards,<br>The Library management system</p>
      </div>
    </div>
    `
  };
  try{
    await transporter.sendMail(mailerOptions);
    console.log(`Return reminder sent successfully to ${email}`);

  }
  catch(error){
    console.log(`Reminder email failed: ${error}`);
  }
} 
export default sendReturnReminderEmail;