import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlinePaperAirplane,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { easeCustom } from '../../utils/motionVariants';
import type { ContactForm } from '../../types';
import './Contact.css';
import emailjs from '@emailjs/browser';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  interface ContactInfoItem {
    icon: React.ReactNode;
    label: string;
    value: string;
    href: string;
    color: string;
  }

  const contactInfo: ContactInfoItem[] = [
    { icon: <HiOutlineMail size={22} />, label: 'Email', value: 'ibrahimrefaat047@gmail.com', href: 'mailto:ibrahimrefaat047@gmail.com', color: '#6C63FF' },
    { icon: <HiOutlinePhone size={22} />, label: 'Phone', value: '+20 112 600 7365', href: 'tel:+201126007365', color: '#00D4AA' },
    { icon: <HiOutlineLocationMarker size={22} />, label: 'Location', value: 'Cairo, Egypt', href: '#', color: '#FF6B6B' },
  ];

  interface SocialLinkItem {
    icon: React.ReactNode;
    label: string;
    href: string;
    color: string;
  }

  const socialLinks: SocialLinkItem[] = [
    { icon: <FaGithub size={20} />, label: 'GitHub', href: 'https://github.com', color: '#FFFFFF' },
    { icon: <FaLinkedinIn size={20} />, label: 'LinkedIn', href: 'https://linkedin.com', color: '#0A66C2' },
    { icon: <HiOutlineMail size={20} />, label: 'Email', href: 'mailto:ibrahimrefaat047@gmail.com', color: '#6C63FF' },
  ];

  // ✅ Variants مصلحة
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeCustom },
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();
  setFormStatus('sending');
  
  try {
    await emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current!,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    
    setFormStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setFormStatus('idle'), 4000);
  } catch {
    setFormStatus('error');
    setTimeout(() => setFormStatus('idle'), 4000);
  }
};

  return (
    <section className="contact section" id="contact">
      <div className="contact__orb contact__orb--1" />
      <div className="contact__orb contact__orb--2" />

      <div className="container">
        <motion.div
          className="section__header"
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeCustom }}
        >
          <span className="section__label">// Get In Touch</span>
          <h2 className="section__title">Let's Work Together</h2>
          <p className="section__subtitle">
            Have a project idea, a question, or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          className="contact__grid"
          ref={contentRef}
          variants={containerVariants}
          initial="hidden"
          animate={contentInView ? 'visible' : 'hidden'}
        >
          {/* Left - Info */}
          <motion.div className="contact__info" variants={itemVariants}>
            <h3 className="contact__info-title">
              Let's build something
              <span className="contact__info-title--accent"> extraordinary</span>
            </h3>
            <p className="contact__info-text">
              I'm always excited to take on new challenges and collaborate on innovative projects.
              Whether you need a frontend developer, a technical mentor, or a partner to bring your
              vision to life — let's connect.
            </p>

            <div className="contact__details">
              {contactInfo.map((info: ContactInfoItem, index: number) => (
                <motion.a
                  key={index}
                  href={info.href}
                  className="contact__detail"
                  variants={itemVariants}
                  whileHover={{ x: 8, borderColor: `${info.color}40` }}
                >
                  <div className="contact__detail-icon" style={{ color: info.color, background: `${info.color}10` }}>
                    {info.icon}
                  </div>
                  <div className="contact__detail-content">
                    <span className="contact__detail-label">{info.label}</span>
                    <span className="contact__detail-value">{info.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="contact__socials">
              <span className="contact__socials-label">Find me on</span>
              <div className="contact__socials-links">
                {socialLinks.map((link: SocialLinkItem, index: number) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact__social-link"
                    aria-label={link.label}
                    whileHover={{ y: -4, borderColor: `${link.color}50`, color: link.color }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div className="contact__form-wrapper" variants={itemVariants}>
            <form ref={formRef} className="contact__form" onSubmit={handleSubmit}>
              {/* Name */}
              <div className={`contact__field ${focusedField === 'name' ? 'contact__field--focused' : ''} ${formData.name ? 'contact__field--filled' : ''}`}>
                <label className="contact__label" htmlFor="name">Your Name</label>
                <input
                  type="text" id="name" name="name"
                  className="contact__input"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required autoComplete="name"
                />
                <div className="contact__field-line" />
              </div>

              {/* Email */}
              <div className={`contact__field ${focusedField === 'email' ? 'contact__field--focused' : ''} ${formData.email ? 'contact__field--filled' : ''}`}>
                <label className="contact__label" htmlFor="email">Your Email</label>
                <input
                  type="email" id="email" name="email"
                  className="contact__input"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required autoComplete="email"
                />
                <div className="contact__field-line" />
              </div>

              {/* Subject */}
              <div className={`contact__field ${focusedField === 'subject' ? 'contact__field--focused' : ''} ${formData.subject ? 'contact__field--filled' : ''}`}>
                <label className="contact__label" htmlFor="subject">Subject</label>
                <input
                  type="text" id="subject" name="subject"
                  className="contact__input"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  required autoComplete="off"
                />
                <div className="contact__field-line" />
              </div>

              {/* Message */}
              <div className={`contact__field contact__field--textarea ${focusedField === 'message' ? 'contact__field--focused' : ''} ${formData.message ? 'contact__field--filled' : ''}`}>
                <label className="contact__label" htmlFor="message">Your Message</label>
                <textarea
                  id="message" name="message"
                  className="contact__textarea"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <div className="contact__field-line" />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className={`contact__submit ${formStatus === 'sending' ? 'contact__submit--sending' : ''} ${formStatus === 'success' ? 'contact__submit--success' : ''} ${formStatus === 'error' ? 'contact__submit--error' : ''}`}
                disabled={formStatus === 'sending'}
                whileHover={formStatus === 'idle' ? { scale: 1.02, boxShadow: '0 0 30px rgba(108, 99, 255, 0.4)' } : {}}
                whileTap={formStatus === 'idle' ? { scale: 0.98 } : {}}
              >
                {formStatus === 'idle' && (<><span>Send Message</span><HiOutlinePaperAirplane size={18} /></>)}
                {formStatus === 'sending' && (
                  <><span>Sending...</span>
                    <motion.div className="contact__submit-spinner" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                  </>
                )}
                {formStatus === 'success' && (<><span>Message Sent!</span><HiOutlineCheckCircle size={18} /></>)}
                {formStatus === 'error' && (<><span>Failed. Try Again</span><HiOutlineExclamationCircle size={18} /></>)}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;