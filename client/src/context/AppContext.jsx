import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    })
    
    const [isSearched, setIsSearched] = useState(false)
    const [jobs, setJobs] = useState([])

    // Company-related states
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)

    // User-related states
    const [showUserAuth, setShowUserAuth] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])

    // Function to fetch jobs
    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/jobs')

            if (data.success) {
                console.log("Successfully fetched jobs:", data.jobs.length);
                setJobs(data.jobs)
            } else {
                console.error("Failed to fetch jobs:", data.message);
                toast.error(data.message || 'Failed to load jobs')
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
            toast.error(error.message || 'Network error while loading jobs')
        }
    }

    // Function to fetch company data
    const fetchCompanyData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } })

            if (data.success) {
                setCompanyData(data.company)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            if (!userToken) return;

            const { data } = await axios.get(backendUrl + '/api/users/user', 
                { headers: { Authorization: `Bearer ${userToken}` } }
            )

            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to fetch user's applied applications data
    const fetchUserApplications = async () => {
        try {
            if (!userToken) {
                console.log("No userToken available, skipping applications fetch");
                return [];
            }

            console.log("Fetching user applications with token:", userToken ? "Token exists" : "No token");
            const { data } = await axios.get(backendUrl + '/api/users/applications', 
                { headers: { Authorization: `Bearer ${userToken}` } })
                
            if (data.success) {
                console.log("Applications fetched successfully:", data.applications.length);
                // Only update state if the data has actually changed
                if (JSON.stringify(data.applications) !== JSON.stringify(userApplications)) {
                    setUserApplications(data.applications);
                }
                return data.applications;
            } else {
                console.error("Failed to fetch applications:", data.message);
                toast.error(data.message || 'Failed to load your applications')
                return [];
            }
        } catch (error) {
            console.error("Error in fetchUserApplications:", error);
            toast.error(error.message || 'Failed to fetch your applications')
            return [];
        }
    }

    // Function to logout user
    const logoutUser = () => {
        setUserToken(null)
        setUserData(null)
        localStorage.removeItem('userToken')
    }

    useEffect(() => {
        fetchJobs()

        // Load company token from storage
        const storedCompanyToken = localStorage.getItem('companyToken')
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }

        // Load user token from storage
        const storedUserToken = localStorage.getItem('userToken')
        if (storedUserToken) {
            setUserToken(storedUserToken)
        }
    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
        }
    }, [companyToken])

    // Only run this effect when userToken changes from null to a value or vice versa
    useEffect(() => {
        if (userToken) {
            console.log("User token is available, fetching user data...");
            // We'll use a flag to only fetch both resources once per token change
            let isFetched = false;
            
            if (!isFetched) {
                fetchUserData();
                // Only fetch applications on the initial load, not on every render
                fetchUserApplications();
                isFetched = true;
            }
        }
    }, [userToken]);

    const value = {
        setSearchFilter, searchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        showUserAuth, setShowUserAuth,
        userToken, setUserToken,
        userData, setUserData,
        userApplications, setUserApplications,
        backendUrl,
        fetchUserData,
        fetchUserApplications,
        logoutUser
    }

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}




