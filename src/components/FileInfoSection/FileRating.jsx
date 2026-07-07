import styles from './FileRating.module.css';

function formatWatertightValue(value) {
  if (value === null || value === undefined) {
    return '—';
  }

  return value ? '✓' : 'x';
}

function formatDetailRating(value, level) {
  if (value === null || value === undefined) {
    return { descriptor: '—', score: null };
  }

  const score = `(${Math.round(value)} / 200)`;
  return { descriptor: level ?? score, score: level ? score : null };
}

function FileRating({ metrics }) {
  return (
    <aside className={styles.fileRating} aria-label="File rating">
      <div className={styles.fileRatingCard}>
        <h3 className={styles.fileRatingTitle}>File Rating</h3>
        <div className={styles.fileRatingItem}>
          <span className={styles.fileRatingLabel}>Detail Rating</span>
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
        <div className={styles.fileRatingItem}>
          <span className={styles.fileRatingLabel}>Watertight</span>
          <strong className={styles.fileRatingValue}>{formatWatertightValue(metrics.isWatertight)}</strong>
        </div>
      </div>
    </aside>
  );
}

export default FileRating;
