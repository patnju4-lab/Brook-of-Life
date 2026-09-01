import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  LifeBuoy, 
  Send, 
  CheckCircle, 
  MessageSquare, 
  Clock 
} from 'lucide-react';

export const ContactSupportPage: React.FC = () => {
  const { settings, createTicket, currentUser } = useApp();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    category: 'Academic Support' as any,
    subject: '',
    description: '',
    priority: 'Medium' as any
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.description) return;

    createTicket({
      userId: currentUser?.id || `guest-${Date.now()}`,
      userName: formData.name,
      userEmail: formData.email,
      category: formData.category,
      subject: formData.subject,
      description: formData.description,
      priority: formData.priority
    });

    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Admissions & Student Support Desk
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
            Contact & Academic Help Center
          </h1>
          <p className="text-sm text-slate-300">
            Have questions about program admission, transcript verification, tuition billing, or LMS course access? Our academic support officers are ready to assist you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-slate-900">Global Headquarters</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {settings.address}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-slate-900">Email Directorates</h3>
            <div className="text-xs text-slate-600 space-y-1">
              <div><strong>Admissions:</strong> {settings.contactEmail}</div>
              <div><strong>Registrar:</strong> registrar@brooksoflife.edu</div>
              <div><strong>Bursar & Finance:</strong> finance@brooksoflife.edu</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-slate-900">Telephone Lines</h3>
            <p className="text-xs text-slate-600">
              {settings.contactPhone}
            </p>
            <div className="text-[11px] text-slate-400 flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Monday – Friday: 08:00 – 18:00 GMT</span>
            </div>
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-cinzel text-xl font-bold text-slate-900">
                Submit Support Ticket / Inquiry
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Tickets are routed automatically to the appropriate dean, examiner, or finance officer.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-cinzel text-lg font-bold text-slate-900">
                  Ticket Submitted Successfully!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your ticket has been logged with the Academic Support Center. A representative will reply to <strong>{formData.email}</strong> within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Submit Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Adebayo"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Department / Category</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                    >
                      <option value="Academic Support">Academic Support & Curriculum</option>
                      <option value="Course Material">LMS & Course Notes Access</option>
                      <option value="Examinations">TEMS Examinations & Proctored Tests</option>
                      <option value="Billing & Payments">Tuition Billing & Scholarships</option>
                      <option value="Technical/Portal">Technical / Portal Login Issue</option>
                      <option value="Admissions">Admissions & Prospective Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Priority Level</label>
                    <select
                      value={formData.priority}
                      onChange={e => setFormData({ ...formData, priority: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                    >
                      <option value="Low">Low (General Question)</option>
                      <option value="Medium">Medium (Standard Request)</option>
                      <option value="High">High (Urgent Exam / Admission Issue)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief summary of your inquiry..."
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Detailed Message / Description *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please provide complete details so we can assist you promptly..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center space-x-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Support Ticket</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
