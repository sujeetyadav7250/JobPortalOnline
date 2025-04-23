import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import Footer from '../components/Footer';
import { assets } from '../assets/assets';
import SkillsInput from '../components/SkillsInput';
import EducationForm from '../components/EducationForm';
import ExperienceForm from '../components/ExperienceForm';
import JobPreferencesForm from '../components/JobPreferencesForm';
 
const UserProfile = () => {
  const { userData, userToken, backendUrl, fetchUserData } = useContext(AppContext);
  const [resume, setResume] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSectionTab, setActiveSectionTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    bio: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    twitter: ''
  });
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isEditingProfessional, setIsEditingProfessional] = useState(false);
  const [loading, setLoading] = useState(false);
  const [educations, setEducations] = useState([]);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [currentEducation, setCurrentEducation] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [jobPreferences, setJobPreferences] = useState({});
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        title: userData.title || '',
        bio: userData.bio || '',
        phone: userData.phone || '',
        location: userData.location || '',
        website: userData.website || '',
        linkedin: userData.linkedin || '',
        github: userData.github || '',
        twitter: userData.twitter || ''
      });
      setSkills(userData.skills || []);
      setLanguages(userData.languages || []);
      setEducations(userData.education || []);
      setExperiences(userData.experience || []);
      setJobPreferences(userData.jobPreferences || {});
    }
  }, [userData]);

  if (!userData || !userToken) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Please log in to view your profile</h2>
      </div>
    );
  }

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    
    if (!resume) {
      return toast.error('Please select a resume file');
    }

    // Check file size
    if (resume.size > 5 * 1024 * 1024) {
      return toast.error('File size exceeds 5MB limit. Please choose a smaller file.');
    }

    // Check file extension
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileExtension = resume.name.substring(resume.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return toast.error('Invalid file format. Please upload a PDF or DOC/DOCX file.');
    }

    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('resume', resume);
      
      const { data } = await axios.post(
        `${backendUrl}/api/users/update-resume`,
        formData,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      
      if (data.success) {
        toast.success('Resume uploaded successfully');
        fetchUserData();
      } else {
        toast.error(data.message || 'Failed to upload resume');
      }
    } catch (error) {
      console.error('Resume upload error:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to upload resume');
    } finally {
      setLoading(false);
      setResume(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/update-profile`,
        {
          name: formData.name,
          email: formData.email
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      
      if (data.success) {
        toast.success('Profile updated successfully');
        fetchUserData();
        setIsEditing(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleProfessionalProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const profileData = {
        title: formData.title,
        bio: formData.bio,
        skills,
        languages,
        phone: formData.phone,
        location: formData.location,
        website: formData.website,
        linkedin: formData.linkedin,
        github: formData.github,
        twitter: formData.twitter
      };
      
      const { data } = await axios.post(
        `${backendUrl}/api/users/profile`,
        profileData,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      
      if (data.success) {
        toast.success('Professional profile updated successfully');
        fetchUserData();
        setIsEditingProfessional(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update professional profile');
    } finally {
      setLoading(false);
    }
  };

  // Education handlers
  const handleAddEducation = async (educationData) => {
    setLoading(true);
    
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/users/education`,
        educationData,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      
      if (data.success) {
        toast.success('Education added successfully');
        fetchUserData();
        setIsAddingEducation(false);
        setCurrentEducation(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to add education');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateEducation = async (educationData) => {
    setLoading(true);
    
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/users/education/${currentEducation._id}`,
        educationData,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      
      if (data.success) {
        toast.success('Education updated successfully');
        fetchUserData();
        setIsAddingEducation(false);
        setCurrentEducation(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update education');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteEducation = async (educationId) => {
    if (!confirm('Are you sure you want to delete this education entry?')) {
      return;
    }
    
    setLoading(true);
    
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/users/education/${educationId}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      
      if (data.success) {
        toast.success('Education deleted successfully');
        fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete education');
    } finally {
      setLoading(false);
    }
  };

  // Experience handlers
  const handleAddExperience = async (experienceData) => {
    setLoading(true);
    
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/users/experience`,
        experienceData,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      
      if (data.success) {
        toast.success('Experience added successfully');
        fetchUserData();
        setIsAddingExperience(false);
        setCurrentExperience(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to add experience');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateExperience = async (experienceData) => {
    setLoading(true);
    
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/users/experience/${currentExperience._id}`,
        experienceData,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      
      if (data.success) {
        toast.success('Experience updated successfully');
        fetchUserData();
        setIsAddingExperience(false);
        setCurrentExperience(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update experience');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteExperience = async (experienceId) => {
    if (!confirm('Are you sure you want to delete this experience entry?')) {
      return;
    }
    
    setLoading(true);
    
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/users/experience/${experienceId}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      
      if (data.success) {
        toast.success('Experience deleted successfully');
        fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete experience');
    } finally {
      setLoading(false);
    }
  };

  // Job preferences handler
  const handleUpdateJobPreferences = async (preferencesData) => {
    setLoading(true);
    
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/users/profile`,
        { jobPreferences: preferencesData },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      
      if (data.success) {
        toast.success('Job preferences updated successfully');
        fetchUserData();
        setIsEditingPreferences(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update job preferences');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <img 
                  src={userData.image || assets.upload_area} 
                  alt={userData.name} 
                  className="w-40 h-40 rounded-full object-cover border-4 border-blue-100"
                />
              </div>
              
              {/* Profile Details */}
              <div className="flex-1">
                {isEditing ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-semibold">{userData.name}</h2>
                      <p className="text-gray-600">{userData.email}</p>
                      {userData.title && <p className="text-gray-700 font-medium mt-1">{userData.title}</p>}
                      {userData.location && <p className="text-gray-600 text-sm">{userData.location}</p>}
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Edit Basic Info
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Tabs Navigation */}
            <div className="mt-10 border-b">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveSectionTab('profile')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSectionTab === 'profile'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Professional Profile
                </button>
                <button
                  onClick={() => setActiveSectionTab('resume')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSectionTab === 'resume'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Resume
                </button>
                <button
                  onClick={() => setActiveSectionTab('education')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSectionTab === 'education'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Education
                </button>
                <button
                  onClick={() => setActiveSectionTab('experience')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSectionTab === 'experience'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Experience
                </button>
                <button
                  onClick={() => setActiveSectionTab('preferences')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSectionTab === 'preferences'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Job Preferences
                </button>
              </nav>
            </div>
            
            {/* Professional Profile Section */}
            {activeSectionTab === 'profile' && (
              <div className="py-6">
                <h3 className="text-xl font-semibold mb-4">Professional Profile</h3>
                
                {isEditingProfessional ? (
                  <form onSubmit={handleProfessionalProfileUpdate} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. Senior Web Developer"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write a short bio about yourself"
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SkillsInput 
                        initialSkills={skills} 
                        onChange={setSkills} 
                        label="Skills" 
                      />
                      
                      <SkillsInput 
                        initialSkills={languages} 
                        onChange={setLanguages} 
                        label="Languages" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                        <input
                          type="url"
                          name="github"
                          value={formData.github}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://github.com/username"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                        <input
                          type="url"
                          name="twitter"
                          value={formData.twitter}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://twitter.com/username"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        {loading ? 'Saving...' : 'Save Profile'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfessional(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    {(userData.title || userData.bio || (userData.skills && userData.skills.length > 0)) ? (
                      <>
                        {userData.title && (
                          <div>
                            <h4 className="text-lg font-medium">Title</h4>
                            <p>{userData.title}</p>
                          </div>
                        )}
                        
                        {userData.bio && (
                          <div>
                            <h4 className="text-lg font-medium">Bio</h4>
                            <p className="text-gray-700">{userData.bio}</p>
                          </div>
                        )}
                        
                        {userData.skills && userData.skills.length > 0 && (
                          <div>
                            <h4 className="text-lg font-medium">Skills</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {userData.skills.map((skill, index) => (
                                <span 
                                  key={index} 
                                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {userData.languages && userData.languages.length > 0 && (
                          <div>
                            <h4 className="text-lg font-medium">Languages</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {userData.languages.map((language, index) => (
                                <span 
                                  key={index} 
                                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                                >
                                  {language}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {userData.phone && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                              <p>{userData.phone}</p>
                            </div>
                          )}
                          
                          {userData.location && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Location</h4>
                              <p>{userData.location}</p>
                            </div>
                          )}
                        </div>
                        
                        {(userData.linkedin || userData.github || userData.twitter) && (
                          <div>
                            <h4 className="text-lg font-medium">Social Profiles</h4>
                            <div className="flex gap-4 mt-2">
                              {userData.linkedin && (
                                <a 
                                  href={userData.linkedin} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  LinkedIn
                                </a>
                              )}
                              
                              {userData.github && (
                                <a 
                                  href={userData.github} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-gray-700 hover:text-black"
                                >
                                  GitHub
                                </a>
                              )}
                              
                              {userData.twitter && (
                                <a 
                                  href={userData.twitter} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-600"
                                >
                                  Twitter
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>Your professional profile is empty. Add details to make your profile stand out to employers.</p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => setIsEditingProfessional(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {userData.title || userData.bio ? 'Edit Profile' : 'Add Professional Details'}
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Resume Section */}
            {activeSectionTab === 'resume' && (
              <div className="mt-6 pt-6">
                <h3 className="text-xl font-semibold mb-4">Resume</h3>
                
                {userData.resume ? (
                  <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center mb-4 md:mb-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Your resume is uploaded</span>
                    </div>
                    <div className="flex gap-2">
                      <a 
                        href={userData.resume} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                      >
                        View Resume
                      </a>
                      <button
                        onClick={() => setResume(null)}
                        className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 focus:outline-none"
                      >
                        Update Resume
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleResumeUpload} className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-10 h-10 mb-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                          </svg>
                          <p className="mb-2 text-sm text-blue-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-blue-500">PDF or DOCX (MAX. 5MB)</p>
                        </div>
                        <input 
                          id="resume" 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx" 
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              // Check file size on selection
                              if (file.size > 5 * 1024 * 1024) {
                                toast.error('File size exceeds 5MB limit');
                                e.target.value = null;
                                return;
                              }
                              setResume(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                    {resume && (
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                        <span>{resume.name}</span>
                        <button
                          type="button"
                          onClick={() => setResume(null)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={!resume || loading}
                      className={`px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none ${!resume || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                      {loading ? 'Uploading...' : 'Upload Resume'}
                    </button>
                  </form>
                )}
              </div>
            )}
            
            {/* Education Section */}
            {activeSectionTab === 'education' && (
              <div className="py-6">
                <h3 className="text-xl font-semibold mb-4">Education</h3>
                
                {isAddingEducation ? (
                  <EducationForm 
                    education={currentEducation}
                    onSave={currentEducation ? handleUpdateEducation : handleAddEducation}
                    onCancel={() => {
                      setIsAddingEducation(false);
                      setCurrentEducation(null);
                    }}
                  />
                ) : (
                  <div className="space-y-6">
                    {educations && educations.length > 0 ? (
                      <div className="space-y-4">
                        {educations.map((education) => (
                          <div key={education._id} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-medium text-lg">{education.institution}</h4>
                                <p className="text-gray-700">{education.degree}, {education.fieldOfStudy}</p>
                                <p className="text-gray-600 text-sm">
                                  {new Date(education.startDate).toLocaleDateString()} - 
                                  {education.current ? ' Present' : ` ${new Date(education.endDate).toLocaleDateString()}`}
                                </p>
                                {education.description && (
                                  <p className="text-gray-700 mt-2">{education.description}</p>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    setCurrentEducation(education);
                                    setIsAddingEducation(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteEducation(education._id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No education entries yet. Add your educational background.</p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => {
                        setCurrentEducation(null);
                        setIsAddingEducation(true);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {educations && educations.length > 0 ? 'Add Another Education' : 'Add Education'}
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Experience Section */}
            {activeSectionTab === 'experience' && (
              <div className="py-6">
                <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
                
                {isAddingExperience ? (
                  <ExperienceForm 
                    experience={currentExperience}
                    onSave={currentExperience ? handleUpdateExperience : handleAddExperience}
                    onCancel={() => {
                      setIsAddingExperience(false);
                      setCurrentExperience(null);
                    }}
                  />
                ) : (
                  <div className="space-y-6">
                    {experiences && experiences.length > 0 ? (
                      <div className="space-y-4">
                        {experiences.map((experience) => (
                          <div key={experience._id} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-medium text-lg">{experience.position}</h4>
                                <p className="text-gray-700">{experience.company}</p>
                                {experience.location && (
                                  <p className="text-gray-600">{experience.location}</p>
                                )}
                                <p className="text-gray-600 text-sm">
                                  {new Date(experience.startDate).toLocaleDateString()} - 
                                  {experience.current ? ' Present' : ` ${new Date(experience.endDate).toLocaleDateString()}`}
                                </p>
                                {experience.description && (
                                  <p className="text-gray-700 mt-2">{experience.description}</p>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    setCurrentExperience(experience);
                                    setIsAddingExperience(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteExperience(experience._id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No work experience entries yet. Add your professional experience.</p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => {
                        setCurrentExperience(null);
                        setIsAddingExperience(true);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {experiences && experiences.length > 0 ? 'Add Another Experience' : 'Add Experience'}
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Job Preferences Section */}
            {activeSectionTab === 'preferences' && (
              <div className="py-6">
                <h3 className="text-xl font-semibold mb-4">Job Preferences</h3>
                
                {isEditingPreferences ? (
                  <JobPreferencesForm 
                    preferences={jobPreferences}
                    onSave={handleUpdateJobPreferences}
                    onCancel={() => setIsEditingPreferences(false)}
                  />
                ) : (
                  <div className="space-y-6">
                    {jobPreferences && Object.keys(jobPreferences).length > 0 ? (
                      <div className="border rounded-lg p-6 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {jobPreferences.desiredSalary && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Desired Annual Salary</h4>
                              <p className="text-gray-900">${jobPreferences.desiredSalary.toLocaleString()}</p>
                            </div>
                          )}
                          
                          {jobPreferences.desiredLocation && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Desired Location</h4>
                              <p className="text-gray-900">{jobPreferences.desiredLocation}</p>
                            </div>
                          )}
                          
                          {jobPreferences.jobType && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Job Type</h4>
                              <p className="text-gray-900">{jobPreferences.jobType}</p>
                            </div>
                          )}
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Options</h4>
                            <div className="flex flex-col mt-1 text-gray-900">
                              <span>{jobPreferences.remoteWork ? '✓' : '✗'} Open to remote work</span>
                              <span>{jobPreferences.relocationWilling ? '✓' : '✗'} Willing to relocate</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No job preferences set. Add your preferences to help find the right opportunities.</p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => setIsEditingPreferences(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {jobPreferences && Object.keys(jobPreferences).length > 0 ? 'Edit Preferences' : 'Add Job Preferences'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile; 