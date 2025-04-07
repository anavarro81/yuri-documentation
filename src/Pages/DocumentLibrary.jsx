import React, { useState, useEffect } from "react";
import { FaFilePdf, FaDownload } from "react-icons/fa";
import {axiosInstance} from "../util/axios";

const DocumentLibrary = () => {

  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsloading] = useState(true)

  const getDocumnents = async () => {
    try {
      setIsloading(true)
      const {data} = await axiosInstance.get('/doc/all-documents')
      console.log(data.documents)
      setDocuments(data.documents);
    } catch (error) {
      console.error("Error al recuperar los documentos:", error);      
    }  finally {
      setIsloading(false) 
    }
  }

  useEffect(() => {
    getDocumnents()
  }, [])


  // Si no ha terminado de cargar, se muestra el spinner.
  if (isLoading){
    return (    
      <div className="flex items-center justify-center min-h-screen bg-white"> 
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-500"></div>
      </div>    
  )}

  
  //Si falla el back y no se cargan los documentos se muestra una pantalla para avisar al usuario.
  if (documents.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No se ha podido cargar los documentos</h1>
          <p className="text-lg text-gray-600">Por favor, inténtalo mas tarde </p>
          <button  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >
            <a href='\' target="_blank" rel="noopener noreferrer"> Volver </a>                        
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Documentación Yuiri II</h1>
          <p className="text-lg text-gray-600">Descarga la documentación referente al servicio que quieras contratar</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamaño</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descargar</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <FaFilePdf className="text-red-500 text-2xl" aria-label="PDF document" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button  className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium focus:outline-none focus:underline">                        
                        <a href={`${import.meta.env.VITE_API_BASE_URL}${doc.downloadLink}`} target="_blank" rel="noopener noreferrer"> {doc.name} </a>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" aria-label={`Download ${doc.name}`}>
                        <FaDownload className="mr-2" />
                        <a href={`${import.meta.env.VITE_API_BASE_URL}${doc.downloadLink}`} target="_blank" rel="noopener noreferrer"> Descargar </a>                        
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
                <div key={doc._id} className="p-4 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <FaFilePdf className="text-red-500 text-2xl" aria-label="PDF document" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <button  className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline block">
                      <a href={`${import.meta.env.VITE_API_BASE_URL}${doc.downloadLink}`} target="_blank" rel="noopener noreferrer"> {doc.name} </a>                      
                    </button>
                    <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <button  className="text-blue-600 hover:text-blue-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <a href={`${import.meta.env.VITE_API_BASE_URL}${doc.downloadLink}` } target="_blank" rel="noopener noreferrer"> 
                        <FaDownload className="text-xl" />
                      </a>                    
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