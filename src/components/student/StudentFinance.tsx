import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CreditCard, 
  DollarSign, 
  CheckCircle, 
  Receipt, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  Printer 
} from 'lucide-react';
import { PaymentTransaction } from '../../types';

export const StudentFinance: React.FC = () => {
  const { invoices, transactions, currentUser, makePayment, programs } = useApp();
  const [showPayModal, setShowPayModal] = useState(false);
  const [payAmount, setPayAmount] = useState('800');
  const [payMethod, setPayMethod] = useState<PaymentTransaction['method']>('Card');
  const [paySuccess, setPaySuccess] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>('');

  const studentProg = programs.find(p => p.id === currentUser?.programId) || programs[0];
  const userInvoices = invoices.filter(f => f.studentId === currentUser?.id || f.studentName === currentUser?.name);
  const userTransactions = transactions.filter(t => t.studentId === currentUser?.id);

  // Financial summary
  const totalBilled = userInvoices.reduce((acc, curr) => acc + curr.totalDue, 0);
  const totalPaid = userInvoices.reduce((acc, curr) => acc + curr.amountPaid, 0);
  const outstandingBalance = Math.max(0, totalBilled - totalPaid);

  const handleMakePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(payAmount);
    if (isNaN(amt) || amt <= 0) return;

    const targetInv = userInvoices.find(i => i.id === selectedInvoiceId) || userInvoices[0];
    if (targetInv) {
      makePayment(targetInv.id, amt, payMethod);
    }

    setPaySuccess(true);
    setTimeout(() => {
      setPaySuccess(false);
      setShowPayModal(false);
    }, 1500);
  };

  const handleOpenPay = (invoiceId: string, balance: number) => {
    setSelectedInvoiceId(invoiceId);
    setPayAmount(balance.toString());
    setShowPayModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className="font-cinzel text-2xl font-bold text-slate-900">
            Student Bursar & Tuition Account
          </h1>
          <p className="text-xs text-slate-500">
            Manage semester invoices, view scholarship credits, and download official receipts.
          </p>
        </div>

        <button
          onClick={() => {
            const firstUnpaid = userInvoices.find(i => i.balance > 0) || userInvoices[0];
            handleOpenPay(firstUnpaid?.id || '', firstUnpaid?.balance || 500);
          }}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center space-x-2"
        >
          <CreditCard className="w-4 h-4" />
          <span>Make Tuition Payment</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-medium">Outstanding Balance</div>
          <div className="text-2xl font-cinzel font-bold text-slate-900">
            ${outstandingBalance.toLocaleString()} <span className="text-xs font-normal text-slate-500">USD</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            {outstandingBalance === 0 ? 'Account Fully Paid & Cleared' : 'Semester Payment Plan Active'}
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-medium">Total Lifetime Paid</div>
          <div className="text-2xl font-cinzel font-bold text-emerald-700">
            ${totalPaid.toLocaleString()} <span className="text-xs font-normal text-slate-500">USD</span>
          </div>
          <div className="text-[11px] text-slate-500">Verified through Bursary Directorate</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-medium">Applied Mission Grant</div>
          <div className="text-2xl font-cinzel font-bold text-amber-600">
            $300 <span className="text-xs font-normal text-slate-500">Subsidy</span>
          </div>
          <div className="text-[11px] text-amber-800">Global South Ministry Fellowship</div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-cinzel text-base font-bold text-slate-900">
            Tuition Transaction Ledger & Invoices
          </h3>
          <span className="text-xs text-slate-400">{userInvoices.length} Invoices</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Invoice No.</th>
                <th className="py-2.5 px-3">Program / Semester</th>
                <th className="py-2.5 px-3 text-right">Total Due</th>
                <th className="py-2.5 px-3 text-right">Amount Paid</th>
                <th className="py-2.5 px-3 text-right">Balance</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {userInvoices.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-bold text-slate-800">{rec.invoiceNumber}</td>
                  <td className="py-3 px-3 font-medium text-slate-900">{rec.programTitle} ({rec.semester})</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">${rec.totalDue}</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-700 font-bold">${rec.amountPaid}</td>
                  <td className="py-3 px-3 text-right font-mono text-amber-700 font-bold">${rec.balance}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      rec.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right no-print space-x-2">
                    {rec.balance > 0 ? (
                      <button
                        onClick={() => handleOpenPay(rec.id, rec.balance)}
                        className="text-amber-700 hover:text-amber-800 font-bold cursor-pointer underline"
                      >
                        Pay Balance
                      </button>
                    ) : (
                      <button
                        onClick={() => window.print()}
                        className="text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                      >
                        Print Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-cinzel text-lg font-bold text-slate-900">
                Tuition Payment Gateway
              </h3>
              <button 
                onClick={() => setShowPayModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {paySuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-cinzel text-base font-bold text-slate-900">
                  Payment Processed!
                </h4>
                <p className="text-xs text-slate-600">
                  Your bursary account has been credited. Official receipt generated.
                </p>
              </div>
            ) : (
              <form onSubmit={handleMakePayment} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Amount (USD) *</label>
                  <input
                    type="number"
                    required
                    min="10"
                    value={payAmount}
                    onChange={e => setPayAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-sm focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={payMethod}
                    onChange={e => setPayMethod(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  >
                    <option value="Card">Credit / Debit Card (Visa / Mastercard)</option>
                    <option value="Bank Transfer">International Bank Wire Transfer</option>
                    <option value="Mobile Money">Mobile Money (Africa / Global Remit)</option>
                    <option value="Scholarship Grant">Scholarship Grant</option>
                  </select>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-[11px] text-slate-600">
                  <div className="flex items-center space-x-1 font-semibold text-slate-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-Bit SSL Encrypted Bursary Transaction</span>
                  </div>
                  <p>Transactions are processed instantly and posted to your student ledger.</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-md"
                >
                  Authorize Payment of ${payAmount} USD
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
