import React, { useState } from 'react';

const categories = ['Food', 'Rent', 'Utilities', 'Entertainment', 'Other'];

export default function AddTransactionForm({ onAdd }: { onAdd: (tx: any) => void }) {
  const [form, setForm] = useState({ description: '', amount: '', date: '', category: categories[0] });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.date) return;
    onAdd({ ...form, amount: Number(form.amount) });
    setForm({ description: '', amount: '', date: '', category: categories[0] });
  };

  return (
    <form
      className="flex flex-col gap-6 w-full"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block font-bold text-lg mb-2">Description</label>
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
      </div>
      <div>
        <label className="block font-bold text-lg mb-2">Amount</label>
        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
      </div>
      <div>
        <label className="block font-bold text-lg mb-2">Date</label>
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          type="date"
          className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
      </div>
      <div>
        <label className="block font-bold text-lg mb-2">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
      </div>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-23 py-6 rounded-2xl text-2xl font-extrabold hover:bg-indigo-700 transition"
      >
        Add
      </button>
    </form>
  );
}