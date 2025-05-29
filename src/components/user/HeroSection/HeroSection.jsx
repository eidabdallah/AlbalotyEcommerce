import React, { useState, useEffect } from 'react';
import styles from './HeroSection.module.css';
import heroImage from '../../../assets/Hero/Hero.jpg';

const phrases = [
  "Delivered to your doorstep",
  "Quality you can trust",
  "Shop smarter, live better",
  "Offers you can't miss"
];

export default function HeroSection() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const type = () => {
      if (!isDeleting && charIndex <= currentPhrase.length) {
        setText(currentPhrase.substring(0, charIndex));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex >= 0) {
        setText(currentPhrase.substring(0, charIndex));
        setCharIndex((prev) => prev - 1);
      }

      if (charIndex === currentPhrase.length + 1 && !isDeleting) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (charIndex === 0 && isDeleting) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <div
      className={styles.heroSection}
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className={styles.textWrapper}>
        <div className={styles.title}>Everything in One Place</div>
        <div className={styles.subtitle}>{text}</div>
      </div>
    </div>
  );
}
