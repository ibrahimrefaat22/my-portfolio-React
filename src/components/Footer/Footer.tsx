import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaGithub,
  FaLinkedinIn,
  FaHeart,
} from 'react-icons/fa';
import { HiOutlineMail, HiOutlineArrowUp } from 'react-icons/hi';
import './Footer.css';

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSocial {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const Footer: React.FC = () => {
  const [footerRef, footerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const currentYear: number = new Date().getFullYear();

  const quickLinks: FooterLink[] = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const socials: FooterSocial[] = [
    {
      icon: <FaGithub size={18} />,
      href: 'https://github.com',
      label: 'GitHub',
    },
    {
      icon: <FaLinkedinIn size={18} />,
      href: 'https://linkedin.com',
      label: 'LinkedIn',
    },
    {
      icon: <HiOutlineMail size={18} />,
      href: 'mailto:ibrahimrefaat047@gmail.com',
      label: 'Email',
    },
  ];

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string): void => {
    const element = document.querySelector(href);
    if (element) {
      const offset: number = 80;
      const elementPosition: number =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="footer" ref={footerRef}>
      {/* Top Divider */}
      <div className="footer__divider">
        <motion.div
          className="footer__divider-line"
          initial={{ width: 0 }}
          animate={footerInView ? { width: '100%' } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>

      <div className="container">
        <motion.div
          className="footer__content"
          initial={{ opacity: 0, y: 30 }}
          animate={footerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Top Section */}
          <div className="footer__top">
            {/* Brand */}
            <div className="footer__brand">
              <a
                href="#hero"
                className="footer__logo"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  scrollToTop();
                }}
              >
                <span className="footer__logo-bracket">&lt;</span>
                <span className="footer__logo-name">IR</span>
                <span className="footer__logo-bracket">/&gt;</span>
              </a>
              <p className="footer__brand-text">
                Frontend Developer crafting exceptional digital experiences with
                React, TypeScript, and modern web technologies.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer__links-section">
              <h4 className="footer__links-title">Quick Links</h4>
              <ul className="footer__links">
                {quickLinks.map((link: FooterLink) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="footer__link"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__contact-section">
              <h4 className="footer__links-title">Get In Touch</h4>
              <div className="footer__contact-items">
                <a
                  href="mailto:ibrahimrefaat047@gmail.com"
                  className="footer__contact-item"
                >
                  ibrahimrefaat047@gmail.com
                </a>
                <a href="tel:+201126007365" className="footer__contact-item">
                  +20 112 600 7365
                </a>
                <span className="footer__contact-item">Cairo, Egypt</span>
              </div>

              {/* Socials */}
              <div className="footer__socials">
                {socials.map((social: FooterSocial, index: number) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="footer__social"
                    aria-label={social.label}
                    whileHover={{ y: -4, color: '#6C63FF' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="footer__bottom">
            <p className="footer__copyright">
              © {currentYear} Ibrahim Refaat. Built with{' '}
              <motion.span
                className="footer__heart"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaHeart size={12} />
              </motion.span>{' '}
              using React & TypeScript
            </p>

            {/* Back to Top */}
            <motion.button
              className="footer__back-to-top"
              onClick={scrollToTop}
              whileHover={{
                y: -4,
                boxShadow: '0 4px 15px rgba(108, 99, 255, 0.3)',
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Back to top"
            >
              <HiOutlineArrowUp size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;