import { Upload, FileText, FileImage, FileSpreadsheet, Download, Trash2 } from "lucide-react";

const typeIcon = {
  PDF: FileText,
  Image: FileImage,
  Spreadsheet: FileSpreadsheet,
};

const documents = [
  { id: 1, name: "Passport Scan.pdf", type: "PDF", size: "1.2 MB", uploaded: "2026-07-20" },
  { id: 2, name: "Insurance Policy.pdf", type: "PDF", size: "884 KB", uploaded: "2026-07-15" },
  { id: 3, name: "Home Deed.jpg", type: "Image", size: "2.4 MB", uploaded: "2026-06-30" },
  { id: 4, name: "Tax Records 2025.xlsx", type: "Spreadsheet", size: "412 KB", uploaded: "2026-06-10" },
  { id: 5, name: "Vehicle Title.pdf", type: "PDF", size: "1.0 MB", uploaded: "2026-05-22" },
];

const Documents = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Documents</h1>
          <p className="mt-1 text-sm text-[#94A3B8]">
            {documents.length} files stored securely
          </p>
        </div>
        <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_24px_-8px_rgba(59,130,246,0.7)] transition-colors hover:bg-[#60A5FA]">
          <Upload className="h-4 w-4" />
          Upload Document
        </button>
      </div>

      {/* Drop zone */}
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.15] bg-white/[0.02] px-6 py-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3B82F6]/15 text-[#60A5FA]">
          <Upload className="h-5 w-5" />
        </span>
        <p className="mt-4 text-sm font-medium text-white">
          Drag and drop files here, or click Upload Document
        </p>
        <p className="mt-1 text-xs text-[#94A3B8]">PDF, images, and spreadsheets up to 25 MB</p>
      </div>

      {/* File list */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wide text-[#94A3B8]">
                <th className="px-4 py-3 font-medium">File</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium">Date Uploaded</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => {
                const Icon = typeIcon[doc.type] ?? FileText;
                return (
                  <tr key={doc.id} className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03]">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#60A5FA]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="font-medium text-white">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[#94A3B8]">{doc.type}</td>
                    <td className="px-4 py-3.5 text-[#94A3B8]">{doc.size}</td>
                    <td className="px-4 py-3.5 text-[#94A3B8]">{doc.uploaded}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button className="rounded-lg p-2 text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white" aria-label="Download">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="rounded-lg p-2 text-[#94A3B8] transition-colors hover:bg-[#EF4444]/10 hover:text-[#EF4444]" aria-label="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Documents;
