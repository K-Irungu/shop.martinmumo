// models/EmailLog.ts
import mongoose from 'mongoose';

const EmailLogSchema = new mongoose.Schema({
  to: { type: String, required: true },
  subject: { type: String, required: true },
  html: { type: String },
  text: { type: String },
  messageId: { type: String },
  sentAt: { type: Date, default: Date.now },
});

export default mongoose.models.EmailLog || mongoose.model('EmailLog', EmailLogSchema);
