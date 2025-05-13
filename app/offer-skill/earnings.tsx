'use client';

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FiDollarSign, FiCalendar } from 'react-icons/fi';

interface Transaction {
  id: string;
  date: Date;
  workshopTitle: string;
  participants: number;
  amount: number;
  status: 'paid' | 'processing';
}

interface Workshop {
  id: string;
  start: Date;
  title: string;
}

const Earnings: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [mounted, setMounted] = useState(false); // Prevent render until after hydration

  useEffect(() => {
    setMounted(true);

    // Fetch transactions from the payment API (Razorpay or similar)
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions'); // API endpoint for transactions
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    // Fetch workshops from the database (or API)
    const fetchWorkshops = async () => {
      try {
        const response = await fetch('/api/workshops'); // API endpoint for workshops
        const data = await response.json();
        setWorkshops(data);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      }
    };

    fetchTransactions();
    fetchWorkshops();
  }, []);

  if (!mounted) return null; // Avoid hydration error

  const totalEarnings = transactions.reduce((sum, t) => sum + t.amount, 0);
  const upcomingPayout = transactions
    .filter(t => t.status === 'processing')
    .reduce((sum, t) => sum + t.amount, 0);

  const now = new Date();
  const workshopsThisMonth = workshops.filter(w =>
    w.start.getMonth() === now.getMonth() &&
    w.start.getFullYear() === now.getFullYear()
  ).length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-cyan-900">Earnings Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Total Earnings" icon={<FiDollarSign />} value={`$${totalEarnings}.00`} />
        <Card title="Upcoming Payout" icon={<FiDollarSign />} value={`$${upcomingPayout}.00`} />
        <Card title="Workshops This Month" icon={<FiCalendar />} value={workshopsThisMonth.toString()} />
      </div>

      <div className="bg-white border border-cyan-100 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-cyan-100">
          <h3 className="text-lg font-bold text-cyan-900">Transaction History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-cyan-100">
            <thead className="bg-cyan-50">
              <tr>
                {['Date', 'Workshop', 'Participants', 'Amount', 'Status'].map(header => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-cyan-100">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-cyan-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-800">
                    {moment(t.date).format('MMM D, YYYY')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-900">
                    {t.workshopTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-800">
                    {t.participants}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-900">
                    ${t.amount}.00
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${t.status === 'processing' ? 'bg-cyan-100 text-cyan-800' : 'bg-green-100 text-green-800'}`}>
                      {t.status === 'processing' ? 'Processing' : 'Paid'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-cyan-50 px-5 py-3 border-t border-cyan-100 flex justify-between items-center">
          <span className="text-sm text-cyan-700">Showing {transactions.length} entries</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-cyan-200 rounded text-sm text-cyan-700 bg-white">Previous</button>
            <button className="px-3 py-1 border border-cyan-200 rounded text-sm text-cyan-700 bg-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card: React.FC<{ title: string, icon: React.ReactNode, value: string }> = ({ title, icon, value }) => (
  <div className="bg-gradient-to-br from-cyan-50 to-white p-5 rounded-xl border border-cyan-100">
    <div className="flex items-center mb-3">
      <div className="bg-cyan-100 p-2 rounded-lg mr-3">
        {icon}
      </div>
      <span className="text-sm font-medium text-cyan-800">{title}</span>
    </div>
    <p className="text-3xl font-bold text-cyan-900">{value}</p>
  </div>
);

export default Earnings;
