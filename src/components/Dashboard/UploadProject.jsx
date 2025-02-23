import { useState } from 'react';
import { FaGithub, FaFileUpload, FaFilePdf, FaFileCsv } from 'react-icons/fa';

export default function UploadProject() {
  const [githubUrl, setGithubUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadType, setUploadType] = useState('github'); // github, csv, pdf

  const handleGithubSubmit = (e) => {
    e.preventDefault();
    console.log('GitHub URL:', githubUrl);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log('File selected:', file);
  };

  return (
    <div className="p-6 text-white bg-gray-900"> {/* Ensuring dark mode bg is dark */}
      <h2 className="text-2xl font-bold mb-6">Upload Project</h2>

      <div className="space-y-6">
        {/* GitHub URL Upload */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaGithub /> GitHub Repository
          </h3>
          <form onSubmit={handleGithubSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter GitHub Repository URL"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-white"
            >
              Import from GitHub
            </button>
          </form>
        </div>

        {/* File Upload Section */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">File Upload</h3>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <button
                onClick={() => setUploadType('csv')}
                className={`flex-1 p-4 rounded-lg border-2 ${
                  uploadType === 'csv' ? 'border-purple-500' : 'border-gray-700'
                } hover:border-purple-500 transition-colors bg-gray-900 text-white`}
              >
                <FaFileCsv className="text-3xl mx-auto mb-2" />
                <p>CSV File</p>
              </button>
              
              <button
                onClick={() => setUploadType('pdf')}
                className={`flex-1 p-4 rounded-lg border-2 ${
                  uploadType === 'pdf' ? 'border-purple-500' : 'border-gray-700'
                } hover:border-purple-500 transition-colors bg-gray-900 text-white`}
              >
                <FaFilePdf className="text-3xl mx-auto mb-2" />
                <p>PDF Report</p>
              </button>
            </div>

            <div className="relative">
              <input
                type="file"
                accept={uploadType === 'csv' ? '.csv' : '.pdf'}
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-600 rounded-lg hover:border-purple-500 transition-colors bg-gray-900 text-white"
              >
                <FaFileUpload className="text-xl" />
                {selectedFile ? selectedFile.name : 'Choose a file'}
              </label>
            </div>

            {selectedFile && (
              <button
                className="w-full bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-white"
                onClick={() => {
                  console.log('Uploading file:', selectedFile);
                }}
              >
                Upload File
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
