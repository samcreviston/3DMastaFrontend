import styles from './FileViewWindow.module.css';

function FileViewWindow() {
  return (
    <section className={styles.fileView} aria-label="File view window">
      <div className={styles.fileViewCard}>
        <span className={styles.fileViewLabel}>file view window</span>
        <p className={styles.fileViewText}>Reserved for the future Three.js preview and geometry inspection tools.</p>
      </div>
    </section>
  );
}

export default FileViewWindow;
