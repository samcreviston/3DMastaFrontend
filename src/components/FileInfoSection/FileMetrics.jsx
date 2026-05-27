import styles from './FileMetrics.module.css';

function formatMetricValue(value, suffix = '') {
  if (value === null || value === undefined) {
    return '—';
  }

  return `${new Intl.NumberFormat('en-US').format(value)}${suffix}`;
}

function FileMetrics({ metrics, statusMessage }) {
  return (
    <aside className={styles.fileMetrics} aria-label="File metrics">
      <div className={styles.fileMetricsCard}>
        <div className={styles.fileMetricsItem}>
          <span className={styles.fileMetricsLabel}>Triangle Count</span>
          <strong className={styles.fileMetricsValue}>{formatMetricValue(metrics.triangleCount)}</strong>
        </div>
        <div className={styles.fileMetricsItem}>
          <span className={styles.fileMetricsLabel}>Vertex Count</span>
          <strong className={styles.fileMetricsValue}>{formatMetricValue(metrics.vertexCount)}</strong>
        </div>
        <div className={styles.fileMetricsItem}>
          <span className={styles.fileMetricsLabel}>Volume</span>
          <strong className={styles.fileMetricsValue}>{formatMetricValue(metrics.volume)}</strong>
        </div>
      </div>
      <p className={styles.fileMetricsStatus}>{statusMessage}</p>
    </aside>
  );
}

export default FileMetrics;
