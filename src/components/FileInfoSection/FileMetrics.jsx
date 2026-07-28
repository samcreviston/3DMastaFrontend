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

function MetricLabel({ label, tooltip, tooltipId }) {
  return (
    <span className={styles.fileMetricsLabel}>
      {label}
      <button
        type="button"
        className={styles.metricInfoButton}
        aria-label={`About ${label}`}
        aria-describedby={tooltipId}
      >
        i
      </button>
      <span id={tooltipId} className={styles.metricTooltip} role="tooltip">
        {tooltip}
      </span>
    </span>
  );
}

function FileMetrics({ metrics, statusMessage, metricsReady }) {
  return (
    <aside className={styles.fileMetrics} aria-label="File metrics">
      <div className={metricsReady ? `${styles.fileMetricsCard} ${styles.fileMetricsCardReady}` : styles.fileMetricsCard}>
        <div className={styles.fileMetricsItem}>
          <MetricLabel
            label="Triangle Count"
            tooltip="The number of triangular faces in the imported mesh. More triangles can capture finer detail but require more processing."
            tooltipId="triangle-count-tooltip"
          />
          <strong className={styles.fileMetricsValue}>{formatMetricValue(metrics.triangleCount)}</strong>
        </div>
        <div className={styles.fileMetricsItem}>
          <MetricLabel
            label="Vertex Count"
            tooltip="The number of unique points used to define the mesh's triangular faces."
            tooltipId="vertex-count-tooltip"
          />
          <strong className={styles.fileMetricsValue}>{formatMetricValue(metrics.vertexCount)}</strong>
        </div>
        <div className={styles.fileMetricsItem}>
          <MetricLabel
            label="Surface Area"
            tooltip="The sum of all triangular face areas in the imported mesh."
            tooltipId="surface-area-tooltip"
          />
          <strong className={styles.fileMetricsValue}>{formatMetricValue(metrics.surfaceArea, ' mm^2', 1)}</strong>
        </div>
        <div className={styles.fileMetricsItem}>
          <MetricLabel
            label="Volume"
            tooltip="The space enclosed by the mesh. It is most reliable when the model is watertight."
            tooltipId="volume-tooltip"
          />
          <strong className={styles.fileMetricsValue}>{formatMetricValue(metrics.volume, ' mm^3', 1)}</strong>
        </div>
      </div>
      <p className={styles.fileMetricsStatus}>{statusMessage}</p>
    </aside>
  );
}

export default FileMetrics;
