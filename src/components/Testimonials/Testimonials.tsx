import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOutlineStar, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { easeCustom } from '../../utils/motionVariants';
import './Testimonials.css';

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  initials: string;
  color: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      role: 'Event Director',
      company: 'Global Robotics Challenge',
      content: 'Ibrahim delivered two mission-critical systems for our national championship under tight deadlines. The real-time scoring platform handled 13 competitions flawlessly, and the QR attendance system cut our check-in time by 80%. His technical skills and leadership were outstanding.',
      rating: 5,
      initials: 'AH',
      color: '#6C63FF',
    },
    {
      id: 2,
      name: 'Sara Mohamed',
      role: 'Branch Manager',
      company: 'Discovery Academy',
      content: 'Promoting Ibrahim to Team Leader was one of our best decisions. He standardized our entire programming curriculum, improved student completion rates by 40%, and mentored our junior instructors to become significantly more effective. A true leader.',
      rating: 5,
      initials: 'SM',
      color: '#00D4AA',
    },
    {
      id: 3,
      name: 'Omar Khalil',
      role: 'Senior Developer',
      company: 'Sphinx Company',
      content: 'During his internship, Ibrahim stood out immediately. He shipped 3 React applications within the Agile framework, optimized page loads by 25%, and participated actively in code reviews. He operates at a level well beyond his experience.',
      rating: 5,
      initials: 'OK',
      color: '#FF6B6B',
    },
    {
      id: 4,
      name: 'Mona Adel',
      role: 'Program Coordinator',
      company: 'Zoser Institute',
      content: "Ibrahim's project-first teaching approach transformed our web development courses. Students were shipping real websites by the end of the program. His lesson plans reduced our prep time by 30% and became the template for future cohorts.",
      rating: 5,
      initials: 'MA',
      color: '#FFCA28',
    },
    {
      id: 5,
      name: 'Youssef Tarek',
      role: 'CS Student',
      company: 'Discovery Academy',
      content: "Ibrahim is the reason I fell in love with programming. His teaching style makes complex React concepts feel intuitive. He doesn't just teach syntax — he teaches you how to think like a developer. Best instructor I've ever had.",
      rating: 5,
      initials: 'YT',
      color: '#E040FB',
    },
  ];

  const nextTestimonial = useCallback((): void => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, [testimonials.length]);

  const prevTestimonial = useCallback((): void => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, [testimonials.length]);

  const goToTestimonial = (index: number): void => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    // ✅ استخدام ReturnType بدل NodeJS.Timeout
    const timer: ReturnType<typeof setInterval> = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextTestimonial]);

  // ✅ Variants مصلحة
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: easeCustom },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.5, ease: easeCustom },
    }),
  };

  const currentTestimonial: TestimonialItem = testimonials[currentIndex];

  return (
    <section className="testimonials section" id="testimonials">
      <div className="testimonials__orb testimonials__orb--1" />
      <div className="testimonials__orb testimonials__orb--2" />

      <div className="container">
        <motion.div
          className="section__header"
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeCustom }}
        >
          <span className="section__label">// Testimonials</span>
          <h2 className="section__title">What People Say</h2>
          <p className="section__subtitle">
            Feedback from colleagues, managers, and students I've had the privilege of working with.
          </p>
        </motion.div>

        <motion.div
          className="testimonials__content"
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="testimonials__slider">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                className="testimonial-card"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="testimonial-card__quote">"</div>
                <p className="testimonial-card__content">{currentTestimonial.content}</p>

                <div className="testimonial-card__rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <HiOutlineStar
                      key={i}
                      size={18}
                      className={`testimonial-card__star ${i < currentTestimonial.rating ? 'testimonial-card__star--filled' : ''}`}
                      style={{
                        color: i < currentTestimonial.rating ? '#FFCA28' : 'var(--dark-border)',
                        fill: i < currentTestimonial.rating ? '#FFCA28' : 'transparent',
                      }}
                    />
                  ))}
                </div>

                <div className="testimonial-card__author">
                  <div
                    className="testimonial-card__avatar"
                    style={{
                      background: `${currentTestimonial.color}15`,
                      borderColor: `${currentTestimonial.color}40`,
                      color: currentTestimonial.color,
                    }}
                  >
                    {currentTestimonial.initials}
                  </div>
                  <div className="testimonial-card__author-info">
                    <span className="testimonial-card__name">{currentTestimonial.name}</span>
                    <span className="testimonial-card__role">
                      {currentTestimonial.role} at {currentTestimonial.company}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="testimonials__controls">
            <div className="testimonials__arrows">
              <motion.button className="testimonials__arrow" onClick={prevTestimonial} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Previous">
                <HiOutlineChevronLeft size={20} />
              </motion.button>
              <motion.button className="testimonials__arrow" onClick={nextTestimonial} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Next">
                <HiOutlineChevronRight size={20} />
              </motion.button>
            </div>

            <div className="testimonials__dots">
              {testimonials.map((_: TestimonialItem, index: number) => (
                <motion.button
                  key={index}
                  className={`testimonials__dot ${currentIndex === index ? 'testimonials__dot--active' : ''}`}
                  onClick={() => goToTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  aria-label={`Testimonial ${index + 1}`}
                >
                  {currentIndex === index && (
                    <motion.div
                      className="testimonials__dot-fill"
                      layoutId="activeDot"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="testimonials__counter">
              <span className="testimonials__counter-current">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="testimonials__counter-divider">/</span>
              <span className="testimonials__counter-total">{String(testimonials.length).padStart(2, '0')}</span>
            </div>
          </div>

          <div className="testimonials__progress">
            <motion.div
              className="testimonials__progress-bar"
              key={currentIndex}
              initial={{ width: '0%' }}
              animate={{ width: isAutoPlaying ? '100%' : '0%' }}
              transition={{ duration: isAutoPlaying ? 5 : 0, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;