import styles from './FileMetrics.module.css';

function formatMetricValue(value, suffix = '', fractionDigits = null) {
  if (value === null || value === undefined) {
    return '—';
  }

  const formatterOptions =
    fractionDigits === null
      ? undefined
      : {
          minimumFractionDigits: fractionDigits,
          maximumFractionDigits: fractionDigits,
        };

  return `${new Intl.NumberFormat('en-US', formatterOptions).format(value)}${suffix}`;
}

function FileMetrics({ metrics, statusMessage, metricsReady }) {
  return (
    <aside className={styles.fileMetrics} aria-label="File metrics">
      <div className={metricsReady ? `${styles.fileMetricsCard} ${styles.fileMetricsCardReady}` : styles.fileMetricsCard}>
        <div className={styles.fileMetricsItem}>
          <span className={styles.fileMetricsLabel}>Triangle Count</span>
          <strong className={styles.fileMetricsValue}>{formatMetricValue(metrics.triangleCount)}</strong>
        </div>
        <div className={styles.fileMetricsItem}>
          <span className={styles.fileMetricsLabel}>Vertex Count</span>
          <strong className={styles.fileMetricsValue}>{formatMetricValue(metrics.vertexCount)}</strong>
        </div>
        <div className={styles.fileMetricsItem}>
          <span className={styles.fileMetricsLabel}>Surface Area</span>
          <strong className={styles.fileMetricsValue}>{formatMetricValue(metrics.surfaceArea, ' mm^2', 1)}</strong>
        </div>
        <div className={styles.fileMetricsItem}>
          <span className={styles.fileMetricsLabel}>Volume</span>
          <strong className={styles.fileMetricsValue}>{formatMetricValue(metrics.volume, ' mm^3', 1)}</strong>
        </div>
      </div>
      <p className={styles.fileMetricsStatus}>{statusMessage}</p>
    </aside>
  );
}

export default FileMetrics;
