import { Schema, model, models, Document } from 'mongoose';


interface ITransaction extends Document {
    amount: number;
    date: Date;
    description: string;
    category?: string; // Optional field for categorization
}

const transactionSchema = new Schema<ITransaction>({
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Other'], default: 'Other' }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Use existing model if it exists, otherwise create a new one
const Transaction = models.Transaction || model<ITransaction>('Transaction', transactionSchema);

export default Transaction;