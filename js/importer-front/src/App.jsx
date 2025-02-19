import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3000');

export default function App() {
  const [filialId, setFilialId] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState([]);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    socket.on('import-status', (data) => {
      setStatus(data.status);
      setErrors(data.errors);
      setIsImporting(false);
    });

    return () => {
      socket.off('import-status');
    };
  }, []);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (isImporting) {
      alert('A importação já está em andamento.');
      return;
    }

    setIsImporting(true);
    setStatus('');
    setErrors([]);

    const formData = new FormData();
    formData.append('filialId', filialId);
    if (csvFile) {
      formData.append('csvFile', csvFile);
    }

    try {
      await axios.post('http://localhost:3000/start-import', {
        filialId,
        csvFile: csvFile ? csvFile.name : null
      }, {
        headers: {
          'x-socket-id': socket.id,
        },
      });

      setStatus('Importação iniciada.');
    } catch (error) {
      console.error('Erro ao iniciar importação:', error);
      setStatus(error.response.data.error || 'Erro ao iniciar importação.');
      setIsImporting(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Importar Dados</h1>
      <div className="mb-4">
        <label htmlFor="filialId" className="block text-sm font-medium mb-1">Filial ID:</label>
        <input
          type="text"
          id="filialId"
          value={filialId}
          onChange={(e) => setFilialId(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="csvFile" className="block text-sm font-medium mb-1">Arquivo CSV (opcional):</label>
        <input
          type="file"
          id="csvFile"
          accept=".csv"
          onChange={handleFileChange}
          className="w-full border rounded p-2"
        />
      </div>
      <button
        onClick={handleImport}
        disabled={isImporting}
        className={`w-full bg-blue-500 text-white py-2 rounded ${isImporting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isImporting ? 'Importando...' : 'Iniciar Importação'}
      </button>

      {status && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <p className="text-sm font-medium">Status: {status}</p>
          {errors.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-red-500 font-medium">Erros:</p>
              <ul className="list-disc pl-4">
                {errors.map((err, idx) => (
                  <li key={idx} className="text-sm text-red-500">{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}