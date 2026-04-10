export default function Documents() {
  return (
    <div className="p-8 lg:p-12 max-w-7xl w-full mx-auto space-y-8 h-full z-10 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-on-surface">Documents</h2>
        <button className="flex items-center gap-2 primary-gradient text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-sm font-bold">
          <span className="material-symbols-outlined text-sm">upload</span>
          Upload File
        </button>
      </div>

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-primary/20 rounded-3xl p-12 flex flex-col items-center justify-center bg-surface-container-low/50 backdrop-blur-sm cursor-pointer hover:bg-surface-container-low hover:border-primary/40 transition-all group">
        <div className="w-16 h-16 rounded-2xl bg-tertiary-container flex items-center justify-center text-tertiary mb-4 group-hover:scale-110 transition-transform">
           <span className="material-symbols-outlined text-3xl">cloud_upload</span>
        </div>
        <h3 className="text-lg font-bold">Drag & drop files to upload</h3>
        <p className="text-sm text-on-surface-variant mt-2">Support for PDF, DOCX, XLSX and Image formats</p>
      </div>

      <div className="space-y-6 pt-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">folder_open</span>
          Pinned Documents
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Brand Guidelines 2024", updated: "2 days ago" },
            { title: "Product Strategy", updated: "4 hours ago" },
            { title: "User Research Notes", updated: "yesterday" }
          ].map((doc, i) => (
            <div key={i} className="group glass-card rounded-[1.5rem] overflow-hidden border border-white/40 hover:border-outline-variant/30 transition-all hover:shadow-xl cursor-pointer">
              <div className="h-32 bg-surface-container flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-surface-container-high to-surface-container flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <span className="material-symbols-outlined text-4xl text-outline/30">description</span>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between bg-surface-container-lowest/80 backdrop-blur-md">
                <div>
                  <p className="text-sm font-bold">{doc.title}</p>
                  <p className="text-[10px] text-on-surface-variant mt-1">Updated {doc.updated}</p>
                </div>
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
