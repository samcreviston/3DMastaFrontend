import styles from './FileRating.module.css';

function formatWatertightValue(value) {
  if (value === null || value === undefined) {
    return '—';
  }

  return value ? '✓' : 'x';
}

function formatCountValue(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

function getTopologyStatusClass(value, isCount = false) {
  if (value === null || value === undefined) {
    return '';
  }

  const isGood = isCount ? value === 0 : value;
  return isGood ? styles.metricGood : styles.metricBad;
}

function formatDetailRating(value, level) {
  if (value === null || value === undefined) {
    return { descriptor: '—', score: null };
  }

  const score = `(${Math.round(value)} / 200)`;
  return { descriptor: level ?? score, score: level ? score : null };
}

function formatDimensionValue(value) {
  if (value === null || value === undefined) {
    return '—';
  }

  return `${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)} mm`;
}

function MetricLabel({ label, tooltip, tooltipId }) {
  return (
    <span className={styles.fileRatingLabel}>
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

function FileRating({ metrics, metricsReady }) {
  return (
    <aside className={styles.fileRating} aria-label="File rating">
      <div className={metricsReady ? `${styles.fileRatingCard} ${styles.fileRatingCardReady}` : styles.fileRatingCard}>
        <div className={styles.fileRatingItem}>
          <MetricLabel
            label="Detail Rating"
            tooltip="An estimate of geometric detail from triangle density: triangles per unit of surface area. Higher values usually mean finer geometry and larger file sizes."
            tooltipId="detail-rating-tooltip"
          />
          {(() => {
            const { descriptor, score } = formatDetailRating(metrics.triangleDensity, metrics.triangleDensityLevel);
            return (
              <strong className={styles.fileRatingValue}>
                {descriptor}
                {score && <span className={styles.fileRatingScore}>{' '}{score}</span>}
              </strong>
            );
          })()}
        </div>
        <div className={`${styles.fileRatingItem} ${getTopologyStatusClass(metrics.isWatertight)}`}>
          <MetricLabel
            label="Watertight"
            tooltip="A watertight mesh has no open boundaries, so it fully encloses a volume. This is typically needed for reliable 3D printing."
            tooltipId="watertight-tooltip"
          />
          <strong className={styles.fileRatingValue}>{formatWatertightValue(metrics.isWatertight)}</strong>
        </div>
        {metrics.boundaryEdgeCount !== null && metrics.boundaryEdgeCount !== undefined && (
          <div className={`${styles.fileRatingItem} ${getTopologyStatusClass(metrics.boundaryEdgeCount, true)}`}>
            <MetricLabel
              label="Boundary Edge Count"
              tooltip="Edges belonging to only one face. A nonzero count indicates open boundaries."
              tooltipId="boundary-edge-count-tooltip"
            />
            <strong className={styles.fileRatingValue}>{formatCountValue(metrics.boundaryEdgeCount)}</strong>
          </div>
        )}
        {metrics.nonManifoldEdgeCount !== null && metrics.nonManifoldEdgeCount !== undefined && (
          <div className={`${styles.fileRatingItem} ${getTopologyStatusClass(metrics.nonManifoldEdgeCount, true)}`}>
            <MetricLabel
              label="Non-Manifold Edge Count"
              tooltip="Edges shared by more than two faces. These can cause problems for slicing and mesh operations."
              tooltipId="non-manifold-edge-count-tooltip"
            />
            <strong className={styles.fileRatingValue}>{formatCountValue(metrics.nonManifoldEdgeCount)}</strong>
          </div>
        )}
        {metrics.isWindingConsistent !== null && metrics.isWindingConsistent !== undefined && (
          <div className={`${styles.fileRatingItem} ${getTopologyStatusClass(metrics.isWindingConsistent)}`}>
            <MetricLabel
              label="Consistent Winding"
              tooltip="Whether adjacent faces use a consistent orientation. Consistent winding helps define inside and outside surfaces."
              tooltipId="consistent-winding-tooltip"
            />
            <strong className={styles.fileRatingValue}>{formatWatertightValue(metrics.isWindingConsistent)}</strong>
          </div>
        )}
        <div className={styles.fileRatingItem}>
          <MetricLabel
            label="Height"
            tooltip="The model's vertical extent, measured from the lowest to highest vertex in its bounding box."
            tooltipId="height-tooltip"
          />
          <strong className={styles.fileRatingValue}>{formatDimensionValue(metrics.height)}</strong>
        </div>
        <div className={styles.fileRatingItem}>
          <MetricLabel
            label="Width"
            tooltip="The model's horizontal extent, measured between the outermost vertices in its bounding box."
            tooltipId="width-tooltip"
          />
          <strong className={styles.fileRatingValue}>{formatDimensionValue(metrics.width)}</strong>
        </div>
        <div className={styles.fileRatingItem}>
          <MetricLabel
            label="Depth"
            tooltip="The model's front-to-back extent, measured between the outermost vertices in its bounding box."
            tooltipId="depth-tooltip"
          />
          <strong className={styles.fileRatingValue}>{formatDimensionValue(metrics.depth)}</strong>
        </div>
      </div>
    </aside>
  );
}

export default FileRating;
