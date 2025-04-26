"use client";

import React from 'react';
import styles from './FlowSection.module.css';

// Add type definitions for lottie-player
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          background?: string;
          speed?: string;
          style?: React.CSSProperties;
          loop?: boolean;
          autoplay?: boolean;
        },
        HTMLElement
      >;
    }
  }
}

/**
 * FlowSection Component
 * Displays the step-by-step process of using the AI Safety Incident Dashboard
 * Each step includes a Lottie animation, number, and description
 */
const FlowSection = () => {
  // Flow steps data
  const steps = [
    {
      number: 1,
      title: "Report New Incident",
      description: "Fill in Title, Description, and choose Severity (Low / Medium / High). Submit to add it to the incident list.",
      animation: "https://assets10.lottiefiles.com/packages/lf20_ydo1amjm.json"
    },
    {
      number: 2,
      title: "Filter by Severity",
      description: "Select severity level to view only relevant incidents: Low, Medium, High, or All.",
      animation: "https://assets4.lottiefiles.com/private_files/lf30_obidsi0t.json"
    },
    {
      number: 3,
      title: "Sort by Reported Date",
      description: "Sort the list to view incidents: Newest First or Oldest First.",
      animation: "https://assets7.lottiefiles.com/packages/lf20_hzgq1iov.json"
    },
    {
      number: 4,
      title: "View Incident Details",
      description: "Click 'View Details' to expand and read full incident descriptions.",
      animation: "https://assets1.lottiefiles.com/packages/lf20_pwohahvd.json"
    },
    {
      number: 5,
      title: "Browse All Incidents",
      description: "Review, filter, sort, and manage incidents during the current session.",
      animation: "https://assets4.lottiefiles.com/private_files/lf30_obidsi0t.json"
    }
  ];

  return (
    <section className={styles.flowSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.heading}>AI Safety Incident Dashboard Flow</h2>
          <p className={styles.subheading}>
            Seamless reporting, filtering, sorting, and reviewing of AI safety incidents to ensure a safer digital world.
          </p>
        </div>

        {/* Flow Steps */}
        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={step.number} className={styles.step}>
              {/* Left or Right Content based on step number */}
              <div className={`${styles.stepContent} ${index % 2 === 0 ? styles.leftContent : styles.rightContent}`}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>

              {/* Middle Stepper */}
              <div className={styles.stepIndicator}>
                <div className={styles.stepNumber}>
                  <span>{step.number}</span>
                </div>
                {index < steps.length - 1 && <div className={styles.stepLine} />}
              </div>

              {/* Left or Right Animation based on step number */}
              <div className={`${styles.animationContainer} ${index % 2 === 0 ? styles.rightAnimation : styles.leftAnimation}`}>
                <lottie-player 
                  src={step.animation}
                  background="transparent"
                  speed="1"
                  style={{ width: '100%', height: '200px' }}
                  loop
                  autoplay>
                </lottie-player>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlowSection; 