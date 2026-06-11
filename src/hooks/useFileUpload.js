import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { fetchFileMetrics } from '../services/api';

const FILE_TYPE_OPTIONS = ['STL', 'GLB', 'GLTF', 'OBJ', '3MF'];

const emptyMetrics = {
  triangleCount: null,
  vertexCount: null,
  surfaceArea: null,
  volume: null,
  isWatertight: null,
};

export function getFileTypeFromName(fileName) {
  const extension = fileName.split('.').pop()?.toLowerCase();

  if (extension === 'stl') {
    return 'STL';
  }

  if (extension === 'glb') {
    return 'GLB';
  }

  if (extension === 'gltf') {
    return 'GLTF';
  }

  if (extension === 'obj') {
    return 'OBJ';
  }

  if (extension === '3mf') {
    return '3MF';
  }

  return null;
}

export function useFileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [metrics, setMetrics] = useState(emptyMetrics);
  const [isFetchingMetrics, setIsFetchingMetrics] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);
    setSelectedType(getFileTypeFromName(file.name));
    setMetrics(emptyMetrics);
    setErrorMessage('');
  }, []);

  const dropzone = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
    noKeyboard: true,
    accept: {
      'model/stl': ['.stl'],
      'model/gltf-binary': ['.glb'],
      'model/gltf+json': ['.gltf'],
      'model/obj': ['.obj'],
      'model/3mf': ['.3mf'],
    },
  });

  const activeType = selectedFile ? getFileTypeFromName(selectedFile.name) : selectedType;

  const handleSelectType = useCallback((type) => {
    setSelectedType(type);
  }, []);

  const handleGetMetrics = useCallback(async () => {
    if (!selectedFile || isFetchingMetrics) {
      return;
    }

    setIsFetchingMetrics(true);
    setErrorMessage('');

    try {
      const nextMetrics = await fetchFileMetrics(selectedFile);
      setMetrics(nextMetrics);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to fetch metrics.');
    } finally {
      setIsFetchingMetrics(false);
    }
  }, [isFetchingMetrics, selectedFile]);

  const statusMessage = useMemo(() => {
    if (errorMessage) {
      return errorMessage;
    }

    if (selectedFile) {
      return `${selectedFile.name} is ready for metric extraction.`;
    }

    return 'Drop a file or choose file to upload a supported 3D model.';
  }, [errorMessage, selectedFile]);

  return {
    activeType,
    errorMessage,
    fileTypeOptions: FILE_TYPE_OPTIONS,
    getInputProps: dropzone.getInputProps,
    getRootProps: dropzone.getRootProps,
    handleGetMetrics,
    handleSelectType,
    isDragActive: dropzone.isDragActive,
    isFetchingMetrics,
    metrics,
    openFilePicker: dropzone.open,
    selectedFile,
    statusMessage,
  };
}
