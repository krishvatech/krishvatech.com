import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

interface LogoProps {
  variant?: 'full' | 'short' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  to?: string;
}

export const Logo = ({ 
  variant = 'full', 
  size = 'md', 
  className = '', 
  to = '/' 
}: LogoProps) => {
  const logoContent = (
    <div className={`${styles.logo} ${styles[variant]} ${styles[size]} ${className}`}>
      {/* Logo image */}
      <div className={styles.iconContainer}>
        <img 
          src="https://assets.floot.app/6bcce8aa-7f32-4573-a4b4-bdb405c912d4/0009847c-95bc-420b-b38e-cde25cb5a3bd.png"
          alt="KrishvaTech logo"
          className={styles.logoImage}
        />
      </div>
      
      {/* Text content */}
      {variant !== 'icon' && (
        <div className={styles.textContainer}>
          {variant === 'full' ? (
            <>
              <span className={styles.primaryText}>
                KRISHVA<span className={styles.techHighlight}>TECH</span>
              </span>
              <span className={styles.subtitle}>PRIVATE LIMITED</span>
            </>
          ) : (
            <span className={styles.primaryText}>
              KRISHVA<span className={styles.techHighlight}>TECH</span>
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className={styles.logoLink}>
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};