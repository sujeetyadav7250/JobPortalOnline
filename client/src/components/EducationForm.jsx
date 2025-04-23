import React, { useState, useEffect } from 'react';

const EducationForm = ({ education = {}, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    ...education
  });

  // Format dates for input fields if they exist
  useEffect(() => {
    if (education) {
      const formatted = { ...education };
      if (formatted.startDate) {
        formatted.startDate = new Date(formatted.startDate).toISOString().split('T')[0];
      }
      if (formatted.endDate) {
        formatted.endDate = new Date(formatted.endDate).toISOString().split('T')[0];
      }
      setFormData({ ...formData, ...formatted });
    }
  }, [education]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
        <input
          type="text"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
        <input
          type="text"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
        <input
          type="text"
          name="fieldOfStudy"
          value={formData.fieldOfStudy}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            disabled={formData.current}
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          name="current"
          id="current"
          checked={formData.current}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="current" className="ml-2 block text-sm text-gray-700">
          I currently study here
        </label>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
      
      <div className="flex gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save
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

export default EducationForm; 