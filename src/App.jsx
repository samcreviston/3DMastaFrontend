import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FileUploadSection from './components/FileUploadSection/FileUploadSection';
import FileInfoSection from './components/FileInfoSection/FileInfoSection';
import { useFileUpload } from './hooks/useFileUpload';

function App() {
  const upload = useFileUpload();

  return (
    <div className="appShell">
      <Header />
      <main className="appMain">
        <FileUploadSection upload={upload} />
        <FileInfoSection metrics={upload.metrics} statusMessage={upload.statusMessage} selectedFile={upload.selectedFile} metricsReady={upload.metricsReady} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
