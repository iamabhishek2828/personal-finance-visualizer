import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Transaction from '../../../models/Transaction';

// GET all transactions
export async function GET() {
  await dbConnect();
  const transactions = await Transaction.find({});
  return NextResponse.json(transactions);
}

// POST a new transaction
export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const tx = await Transaction.create(data);
  return NextResponse.json(tx);
}

// DELETE a transaction
export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { id } = await req.json();
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}