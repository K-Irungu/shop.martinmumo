// lib/mailer.ts
import nodemailer from 'nodemailer';
import logger from './logger';
import EmailLog from '@/models/EmailLog'; // Adjust path to your model


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});




export async function sendEmail(options: { to: string; subject: string; text?: string; html?: string }) {
    logger.info('Sending email', { to: options.to, subject: options.subject });
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        });
        logger.info('Email sent', { messageId: info.messageId });

        // ✅ Save to DB
    await EmailLog.create({
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      messageId: info.messageId,
    });




    } catch (err) {
        logger.error('Error sending email', err);
        throw err;
    }
}