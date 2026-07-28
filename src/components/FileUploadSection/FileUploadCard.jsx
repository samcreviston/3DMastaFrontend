import styles from './FileUploadCard.module.css';

function FileUploadCard({ upload }) {
  const {
    activeType,
    fileTypeOptions,
    getInputProps,
    getRootProps,
    handleGetMetrics,
    handleSelectType,
    isDragActive,
    isFetchingMetrics,
    openFilePicker,
    selectedFile,
    statusMessage,
  } = upload;

  const rootProps = getRootProps({
    className: isDragActive ? `${styles.uploadCardBar} ${styles.uploadCardBarDragActive}` : styles.uploadCardBar,
    'aria-label': 'Drop a 3D model file here',
  });

  return (
    <div className={styles.uploadCard}>
      <div className={styles.uploadCardTypes} role="tablist" aria-label="Accepted file types">
        {fileTypeOptions.map((type) => {
          const isActive = activeType === type;

          return (
            <button
              key={type}
              className={isActive ? `${styles.uploadCardType} ${styles.uploadCardTypeActive}` : styles.uploadCardType}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelectType(type)}
            >
              {type}
            </button>
          );
        })}
      </div>

      <div {...rootProps}>
        <input {...getInputProps()} />
        <div className={styles.uploadCardBarCopy}>
          <span className={styles.uploadCardFileName}>{selectedFile ? selectedFile.name : 'drop a file for upload'}</span>
          <span className={styles.uploadCardStatus}>{isDragActive ? 'Release to upload.' : statusMessage}</span>
        </div>
        <div className={styles.uploadCardActions}>
          <button className={styles.uploadCardActionSecondary} type="button" onClick={openFilePicker} disabled={isFetchingMetrics}>
            choose file
          </button>
          <button
            className={styles.uploadCardAction}
            type="button"
            onClick={handleGetMetrics}
            disabled={!selectedFile || isFetchingMetrics}
          >
            {isFetchingMetrics ? 'working...' : 'get metrics!'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUploadCard;
