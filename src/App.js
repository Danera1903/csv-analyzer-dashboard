import React, { useState } from 'react';
import { Upload, FileText, BarChart3 } from 'lucide-react';
import Papa from 'papaparse';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CSVAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const calculateStats = (csvData, columnHeaders) => {
    const statistics = {};
    columnHeaders.forEach(header => {
      const values = csvData.map(row => row[header]).filter(val => val !== null && val !== undefined && val !== '');
      const numericValues = values.filter(val => typeof val === 'number' && !isNaN(val));
      if (numericValues.length > 0) {
        const sorted = [...numericValues].sort((a, b) => a - b);
        const sum = numericValues.reduce((acc, val) => acc + val, 0);
        const mean = sum / numericValues.length;
        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 === 0
          ? (sorted[mid - 1] + sorted[mid]) / 2
          : sorted[mid];
        const variance = numericValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / numericValues.length;
        const stdDev = Math.sqrt(variance);
        statistics[header] = {
          type : 'numeric',
          count: numericValues.length,
          mean: mean.toFixed(2),
          median: median.toFixed(2),
          min: Math.min(...numericValues).toFixed(2),
          max: Math.max(...numericValues).toFixed(2),
          stdDev: stdDev.toFixed(2)
        };
      } else {
        const uniqueValues = [...new Set(values)];
        statistics[header] = {
          type: 'text',
          count: values.length,
          unique: uniqueValues.length,
          values: uniqueValues.slice(0, 5)
        };
      }
    });
    setStats(statistics);
    console.log('Estatisticas calculadas:', statistics);
  };

  const handleClearData = () => {
    setFile(null);
    setData([]);
    setHeaders([]);
    setStats(null);
    setError('');

    const fileInput = document.getElementById('csv-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];

    if (!uploadedFile) return;

    if (!uploadedFile.name.endsWith('.csv')) {
      setError('Please upload a valid CSV file');
      return;
    }

    if (uploadedFile.size > 10 * 1024 * 1024) {
      setError('File is too large. Maximun size is 10MB');
      return;
    }

    setFile(uploadedFile);
    setError('');

    Papa.parse(uploadedFile, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data.length === 0) {
          setError('CSV file is empty');
          return;
        }

        console.log('Dados processados:', results.data);
        console.log('Headers:', results.meta.fields);

        setData(results.data);
        setHeaders(results.meta.fields);
        calculateStats(results.data, results.meta.fields);

        event.target.value = '';
      },
      error: (err) => {
        console.error('Erro ao processar CSV:', err);
        setError(`Error processing CSV: ${err.message}`);
      }
    });
  };
  return (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">CSV Analyzer Dashboard</h1>
        <p className="text-gray-600">Upload and analyze your CSV data</p>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Upload className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-800">Upload CSV File</h2>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                {file ? file.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-sm text-gray-400">CSV files only</p>
            </label>

            {file && (
              <button
                onClick={handleClearData}
                className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Clear Data
                </button>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
        </div>
      </div>

      {/* Statistics Section */}
      {stats && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">Statistical Analysis</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(stats).map((column) => (
                <div key={column} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-3 border-b pb-2">
                    {column}
                  </h3>

                  {stats[column].type === 'numeric' ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Count:</span>
                        <span className="font-medium">{stats[column].count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mean:</span>
                        <span className="font-medium">{stats[column].mean}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Median:</span>
                        <span className="font-medium">{stats[column].median}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min:</span>
                        <span className="font-medium">{stats[column].min}</span>
                      </div>
                       <div className="flex justify-between">
                        <span className="text-gray-600">Max:</span>
                        <span className="font-medium">{stats[column].max}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Std Dev:</span>
                        <span className="font-medium">{stats[column].stdDev}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Count:</span>
                        <span className="font-medium">{stats[column].count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Unique:</span>
                        <span className="font-medium">{stats[column].unique}</span>
                      </div>
                      <div className="mt-3">
                        <span className="text-gray-600 text-xs">Sample values:</span>
                        <div className="mt-1 space-y-1">
                          {stats[column].values.map((val, idx) => (
                            <div key={idx} className="text-xs bg-gray-50 px-2 py-1 rounded">
                              {val}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
      )}

      {/* Data Table */}
      {data.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Data Preview</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  {headers.map((header) => (
                    <th key={header} className="px-4 py-3 text-left font-semibold text-gray-700">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 10).map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                    {headers.map((header) => (
                      <td key={header} className="px-4 py-3 text-gray-600">
                        {row[header] !== null && row[header] !== undefined ? row[header] : '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.length > 10 && (
            <p className="text-sm text-gray-500 mt-4 text-center">
              Showing first 10 of {data.length} rows
            </p>
          )}
        </div>
      )}

      {/* Charts Section */}
      {data.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Bar Chart - Primeira coluna numérica */}
          {Object.keys(stats).filter(col => stats[col].type === 'numeric').length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Numeric Data Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3,3" />
                  <XAxis dataKey={headers[0]} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {Object.keys(stats)
                  .filter(col => stats[col].type === 'numeric')
                  .slice(0, 1)
                  .map((col, idx) => (
                    <Bar key={col} dataKey={col} fill="#8884d8" />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Pie Chart - Primeira coluna de texto */}
            {Object.keys(stats).filter(col => stats[col].type === 'text').length > 0 && (() => {
              const textColumn = Object.keys(stats).find(col => stats[col].type === 'text');
              const categoryData = data.reduce((acc, row) => {
                const value = row[textColumn];
                if (value) {
                  acc[value] = (acc[value] || 0) + 1;
                }
                return acc;
              }, {});

              const chartData = Object.keys(categoryData).map(key => ({
                name: key,
                value: categoryData[key]
              }));

              const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

              return (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    {textColumn} Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                     <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              );
            })()}

          </div>
        )}

      </div>
    </div>
  );
};

export default CSVAnalyzer;