import React, { useState, useEffect } from "react";
import { FaFilePdf, FaDownload } from "react-icons/fa";
import {axiosInstance} from "../util/axios";

const DocumentLibrary = () => {

  // useEffect(() => {
  //   first
  
  // }, [])

  const getDocumnents = async () => {

    try {
      const resp = await axiosInstance.get('/doc/all-documents')
      console.log(resp.data)
    } catch (error) {
      console.error("Error al recuperar los documentos:", error);
      
    }
  
  }
  


  const [documents] = useState([
    {
      id: 1,
      name: "Technical Manual",
      description: "Comprehensive guide for system configuration and setup",
      downloadUrl: "#",
      size: "2.5 MB"
    },
    {
      id: 2,
      name: "User Guide",
      description: "Step-by-step instructions for end users",
      downloadUrl: "#",
      size: "1.8 MB"
    },
    {
      id: 3,
      name: "API Reference",
      description: "Complete API documentation with examples",
      downloadUrl: "#",
      size: "3.2 MB"
    },
    {
      id: 4,
      name: "Installation Instructions",
      description: "Detailed installation and deployment guide",
      downloadUrl: "#",
      size: "1.5 MB"
    },
    {
      id: 5,
      name: "Troubleshooting Document",
      description: "Common issues and their solutions",
      downloadUrl: "#",
      size: "2.1 MB"
    }
  ]);

  const handleDownload = (documentId) => {
    try {
      console.log(`Downloading document ${documentId}`);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Documentation Library</h1>
          <p className="text-lg text-gray-600">Access all your important documents in one place</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <FaFilePdf className="text-red-500 text-2xl" aria-label="PDF document" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => handleDownload(doc.id)} className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline">
                        {doc.name}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => handleDownload(doc.id)} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" aria-label={`Download ${doc.name}`}>
                        <FaDownload className="mr-2" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile view start */}      
          <div className="md:hidden">
            <div className="divide-y divide-gray-200">
              {documents.map((doc) => (
                <div key={doc.id} className="p-4 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <FaFilePdf className="text-red-500 text-2xl" aria-label="PDF document" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <button onClick={() => handleDownload(doc.id)} className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline block">
                      {doc.name}
                    </button>
                    <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <button onClick={() => handleDownload(doc.id)} className="text-blue-600 hover:text-blue-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <FaDownload className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Mobile view ends*/}      
        </div>
      </div>
    </div>
  );
};

export default DocumentLibrary;