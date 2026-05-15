import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { easeCustom, easeReveal } from '../../utils/motionVariants';
import type { NavLink } from '../../types';
import './Navbar.css';

const navLinks: NavLink[] = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Services', href: '#services' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const handleScroll = useCallback((): void => {
    setIsScrolled(window.scrollY > 50);
    const sections: string[] = navLinks.map((link) => link.href.substring(1));
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = (href: string): void => {
    setIsMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset: number = 80;
      const elementPosition: number =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  // ✅ Variants مصلحة بـ easeReveal typed كـ tuple
  const mobileMenuVariants: Variants = {
    hidden: {
      clipPath: 'circle(0% at calc(100% - 40px) 40px)',
      transition: { duration: 0.5, ease: easeReveal },
    },
    visible: {
      clipPath: 'circle(150% at calc(100% - 40px) 40px)',
      transition: { duration: 0.7, ease: easeReveal },
    },
  };

  // ✅ لما نحتاج custom delay، نستخدم animate مباشرة مش variants
  const linkBaseVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: easeCustom,
      },
    },
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 2.5, ease: easeCustom }}
    >
      <div className="navbar__container container">
        {/* Logo */}
        <motion.a
          href="#hero"
          className="navbar__logo"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="navbar__logo-bracket">&lt;</span>
          <span className="navbar__logo-name">IR</span>
          <span className="navbar__logo-bracket">/&gt;</span>
        </motion.a>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map((link: NavLink, index: number) => (
            <li key={link.name}>
              <motion.a
                href={link.href}
                className={`navbar__link ${
                  activeSection === link.href.substring(1)
                    ? 'navbar__link--active'
                    : ''
                }`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <span className="navbar__link-number">0{index + 1}.</span>
                {link.name}
              </motion.a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.a
          href="#contact"
          className="navbar__cta"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            handleNavClick('#contact');
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 25px rgba(108, 99, 255, 0.4)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          Let's Talk
        </motion.a>

        {/* Mobile Toggle */}
        <button
          className="navbar__mobile-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <HiX size={26} /> : <HiMenuAlt4 size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="navbar__mobile"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="navbar__mobile-content">
              {navLinks.map((link: NavLink, index: number) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="navbar__mobile-link"
                  variants={linkBaseVariants}
                  initial="hidden"
                  animate="visible"
                  // ✅ نحط الـ transition مباشرة على العنصر مش في الـ variants
                  transition={{
                    delay: 0.3 + index * 0.08,
                    duration: 0.5,
                    ease: easeCustom,
                  }}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  <span className="navbar__mobile-link-number">
                    0{index + 1}
                  </span>
                  <span className="navbar__mobile-link-text">{link.name}</span>
                </motion.a>
              ))}

              <motion.div
                className="navbar__mobile-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <a href="mailto:ibrahimrefaat047@gmail.com">
                  ibrahimrefaat047@gmail.com
                </a>
                <a href="tel:+201126007365">+20 112 600 7365</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;