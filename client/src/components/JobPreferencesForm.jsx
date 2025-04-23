import React, { useState, useEffect } from 'react';

const JobPreferencesForm = ({ preferences = {}, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    desiredSalary: '',
    desiredLocation: '',
    jobType: 'Full-time',
    remoteWork: false,
    relocationWilling: false,
    ...preferences
  });

  useEffect(() => {
    if (preferences) {
      setFormData({ ...formData, ...preferences });
    }
  }, [preferences]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure desiredSalary is a number
    const processedData = { ...formData };
    if (processedData.desiredSalary) {
      processedData.desiredSalary = Number(processedData.desiredSalary);
    }
    
    onSave(processedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Desired Salary (Annual)</label>
        <input
          type="number"
          name="desiredSalary"
          value={formData.desiredSalary}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g. 75000"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Desired Location</label>
        <input
          type="text"
          name="desiredLocation"
          value={formData.desiredLocation}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g. New York, Remote"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
          <option value="Internship">Internship</option>
        </select>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          name="remoteWork"
          id="remote-work"
          checked={formData.remoteWork}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="remote-work" className="ml-2 block text-sm text-gray-700">
          I am open to remote work
        </label>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          name="relocationWilling"
          id="relocation"
          checked={formData.relocationWilling}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="relocation" className="ml-2 block text-sm text-gray-700">
          I am willing to relocate
        </label>
      </div>
      
      <div className="flex gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Preferences
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default JobPreferencesForm; 