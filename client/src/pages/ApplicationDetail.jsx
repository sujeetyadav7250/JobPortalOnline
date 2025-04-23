import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { assets } from '../assets/assets';
import moment from 'moment';

const ApplicationDetail = () => {
  const { applicationId } = useParams();
  const { backendUrl, companyToken } = useContext(AppContext);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch application details
  const fetchApplicationDetail = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/company/applicants/${applicationId}`,
        { headers: { token: companyToken } }
      );

      if (data.success) {
        setApplication(data.application);
      } else {
        toast.error(data.message || 'Failed to fetch application details');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Change application status
  const changeJobApplicationStatus = async (status) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id: applicationId, status },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(`Application ${status.toLowerCase()}`);
        fetchApplicationDetail(); // Refresh data
      } else {
        toast.error(data.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'An error occurred');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyToken && applicationId) {
      fetchApplicationDetail();
    }
  }, [companyToken, applicationId]);

  if (loading) return <Loading />;

  if (!application) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">Application not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => navigate('/dashboard/view-applications')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Applications
        </button>

        {application.status === "Pending" && (
          <div className="flex gap-2">
            <button
              onClick={() => changeJobApplicationStatus('Accepted')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Accept
            </button>
            <button
              onClick={() => changeJobApplicationStatus('Rejected')}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Application Details</h1>
          <div className="mt-2 md:mt-0">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
              application.status === 'Accepted' 
                ? 'bg-green-100 text-green-800' 
                : application.status === 'Rejected' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {application.status || 'Pending'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Applicant Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Applicant Information</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <img 
                  src={application.userId?.image} 
                  alt={application.userId?.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-lg">{application.userId?.name}</h3>
                  <p className="text-gray-600">{application.userId?.email}</p>
                </div>
              </div>

              {application.userId?.title && (
                <div>
                  <p className="text-gray-500 text-sm">Professional Title</p>
                  <p>{application.userId.title}</p>
                </div>
              )}

              {application.userId?.location && (
                <div>
                  <p className="text-gray-500 text-sm">Location</p>
                  <p>{application.userId.location}</p>
                </div>
              )}

              {application.userId?.phone && (
                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p>{application.userId.phone}</p>
                </div>
              )}

              {application.userId?.bio && (
                <div>
                  <p className="text-gray-500 text-sm">Bio</p>
                  <p className="text-sm">{application.userId.bio}</p>
                </div>
              )}

              <div>
                <p className="text-gray-500 text-sm">Resume</p>
                <a 
                  href={application.userId?.resume} 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center mt-1 bg-blue-50 text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
                >
                  Download Resume 
                  <img src={assets.resume_download_icon} alt="" className="ml-2" />
                </a>
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Job Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Position</p>
                <p className="font-medium text-lg">{application.jobId?.title}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Location</p>
                <p>{application.jobId?.location}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Job Category</p>
                <p>{application.jobId?.category}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Experience Level</p>
                <p>{application.jobId?.level}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Salary</p>
                <p>${application.jobId?.salary.toLocaleString()}/year</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Application Date</p>
                <p>{application.date ? moment(application.date).format('MMMM Do, YYYY') : 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Qualifications */}
        {(application.userId?.skills && application.userId?.skills.length > 0) && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Skills & Qualifications</h2>
            <div className="flex flex-wrap gap-2">
              {application.userId.skills.map((skill, index) => (
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

        {/* Education */}
        {(application.userId?.education && application.userId?.education.length > 0) && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Education</h2>
            <div className="space-y-4">
              {application.userId.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4">
                  <h3 className="font-medium">{edu.degree} in {edu.fieldOfStudy}</h3>
                  <p>{edu.institution}</p>
                  <p className="text-sm text-gray-600">
                    {moment(edu.startDate).format('MMM YYYY')} - 
                    {edu.current ? ' Present' : ` ${moment(edu.endDate).format('MMM YYYY')}`}
                  </p>
                  {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {(application.userId?.experience && application.userId?.experience.length > 0) && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Work Experience</h2>
            <div className="space-y-4">
              {application.userId.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4">
                  <h3 className="font-medium">{exp.position}</h3>
                  <p>{exp.company}</p>
                  {exp.location && <p className="text-sm">{exp.location}</p>}
                  <p className="text-sm text-gray-600">
                    {moment(exp.startDate).format('MMM YYYY')} - 
                    {exp.current ? ' Present' : ` ${moment(exp.endDate).format('MMM YYYY')}`}
                  </p>
                  {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetail; 