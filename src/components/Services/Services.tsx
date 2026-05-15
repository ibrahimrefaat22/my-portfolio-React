import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HiOutlineCode,
  HiOutlineDeviceMobile,
  HiOutlineLightningBolt,
  HiOutlineTemplate,
  HiOutlineCog,
  HiOutlineAcademicCap,
  HiOutlineArrowRight,
} from 'react-icons/hi';
import { easeCustom } from '../../utils/motionVariants';
import './Services.css';

interface ServiceItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
  gradient: string;
}

const Services: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [gridRef, gridInView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const services: ServiceItem[] = [
    {
      id: 1,
      icon: <HiOutlineCode size={28} />,
      title: 'Frontend Development',
      description:
        'Building performant, scalable web applications using React.js, TypeScript, and modern frontend architecture. From SPAs to complex dashboards.',
      features: [
        'React.js & Next.js Applications',
        'TypeScript Integration',
        'Redux & State Management',
        'Component Architecture Design',
      ],
      color: '#6C63FF',
      gradient: 'linear-gradient(135deg, #6C63FF20, #6C63FF05)',
    },
    {
      id: 2,
      icon: <HiOutlineDeviceMobile size={28} />,
      title: 'Responsive Web Design',
      description:
        'Crafting pixel-perfect, mobile-first interfaces that look stunning on every device. Tailwind CSS, animations, and modern UI patterns.',
      features: [
        'Mobile-First Approach',
        'Tailwind CSS & Custom Styling',
        'Cross-Browser Compatibility',
        'Accessibility (a11y) Standards',
      ],
      color: '#00D4AA',
      gradient: 'linear-gradient(135deg, #00D4AA20, #00D4AA05)',
    },
    {
      id: 3,
      icon: <HiOutlineLightningBolt size={28} />,
      title: 'Performance Optimization',
      description:
        'Analyzing and optimizing web application performance — lazy loading, code splitting, caching strategies, and Core Web Vitals improvement.',
      features: [
        'Lazy Loading & Code Splitting',
        'Bundle Size Optimization',
        'Core Web Vitals',
        'Lighthouse Score Improvement',
      ],
      color: '#FF6B6B',
      gradient: 'linear-gradient(135deg, #FF6B6B20, #FF6B6B05)',
    },
    {
      id: 4,
      icon: <HiOutlineTemplate size={28} />,
      title: 'UI/UX Implementation',
      description:
        'Translating Figma/design specs into interactive, animated interfaces using Framer Motion and modern CSS techniques.',
      features: [
        'Figma to React Conversion',
        'Framer Motion Animations',
        'Micro-interactions Design',
        'Design System Development',
      ],
      color: '#FFCA28',
      gradient: 'linear-gradient(135deg, #FFCA2820, #FFCA2805)',
    },
    {
      id: 5,
      icon: <HiOutlineCog size={28} />,
      title: 'Firebase Integration',
      description:
        'Full Firebase ecosystem integration — Authentication, Firestore, Realtime Database, Hosting, and CI/CD pipeline setup.',
      features: [
        'Firebase Auth & Firestore',
        'Realtime Database Sync',
        'Firebase Hosting & CI/CD',
        'Role-Based Access Control',
      ],
      color: '#FF9100',
      gradient: 'linear-gradient(135deg, #FF910020, #FF910005)',
    },
    {
      id: 6,
      icon: <HiOutlineAcademicCap size={28} />,
      title: 'Technical Mentorship',
      description:
        'One-on-one or team mentoring in React.js, JavaScript, and frontend best practices. Curriculum design and code review sessions.',
      features: [
        'React.js & JS Mentoring',
        'Code Review Sessions',
        'Curriculum Development',
        'Project-Based Learning',
      ],
      color: '#E040FB',
      gradient: 'linear-gradient(135deg, #E040FB20, #E040FB05)',
    },
  ];

  // ✅ Variants مصلحة — بنستخدم easeCustom كـ tuple
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeCustom,   // ✅ مصلح — easeCustom هو tuple مش number[]
      },
    },
  };

  return (
    <section className="services section" id="services">
      {/* Background */}
      <div className="services__orb services__orb--1" />
      <div className="services__orb services__orb--2" />

      <div className="container">
        {/* Header */}
        <motion.div
          className="section__header"
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeCustom }}
        >
          <span className="section__label">// What I Offer</span>
          <h2 className="section__title">Services</h2>
          <p className="section__subtitle">
            From concept to deployment — I deliver end-to-end frontend solutions
            tailored to your needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="services__grid"
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
        >
          {services.map((service: ServiceItem) => (
            <motion.div
              key={service.id}
              className={`service-card ${
                hoveredService === service.id ? 'service-card--hovered' : ''
              }`}
              variants={cardVariants}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Card Gradient Background */}
              <motion.div
                className="service-card__bg"
                style={{ background: service.gradient }}
                animate={{
                  opacity: hoveredService === service.id ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Top Border Accent */}
              <motion.div
                className="service-card__accent"
                style={{ background: service.color }}
                animate={{
                  width: hoveredService === service.id ? '100%' : '0%',
                }}
                transition={{ duration: 0.4, ease: easeCustom }}
              />

              {/* Content */}
              <div className="service-card__content">
                {/* Icon */}
                <motion.div
                  className="service-card__icon"
                  style={{
                    color: service.color,
                    background: `${service.color}10`,
                    borderColor: `${service.color}25`,
                  }}
                  animate={{
                    scale: hoveredService === service.id ? 1.1 : 1,
                    borderColor:
                      hoveredService === service.id
                        ? `${service.color}50`
                        : `${service.color}25`,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <h3 className="service-card__title">{service.title}</h3>

                {/* Description */}
                <p className="service-card__description">{service.description}</p>

                {/* Features */}
                <ul className="service-card__features">
                  {service.features.map((feature: string, i: number) => (
                    <motion.li
                      key={i}
                      className="service-card__feature"
                      initial={false}
                      animate={{
                        x: hoveredService === service.id ? 5 : 0,
                      }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <span
                        className="service-card__feature-dot"
                        style={{ background: service.color }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Learn More */}
                <motion.div
                  className="service-card__cta"
                  style={{ color: service.color }}
                  animate={{
                    opacity: hoveredService === service.id ? 1 : 0,
                    y: hoveredService === service.id ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span>Learn More</span>
                  <HiOutlineArrowRight size={14} />
                </motion.div>
              </div>

              {/* Card Number */}
              <div className="service-card__number">
                {String(service.id).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="services__bottom"
          initial={{ opacity: 0, y: 30 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="services__bottom-text">
            Have a project in mind? Let's discuss how I can help.
          </p>
          <motion.a
            href="#contact"
            className="services__bottom-btn"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(108, 99, 255, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              document
                .querySelector('#contact')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Start a Conversation</span>
            <HiOutlineArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;