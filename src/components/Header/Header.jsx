import styles from './Header.module.css';
import logo from '../../assets/logo.svg';

function Header() {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.siteHeaderInner}>
        <a className={styles.siteHeaderBrand} href="/" aria-label="3DMasta home">
          <img className={styles.siteHeaderLogo} src={logo} alt="3DMasta logo" width="34" height="34" />
        </a>
        <div className={styles.siteHeaderTitleWrap} aria-label="3DMasta">
          <span className={styles.siteHeaderTitle}>3DMasta</span>
        </div>
        <button className={styles.siteHeaderButton} type="button">
          Sign In
        </button>
      </div>
    </header>
  );
}

export default Header;
