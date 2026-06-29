import React, { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    inquiryType: 'General',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitStatus('submitting');
    setErrors({});

    // Map fields for backend compatibility
    const payload = {
      name: formData.name,
      email: formData.email,
      subject: formData.inquiryType, // inquiry type as subject
      message: formData.whatsapp.trim() 
        ? `[WhatsApp: ${formData.whatsapp}]\n\n${formData.message}`
        : formData.message
    };

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ 
          name: '', 
          email: '', 
          whatsapp: '', 
          inquiryType: 'General', 
          message: '' 
        });
      } else {
        setErrors({ submit: data.error || 'Failed to send message.' });
        setSubmitStatus('idle');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setErrors({ submit: 'Could not connect to database server. Please try again later.' });
      setSubmitStatus('idle');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="glass-card p-8 rounded-xl text-center flex flex-col items-center justify-center py-16 border-red-500/30">
        <div className="p-4 bg-red-500/10 text-red-500 rounded-full mb-6">
          <CheckCircle size={48} />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-white font-display uppercase tracking-wider">Message Sent!</h3>
        <p className="text-gray-400 max-w-sm mb-8 font-sans">
          Thank you for reaching out. Muhammad Tayyab Tanveer will review your request and get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-md border border-red-600/30 text-white bg-red-600/10 hover:bg-red-600 transition-all font-mono cursor-pointer shadow-md shadow-red-600/10"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 rounded-xl space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 font-mono">
          Name <span className="text-[#FF1A1A]">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#0A0A0A]/50 border rounded-lg text-white font-sans placeholder-gray-600 focus:outline-none focus:border-[#FF1A1A] focus:ring-1 focus:ring-[#FF1A1A] transition-all ${
            errors.name ? 'border-red-500/50' : 'border-white/5'
          }`}
          placeholder="Your Name"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1.5 font-sans">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 font-mono">
          Email <span className="text-[#FF1A1A]">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#0A0A0A]/50 border rounded-lg text-white font-sans placeholder-gray-600 focus:outline-none focus:border-[#FF1A1A] focus:ring-1 focus:ring-[#FF1A1A] transition-all ${
            errors.email ? 'border-red-500/50' : 'border-white/5'
          }`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1.5 font-sans">{errors.email}</p>}
      </div>

      {/* WhatsApp Number (Optional) */}
      <div>
        <label htmlFor="whatsapp" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 font-mono">
          WhatsApp Number <span className="text-gray-650 text-[10px] font-normal lowercase">(optional)</span>
        </label>
        <input
          type="text"
          id="whatsapp"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#0A0A0A]/50 border border-white/5 rounded-lg text-white font-sans placeholder-gray-600 focus:outline-none focus:border-[#FF1A1A] focus:ring-1 focus:ring-[#FF1A1A] transition-all"
          placeholder="+92 300 1234567"
        />
      </div>

      {/* Inquiry Type (Dropdown) */}
      <div>
        <label htmlFor="inquiryType" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 font-mono">
          Inquiry Type
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#121212] border border-white/5 rounded-lg text-white font-sans focus:outline-none focus:border-[#FF1A1A] focus:ring-1 focus:ring-[#FF1A1A] transition-all"
        >
          <option value="Internship Opportunity">Internship Opportunity</option>
          <option value="Project Collaboration">Project Collaboration</option>
          <option value="General">General</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 font-mono">
          Message <span className="text-[#FF1A1A]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#0A0A0A]/50 border rounded-lg text-white font-sans placeholder-gray-600 focus:outline-none focus:border-[#FF1A1A] focus:ring-1 focus:ring-[#FF1A1A] transition-all resize-none ${
            errors.message ? 'border-red-500/50' : 'border-white/5'
          }`}
          placeholder="Write your message here..."
        />
        {errors.message && <p className="text-red-400 text-xs mt-1.5 font-sans">{errors.message}</p>}
      </div>

      {errors.submit && (
        <p className="text-red-400 text-xs text-center font-sans">
          {errors.submit}
        </p>
      )}

      {/* Submit Button (SEND MESSAGE →) */}
      <button
        type="submit"
        disabled={submitStatus === 'submitting'}
        className="w-full py-4 text-xs font-bold uppercase tracking-widest rounded-lg border border-[#FF1A1A] text-white bg-[#FF1A1A] hover:bg-[#E53935] disabled:bg-[#FF1A1A]/50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all font-mono shadow-md shadow-[#FF1A1A]/10 cursor-pointer hover:shadow-red-500/20"
      >
        {submitStatus === 'submitting' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>SENDING MESSAGE...</span>
          </>
        ) : (
          <>
            <span>SEND MESSAGE →</span>
          </>
        )}
      </button>
    </form>
  );
}
