import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import { Button } from './Button';
import { Logo } from './Logo';
import styles from './SharedLayout.module.css';

const navLinks = [
  { name: 'Services', href: '/#services' },
  { name: 'Expertise', href: '/#expertise' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const socialLinks = [
  { name: 'LinkedIn', icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/company/krishvatech-pvtltd/' },
];

export const SharedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Logo variant="full" size="md" />
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className={styles.navLink}>
                {link.name}
              </Link>
            ))}
          </nav>
          <div className={styles.headerActions}>
            <Button asChild variant="outline">
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Logo variant="full" size="lg" />
              <p className={styles.footerSlogan}>Building the future of intelligent interaction.</p>
            </div>
            <div className={styles.footerLinks}>
              {/* Add link columns if needed in the future */}
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} KRISHVATECH PRIVATE LIMITED. All rights reserved.
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} className={styles.socialLink} aria-label={link.name}>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};