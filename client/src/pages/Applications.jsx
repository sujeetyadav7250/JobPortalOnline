import React, { useContext, useEffect, useState } from 'react'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(false)
  const [applicationsFetched, setApplicationsFetched] = useState(false)

  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications, userToken } = useContext(AppContext)

  // Debug useEffect to monitor userApplications
  useEffect(() => {
    console.log("userApplications in state:", userApplications?.length || 0);
  }, [userApplications]);

  // Fetch applications only once when component mounts
  useEffect(() => {
    if (userToken && !applicationsFetched) {
      setLoading(true);
      console.log("Fetching user applications with token");
      fetchUserApplications()
        .then(() => setApplicationsFetched(true))
        .finally(() => setLoading(false));
    }
  }, [userToken, applicationsFetched]);

  const updateResume = async() => {
    if (!resume) {
      toast.error('Please select a resume file');
      return;
    }

    // Check file size
    if (resume.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit. Please choose a smaller file.');
      return;
    }

    // Check file extension
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileExtension = resume.name.substring(resume.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      toast.error('Invalid file format. Please upload a PDF or DOC/DOCX file.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData()
      formData.append('resume', resume)

      const { data } = await axios.post(
        `${backendUrl}/api/users/update-resume`,
        formData,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (data.success) {
        toast.success(data.message)
        await fetchUserData()
      } else {
        toast.error(data.message || 'Failed to upload resume')
      }
    } catch (error) {
      console.error('Resume upload error:', error)
      toast.error(error.response?.data?.message || error.message || 'Failed to upload resume')
    } finally {
      setLoading(false)
      setIsEdit(false)
      setResume(null)
    }
  }

  return (
    <>
    <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
      <h2 className='text-xl font-semibold'>Your Resume</h2>
      <div className='flex gap-2 mb-6 mt-3'>
        {
          isEdit || (userData && !userData.resume)
          ? <>
            <label className='flex items-center' htmlFor="resumeUpload">
              <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>{resume ? resume.name : "Select Resume"}</p>
              <input 
                id='resumeUpload' 
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
                accept='.pdf,.doc,.docx' 
                type="file" 
                hidden
              />
              <img src={assets.profile_upload_icon} alt="" />
            </label>
            <button 
              onClick={updateResume} 
              disabled={loading || !resume}
              className={`${loading || !resume ? 'opacity-50 cursor-not-allowed' : ''} bg-green-100 border border-green-400 rounded-lg px-4 py-2`}
            >
              {loading ? 'Uploading...' : 'Save'}
            </button>
          </>
          : <div className='flex gap-2'>
            <a className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href={userData?.resume} target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
            <button onClick={()=>setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'>
              Edit
            </button>
          </div>
        }
      </div>

      <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <p>Loading your applications...</p>
        </div>
      ) : userApplications && userApplications.length > 0 ? (
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <tr>
              <th className='py-3 px-4 border-b text-left'>Company</th>
              <th className='py-3 px-4 border-b text-left'>Job Title</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-3 px-4 border-b text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {userApplications.map((job, index) => (
              <tr key={index}>
                <td className='py-3 px-4 flex items-center gap-2 border-b'>
                  <img className='w-8 h-8' src={job.companyId?.image} alt="" />
                  {job.companyId?.name}
                </td>
                <td className='py-2 px-4 border-b'>{job.jobId?.title}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{job.jobId?.location}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{job.date ? moment(job.date).format('ll') : 'N/A'}</td>
                <td className='py-2 px-4 border-b'>
                  <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded`}>
                    {job.status || 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='text-center py-10 bg-white rounded-lg shadow'>
          <p className='text-gray-600'>You haven't applied to any jobs yet.</p>
        </div>
      )}
    </div>
    <Footer/>
    </>
  )
}

export default Applications


