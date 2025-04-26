import React from 'react';
import styles from './Hero.module.css';

/**
 * Hero Component
 * Displays the main hero section with heading, subheading, and Lottie animation
 * The animation is contained in a circular container for better visual appeal
 */
const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      {/* Left side content with heading and subheading */}
      <div className={styles.content}>
        <h1 className={styles.heading}>🛡️ AI Safety Incident Dashboard</h1>
        <p className={styles.subheading}>
          Track AI system behaviors and promote responsible innovation with ease.
        </p>
      </div>
      
      {/* Right side animation container */}
      <div className={styles.animationWrapper}>
        <div className={styles.circularContainer}>
          <lottie-player 
            src="https://assets2.lottiefiles.com/packages/lf20_0yfsb3a1.json"  
            background="transparent"  
            speed="1"  
            style={{ width: '100%', height: '100%' }}  
            loop  
            autoplay>
          </lottie-player>
        </div>
      </div>
    </div>
  );
};

export default Hero; 