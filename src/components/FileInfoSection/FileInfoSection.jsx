import styles from './FileInfoSection.module.css';
import FileMetrics from './FileMetrics';
import FileRating from './FileRating';
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
        <FileRating metrics={metrics} />
        <FileViewWindow selectedFile={selectedFile} metricsReady={metricsReady} />
        <FileMetrics metrics={metrics} statusMessage={statusMessage} />
      </div>
    </section>
  );
}

export default FileInfoSection;
