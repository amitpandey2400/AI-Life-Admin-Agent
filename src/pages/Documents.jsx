import { useState, useEffect, useRef } from 'react';
import { documentsAPI } from '../services/apiClient';

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await documentsAPI.getAllDocuments();
      setDocuments(response.data || []);
    } catch (err) {
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files) return;

    for (let file of files) {
      try {
        setUploading(true);
        const result = await documentsAPI.uploadFile(file);
        setDocuments(prev => [...prev, result.data]);
      } catch (err) {
        console.error('Error uploading file:', err);
        alert(`Failed to upload ${file.name}`);
      }
    }
    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteDocument = async (docId) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;

    try {
      await documentsAPI.deleteDocument(docId);
      setDocuments(documents.filter(d => d._id !== docId));
    } catch (err) {
      console.error('Error deleting document:', err);
      alert('Failed to delete document');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading documents...</div>;

  return (
    <div className="p-8 lg:p-12 max-w-7xl w-full mx-auto space-y-8 h-full z-10 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-on-surface">Documents</h2>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 primary-gradient text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-sm font-bold disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm">upload</span>
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf,.docx,.xlsx,.txt,.jpg,.jpeg,.png"
        />
      </div>

      {/* Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-primary/20 rounded-3xl p-12 flex flex-col items-center justify-center bg-surface-container-low/50 backdrop-blur-sm cursor-pointer hover:bg-surface-container-low hover:border-primary/40 transition-all group"
      >
        <div className="w-16 h-16 rounded-2xl bg-tertiary-container flex items-center justify-center text-tertiary mb-4 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-3xl">cloud_upload</span>
        </div>
        <h3 className="text-lg font-bold">Drag & drop files to upload</h3>
        <p className="text-sm text-on-surface-variant mt-2">Support for PDF, DOCX, XLSX and Image formats</p>
      </div>

      {documents && documents.length > 0 && (
        <div className="space-y-6 pt-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">folder_open</span>
            Documents ({documents.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div key={doc._id} className="group glass-card rounded-[1.5rem] overflow-hidden border border-white/40 hover:border-outline-variant/30 transition-all hover:shadow-xl cursor-pointer">
                <div className="h-32 bg-surface-container flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-surface-container-high to-surface-container flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <span className="material-symbols-outlined text-4xl text-outline/30">description</span>
                  </div>
                </div>
                <div className="p-5 flex items-start justify-between bg-surface-container-lowest/80 backdrop-blur-md">
                  <div className="flex-1">
                    <p className="text-sm font-bold truncate">{doc.title || doc.filename}</p>
                    <p className="text-[10px] text-on-surface-variant mt-1">
                      Updated {new Date(doc.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteDocument(doc._id)}
                    className="text-on-surface-variant hover:text-error transition-colors"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {documents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-on-surface-variant">No documents yet. Upload one to get started!</p>
        </div>
      )}
    </div>
  );
}
