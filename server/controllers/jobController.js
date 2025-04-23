import Job from "../models/Job.js"




//Get all jobs 
export const getJobs = async (req, res) =>{
    try {
        const jobs = await Job.find({ visible: true })
            .populate('companyId', 'name email image')
            .sort({ date: -1 });

        res.json({success:true, jobs})
        
    } catch (error) {
        res.json({success:false, message:error.message})
        
    }


}

//Get a single job by ID

export const getJobById = async (req, res) => {
    try {
        const {id} = req.params
        
        if (!id) {
            return res.json({ success: false, message: "Job ID is required" });
        }

        const job = await Job.findById(id)
            .populate('companyId', 'name email image');

        if(!job){
            return res.json({
                success:false,
                message:'Job not found'
            })
        }
        res.json({success:true, job})
        
    } catch (error) {
        console.error("Error fetching job:", error);
        res.json({success:false, message:error.message})
        
    }

}