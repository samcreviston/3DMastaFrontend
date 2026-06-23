import styles from './FileInfoSection.module.css';
import FileMetrics from './FileMetrics';
import FileViewWindow from './FileViewWindow';

function FileInfoSection({ metrics, statusMessage, selectedFile, metricsReady }) {
  return (
    <section className={styles.fileInfo} aria-labelledby="file-info-title">
      <div className={styles.fileInfoHeader}>
        <h2 id="file-info-title" className={styles.fileInfoTitle}>
          File Info
        </h2>
      </div>
      <div className={styles.fileInfoGrid}>
        <FileMetrics metrics={metrics} statusMessage={statusMessage} />
        <FileViewWindow selectedFile={selectedFile} metricsReady={metricsReady} />
      </div>
    </section>
  );
}

export default FileInfoSection;
