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
    primaryActionLabel,
    selectedFile,
    statusMessage,
  } = upload;

  const handlePrimaryAction = () => {
    if (selectedFile) {
      handleGetMetrics();
      return;
    }

    openFilePicker();
  };

  const rootProps = getRootProps({
    className: styles.uploadCardBar,
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
          <span className={styles.uploadCardFileName}>{selectedFile ? selectedFile.name : 'drop a file for upload or click to browse'}</span>
          <span className={styles.uploadCardStatus}>{isDragActive ? 'Release to upload.' : statusMessage}</span>
        </div>
        <button className={styles.uploadCardAction} type="button" onClick={handlePrimaryAction} disabled={isFetchingMetrics}>
          {primaryActionLabel}
        </button>
      </div>
    </div>
  );
}

export default FileUploadCard;
