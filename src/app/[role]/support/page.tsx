"use client";

import React, { useState } from "react";
import MainLayoutWrapper from "@/components/layout/MainLayoutWrapper";

export default function SupportPage() {
  const currentRoleMatch = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'employee';

  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [form, setForm] = useState({ subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, go to the Settings or Profile page and navigate to the Security section, or log out and click 'Forgot Password' on the login screen."
    },
    {
      question: "How do I submit a new timesheet?",
      answer: "Navigate to the Timesheets section from the left sidebar and click on the 'Submit' or 'Create Timesheet' button."
    },
    {
      question: "Who can see my profile information?",
      answer: "Your basic profile information is visible to your manager and administrators. Your personal contact details are restricted depending on your privacy settings."
    },
    {
      question: "How do I update a task status?",
      answer: "Go to your assigned Tasks page, click on any task row to open the details panel, and use the status dropdown or progress slider to update."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFaqToggle = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.message.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setForm({ subject: "", message: "" });
      
      // Auto-hide success message
      setTimeout(() => setShowSuccess(false), 4000);
    }, 1000);
  };

  return (
    <MainLayoutWrapper role={currentRoleMatch as any} title="Help & Support">
      <div className="w-full max-w-[1000px] mx-auto py-8 flex flex-col gap-6 px-4 md:px-0">
        
        {/* Top Section: Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-3">
          <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text"
            placeholder="Search for answers, topics, or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-400 text-base"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column (Lists & Forms) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* 1. FAQ LIST */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Frequently Asked Questions</h2>
              
              <div className="flex flex-col">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0">
                      <button 
                        onClick={() => handleFaqToggle(index)}
                        className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
                      >
                        <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {faq.question}
                        </span>
                        <svg 
                          className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${openFaq === index ? 'rotate-180 text-blue-500' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {openFaq === index && (
                        <div className="pb-4 text-gray-600 text-sm leading-relaxed animate-in slide-in-from-top-2 fade-in duration-200">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-gray-500 text-sm">
                    No matching FAQs found for "{searchQuery}". Try a different keyword or contact support below.
                  </div>
                )}
              </div>
            </div>

            {/* 2. CONTACT SUPPORT FORM */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
              <h2 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-100">Contact Support</h2>
              
              {showSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                  <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Your support ticket has been submitted successfully! We'll respond shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={form.subject}
                    onChange={handleFormChange}
                    required
                    placeholder="Briefly describe your issue..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-shadow text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    name="message"
                    value={form.message}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    placeholder="Provide details about the problem or question you have..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-shadow text-sm resize-y"
                  />
                </div>
                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting || !form.subject.trim() || !form.message.trim()}
                    className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Ticket
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column (Info Card) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6 sticky top-24">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">Support Information</h2>
                <p className="text-sm text-gray-500">Need immediate assistance? Our support team is available during standard business hours.</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Email Us</h4>
                    <p className="text-sm text-blue-600 mt-0.5 hover:underline cursor-pointer">support@yourcompany.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Call Us</h4>
                    <p className="text-sm text-gray-600 mt-0.5">+1 (800) 123-4567</p>
                    <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9am - 6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Documentation</h4>
                    <p className="text-sm text-blue-600 mt-0.5 hover:underline cursor-pointer">Visit Knowledge Base</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-5 border-t border-gray-100 flex flex-col gap-3">
                 <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">System Status</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm text-green-700 font-medium">All systems operational</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </MainLayoutWrapper>
  );
}
