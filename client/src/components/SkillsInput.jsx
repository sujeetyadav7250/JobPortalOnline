import React, { useState, useEffect } from 'react';

const SkillsInput = ({ initialSkills = [], onChange, label = "Skills" }) => {
  const [skills, setSkills] = useState(initialSkills);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (initialSkills !== skills) {
      setSkills(initialSkills);
    }
  }, [initialSkills]);

  useEffect(() => {
    onChange(skills);
  }, [skills, onChange]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      if (!skills.includes(inputValue.trim())) {
        const newSkills = [...skills, inputValue.trim()];
        setSkills(newSkills);
        setInputValue('');
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const newSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(newSkills);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
          >
            <span>{skill}</span>
            <button 
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="ml-2 text-blue-700 hover:text-blue-900 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="flex-grow px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder={`Add ${label.toLowerCase()} (press Enter)`}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">Press Enter after each entry</p>
    </div>
  );
};

export default SkillsInput; 