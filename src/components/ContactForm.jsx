import React, { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
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
      <div className="glass-card p-8 rounded-xl text-center flex flex-col items-center justify-center py-16">
        <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full mb-6">
          <CheckCircle size={48} />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-white font-space">Message Sent!</h3>
        <p className="text-gray-400 max-w-sm mb-8 font-sans">
          Thank you for reaching out, Muhammad Tayyab Tanveer will get back to you as soon as possible.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="px-6 py-3 text-xs font-semibold uppercase tracking-wider rounded-md border border-[#E91E63]/30 text-white bg-[#E91E63]/10 hover:bg-[#E91E63] transition-all font-mono cursor-pointer"
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
        <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2 font-mono">
          Name <span className="text-[#E91E63]">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#0A0B0D]/50 border rounded-lg text-white font-sans placeholder-gray-600 focus:outline-none focus:border-[#E91E63] focus:ring-1 focus:ring-[#E91E63] transition-all ${
            errors.name ? 'border-red-500/50' : 'border-white/5'
          }`}
          placeholder="Your Name"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1.5 font-sans">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2 font-mono">
          Email <span className="text-[#E91E63]">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#0A0B0D]/50 border rounded-lg text-white font-sans placeholder-gray-600 focus:outline-none focus:border-[#E91E63] focus:ring-1 focus:ring-[#E91E63] transition-all ${
            errors.email ? 'border-red-500/50' : 'border-white/5'
          }`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1.5 font-sans">{errors.email}</p>}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2 font-mono">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#0A0B0D]/50 border border-white/5 rounded-lg text-white font-sans placeholder-gray-600 focus:outline-none focus:border-[#E91E63] focus:ring-1 focus:ring-[#E91E63] transition-all"
          placeholder="Project Collaboration"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2 font-mono">
          Message <span className="text-[#E91E63]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#0A0B0D]/50 border rounded-lg text-white font-sans placeholder-gray-600 focus:outline-none focus:border-[#E91E63] focus:ring-1 focus:ring-[#E91E63] transition-all resize-none ${
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

      {/* Submit */}
      <button
        type="submit"
        disabled={submitStatus === 'submitting'}
        className="w-full py-4 text-xs font-semibold uppercase tracking-wider rounded-lg border border-[#E91E63] text-white bg-[#E91E63] hover:bg-[#C2185B] disabled:bg-[#E91E63]/50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all font-mono shadow-lg shadow-[#E91E63]/10 cursor-pointer"
      >
        {submitStatus === 'submitting' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send size={16} />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
}
