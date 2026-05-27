import styles from './FileUploadSection.module.css';
import FileUploadCard from './FileUploadCard';

function FileUploadSection({ upload }) {
  return (
    <section className={styles.uploadSection} aria-labelledby="upload-section-title">
      <div className={styles.uploadSectionHeader}>
        <h1 id="upload-section-title" className={styles.uploadSectionTitle}>
          Upload your file
        </h1>
        <p className={styles.uploadSectionSubtitle}>STL, GLB, and OBJ uploads are supported for the first pass.</p>
      </div>
      <FileUploadCard upload={upload} />
    </section>
  );
}

export default FileUploadSection;
