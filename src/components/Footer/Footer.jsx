import styles from './Footer.module.css';

function SocialIcon({ label, children }) {
  return (
    <button className={styles.footerSocialButton} type="button" aria-label={label}>
      {children}
    </button>
  );
}

function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.siteFooterInner}>
        <div className={styles.siteFooterTopRow}>
          <a className={styles.siteFooterEmail} href="mailto:hello@3dmasta.com">
            hello@3dmasta.com
          </a>
          <div className={styles.siteFooterName}>3DMasta</div>
          <div className={styles.siteFooterSocials} aria-label="Social media links">
            <SocialIcon label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.94 8.54H4.1V20h2.84V8.54ZM5.52 4.3a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3Zm12.76 4.01c-1.73 0-2.88.94-3.35 1.82h-.04V8.54h-2.72V20h2.84v-5.65c0-1.49.28-2.93 2.12-2.93 1.82 0 1.84 1.7 1.84 3.02V20h2.84v-6.26c0-3.07-.66-5.43-3.53-5.43Z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.5 8.5V7.13c0-.62.42-.76.71-.76H18V3h-3.12C11.99 3 11 5.25 11 7.77V8.5H8v3h3V21h3.5v-9.5H18l.5-3h-4Z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.75 3h8.5A4.75 4.75 0 0 1 21 7.75v8.5A4.75 4.75 0 0 1 16.25 21h-8.5A4.75 4.75 0 0 1 3 16.25v-8.5A4.75 4.75 0 0 1 7.75 3Zm0 1.75A3 3 0 0 0 4.75 7.75v8.5a3 3 0 0 0 3 3h8.5a3 3 0 0 0 3-3v-8.5a3 3 0 0 0-3-3h-8.5ZM12 7.1A4.9 4.9 0 1 1 7.1 12 4.9 4.9 0 0 1 12 7.1Zm0 1.75A3.15 3.15 0 1 0 15.15 12 3.15 3.15 0 0 0 12 8.85Zm5.3-2.12a1.02 1.02 0 1 1-1.02 1.02 1.02 1.02 0 0 1 1.02-1.02Z" />
              </svg>
            </SocialIcon>
          </div>
        </div>
        <div className={styles.siteFooterBottomRow}>
          <div className={styles.siteFooterDisclaimer}>
            This site is in development and is not ready for professional use.
          </div>
          <div className={styles.siteFooterCopyright}>© 2026 3DMasta. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
