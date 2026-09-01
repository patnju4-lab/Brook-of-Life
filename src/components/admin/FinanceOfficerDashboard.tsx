import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  DollarSign, 
  CreditCard, 
  Receipt, 
  TrendingUp, 
  Plus, 
  CheckCircle, 
  Users, 
  ShieldCheck, 
  Printer 
} from 'lucide-react';
import { Invoice } from '../../types';

export const FinanceOfficerDashboard: React.FC = () => {
  const { 
    invoices, 
    transactions, 
    issueInvoice, 
    programs 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'invoices' | 'transactions' | 'issue'>('invoices');

  // Issue invoice form state
  const [studentName, setStudentName] = useState('Samuel Adebayo');
  const [programTitle, setProgramTitle] = useState('Bachelor of Theology (B.Th.)');
  const [semester, setSemester] = useState('Fall 2026');
  const [tuitionFee, setTuitionFee] = useState('1100');
  const [scholarshipDiscount, setScholarshipDiscount] = useState('300');
  const [issueSuccess, setIssueSuccess] = useState(false);

  // Financial aggregates
  const totalInvoiced = invoices.reduce((acc, curr) => acc + curr.totalDue, 0);
  const totalCollected = invoices.reduce((acc, curr) => acc + curr.amountPaid, 0);
  const outstandingReceivables = invoices.reduce((acc, curr) => acc + curr.balance, 0);

  const handleIssueInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const fee = parseFloat(tuitionFee) || 0;
    const discount = parseFloat(scholarshipDiscount) || 0;
    const totalDue = Math.max(0, fee - discount);

    issueInvoice({
      studentId: 'user-student-1',
      studentName,
      programId: 'bach-theology',
      programTitle,
      semester,
      tuitionFee: fee,
      scholarshipDiscount: discount,
      otherFees: 50,
      totalDue,
      amountPaid: 0,
      balance: totalDue,
      dueDate: '2026-11-30',
      status: 'Pending'
    });

    setIssueSuccess(true);
    setTimeout(() => {
      setIssueSuccess(false);
      setActiveTab('invoices');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
              Bursary & Financial Stewardship Directorate
            </span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
            Chief Financial Officer & Bursar
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Tuition billing, mission scholarship allocation, bursary reconciliation, and financial auditing.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('issue')}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Generate New Student Invoice</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-medium">Total Invoiced (Academic Year)</div>
          <div className="text-2xl font-cinzel font-bold text-slate-900">
            ${totalInvoiced.toLocaleString()} <span className="text-xs font-normal text-slate-500">USD</span>
          </div>
          <div className="text-[11px] text-slate-500">All registered degree programs</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-medium">Collected Tuition Receipts</div>
          <div className="text-2xl font-cinzel font-bold text-emerald-700">
            ${totalCollected.toLocaleString()} <span className="text-xs font-normal text-slate-500">USD</span>
          </div>
          <div className="text-[11px] text-emerald-800">Directly posted to seminary treasury</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-medium">Outstanding Accounts Receivable</div>
          <div className="text-2xl font-cinzel font-bold text-amber-700">
            ${outstandingReceivables.toLocaleString()} <span className="text-xs font-normal text-slate-500">USD</span>
          </div>
          <div className="text-[11px] text-amber-800">Under student installment plans</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('invoices')}
          className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === 'invoices' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          All Semester Invoices ({invoices.length})
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === 'transactions' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Payment Transactions ({transactions.length})
        </button>
        <button
          onClick={() => setActiveTab('issue')}
          className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === 'issue' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Generate Custom Invoice
        </button>
      </div>

      {/* TAB 1: INVOICES */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-cinzel text-base font-bold text-slate-900">
            Student Tuition Invoices
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-3">Invoice No.</th>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Program / Semester</th>
                  <th className="py-2.5 px-3 text-right">Total Due</th>
                  <th className="py-2.5 px-3 text-right">Paid</th>
                  <th className="py-2.5 px-3 text-right">Balance</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">{inv.invoiceNumber}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900 font-cinzel">{inv.studentName}</td>
                    <td className="py-3 px-3 text-slate-700">{inv.programTitle} ({inv.semester})</td>
                    <td className="py-3 px-3 text-right font-mono font-bold">${inv.totalDue}</td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-700 font-bold">${inv.amountPaid}</td>
                    <td className="py-3 px-3 text-right font-mono text-amber-700 font-bold">${inv.balance}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: TRANSACTIONS */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-cinzel text-base font-bold text-slate-900">
            Treasury Receipts & Settled Transactions
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-3">Receipt / Ref</th>
                  <th className="py-2.5 px-3">Student ID</th>
                  <th className="py-2.5 px-3">Payment Method</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">{tx.reference}</td>
                    <td className="py-3 px-3 text-slate-600">{tx.studentId}</td>
                    <td className="py-3 px-3 font-medium text-slate-900">{tx.method}</td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-700 font-bold">${tx.amount}</td>
                    <td className="py-3 px-3 text-slate-500">{new Date(tx.paidAt).toLocaleDateString()}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: GENERATE INVOICE */}
      {activeTab === 'issue' && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
            <DollarSign className="w-6 h-6 text-emerald-600" />
            <div>
              <h3 className="font-cinzel text-lg font-bold text-slate-900">
                Generate Student Tuition Billing
              </h3>
              <p className="text-xs text-slate-500">
                Direct invoice posting to student bursary ledger
              </p>
            </div>
          </div>

          {issueSuccess ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-cinzel text-base font-bold text-slate-900">
                Invoice Generated Successfully!
              </h4>
              <p className="text-xs text-slate-600">
                Invoice has been dispatched to the student's portal with payment instructions.
              </p>
            </div>
          ) : (
            <form onSubmit={handleIssueInvoice} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-cinzel font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Program *</label>
                <select
                  value={programTitle}
                  onChange={e => setProgramTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold bg-slate-50"
                >
                  {programs.map(p => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Semester</label>
                  <input
                    type="text"
                    value={semester}
                    onChange={e => setSemester(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Base Tuition (USD) *</label>
                  <input
                    type="number"
                    required
                    value={tuitionFee}
                    onChange={e => setTuitionFee(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Scholarship Subsidy Grant (USD)</label>
                <input
                  type="number"
                  value={scholarshipDiscount}
                  onChange={e => setScholarshipDiscount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-emerald-700 font-bold"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-md"
                >
                  Issue & Post Invoice
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
