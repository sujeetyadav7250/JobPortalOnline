import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from '../models/Company.js';
import Job from '../models/Job.js';

// Load environment variables
dotenv.config();

// Use hardcoded connection string if environment variable is not available
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://sujeee:sujee@suj.wfzpx6m.mongodb.net';

// Connect to MongoDB
mongoose.connect(`${MONGODB_URL}/job-portal`)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Detailed job descriptions
const jobListings = [
  {
    title: "Senior Full Stack Developer",
    description: `<h3>About the Role</h3>
    <p>We're looking for a Senior Full Stack Developer to join our innovative technology team. You'll be responsible for developing and maintaining our core applications, building reusable code, and optimizing application performance.</p>
    
    <h3>Responsibilities</h3>
    <ul>
      <li>Design and develop high-quality, scalable software solutions</li>
      <li>Collaborate with cross-functional teams to define, design, and ship new features</li>
      <li>Work with both front-end and back-end technologies (React, Node.js, MongoDB)</li>
      <li>Implement responsive design and ensure cross-browser compatibility</li>
      <li>Optimize applications for maximum speed and scalability</li>
      <li>Stay up-to-date with emerging technologies and industry trends</li>
    </ul>
    
    <h3>Requirements</h3>
    <ul>
      <li>5+ years experience in full stack development</li>
      <li>Proficiency in JavaScript, HTML, CSS, and modern JS frameworks (React, Angular, or Vue)</li>
      <li>Extensive experience with Node.js and Express</li>
      <li>Experience with database technologies (MongoDB, MySQL)</li>
      <li>Understanding of server-side templating languages</li>
      <li>Strong understanding of RESTful APIs and web services</li>
      <li>Excellent problem-solving and analytical skills</li>
    </ul>`,
    location: "Bangalore, India",
    salary: 1800000,
    level: "Senior",
    category: "Engineering",
  },
  {
    title: "Data Scientist",
    description: `<h3>About the Role</h3>
    <p>We are seeking a talented Data Scientist to join our Analytics team. In this role, you will apply data mining techniques, statistical analysis, and build high-quality prediction systems integrated with our products.</p>
    
    <h3>Responsibilities</h3>
    <ul>
      <li>Develop and implement statistical learning models and data mining algorithms</li>
      <li>Work with stakeholders to identify opportunities for leveraging company data</li>
      <li>Research and implement novel approaches to solving business problems using data</li>
      <li>Develop processes and tools to monitor and analyze model performance</li>
      <li>Communicate findings to both technical and non-technical audiences</li>
    </ul>
    
    <h3>Requirements</h3>
    <ul>
      <li>3+ years of experience in data science or related field</li>
      <li>Strong knowledge of Python, R, or similar programming languages</li>
      <li>Experience with machine learning libraries (scikit-learn, TensorFlow, PyTorch)</li>
      <li>Understanding of statistical modeling, machine learning algorithms, and deep learning</li>
      <li>Excellent SQL skills and experience working with databases</li>
      <li>MSc or PhD in Computer Science, Statistics, or related field</li>
      <li>Strong problem-solving and analytical thinking skills</li>
    </ul>`,
    location: "Hyderabad, India",
    salary: 1600000,
    level: "Mid-Senior",
    category: "Data Science",
  },
  {
    title: "UX/UI Designer",
    description: `<h3>About the Role</h3>
    <p>We're looking for a creative UX/UI Designer to create amazing user experiences. You'll work with product managers and engineers to design intuitive interfaces that help our customers achieve their goals.</p>
    
    <h3>Responsibilities</h3>
    <ul>
      <li>Create user-centered designs by understanding business requirements and user feedback</li>
      <li>Develop wireframes, prototypes, and UI mockups that clearly illustrate how sites function</li>
      <li>Design responsive layouts that work across multiple devices and screen sizes</li>
      <li>Create original graphic designs (e.g. images, sketches, and tables)</li>
      <li>Conduct layout adjustments based on user feedback</li>
      <li>Adhere to style standards on fonts, colors, and images</li>
    </ul>
    
    <h3>Requirements</h3>
    <ul>
      <li>3+ years experience as a UI/UX Designer or similar role</li>
      <li>Proficiency with design tools (Figma, Sketch, Adobe XD)</li>
      <li>Portfolio of design projects</li>
      <li>Knowledge of wireframe tools (e.g. Wireframe.cc, InVision)</li>
      <li>Understanding of current design trends and usability best practices</li>
      <li>Strong communication skills and ability to explain design decisions</li>
      <li>Bachelor's degree in Design, Fine Arts, or related field is a plus</li>
    </ul>`,
    location: "Chennai, India",
    salary: 1200000,
    level: "Mid-Level",
    category: "Design",
  },
  {
    title: "DevOps Engineer",
    description: `<h3>About the Role</h3>
    <p>We are seeking a DevOps Engineer to help build and maintain our cloud infrastructure, implement CI/CD pipelines, and ensure system reliability and scalability.</p>
    
    <h3>Responsibilities</h3>
    <ul>
      <li>Design, implement, and manage our AWS/Azure/GCP cloud infrastructure</li>
      <li>Build and maintain CI/CD pipelines using tools like Jenkins, GitLab CI, or GitHub Actions</li>
      <li>Implement infrastructure as code using tools like Terraform, CloudFormation, or Pulumi</li>
      <li>Monitor system performance and troubleshoot issues in production environments</li>
      <li>Collaborate with development teams to improve deployment processes</li>
      <li>Implement security best practices and ensure compliance requirements are met</li>
    </ul>
    
    <h3>Requirements</h3>
    <ul>
      <li>3+ years of experience in DevOps or similar role</li>
      <li>Strong understanding of cloud platforms (AWS, Azure, or GCP)</li>
      <li>Experience with containerization technologies (Docker, Kubernetes)</li>
      <li>Knowledge of infrastructure as code tools (Terraform, CloudFormation)</li>
      <li>Familiarity with CI/CD tools and methodologies</li>
      <li>Understanding of networking concepts and security principles</li>
      <li>Excellent problem-solving skills and ability to automate repetitive tasks</li>
    </ul>`,
    location: "Pune, India",
    salary: 1500000,
    level: "Mid-Level",
    category: "Engineering",
  },
  {
    title: "Product Manager",
    description: `<h3>About the Role</h3>
    <p>We are looking for a strategic Product Manager to help define and drive our product vision. You will work closely with engineering, design, and business teams to deliver products that meet customer needs.</p>
    
    <h3>Responsibilities</h3>
    <ul>
      <li>Define product vision, strategy, and roadmap based on market research and customer feedback</li>
      <li>Gather and prioritize product requirements and create detailed specifications</li>
      <li>Work with engineering and design teams to deliver high-quality products</li>
      <li>Analyze product metrics and user feedback to drive continuous improvement</li>
      <li>Present product plans to stakeholders and executive leadership</li>
      <li>Stay informed about market trends and competition</li>
    </ul>
    
    <h3>Requirements</h3>
    <ul>
      <li>3-5 years of experience in product management, preferably in a SaaS or technology company</li>
      <li>Experience defining and launching successful products</li>
      <li>Strong analytical skills and data-driven approach to decision making</li>
      <li>Excellent communication and storytelling abilities</li>
      <li>Technical background or understanding of software development processes</li>
      <li>Ability to understand and represent user needs</li>
      <li>Bachelor's degree in Business, Computer Science, or a related field</li>
    </ul>`,
    location: "Mumbai, India",
    salary: 1700000,
    level: "Senior",
    category: "Product",
  },
  {
    title: "Frontend Developer",
    description: `<h3>About the Role</h3>
    <p>We're seeking a talented Frontend Developer to implement visual elements and user interactions for our web applications. You'll be working closely with designers to bring their creations to life.</p>
    
    <h3>Responsibilities</h3>
    <ul>
      <li>Develop new user-facing features using React.js and modern JavaScript practices</li>
      <li>Build reusable components and libraries for future use</li>
      <li>Translate designs and wireframes into high-quality code</li>
      <li>Optimize applications for maximum speed and scalability</li>
      <li>Collaborate with back-end developers to integrate frontend with server-side logic</li>
      <li>Ensure cross-browser compatibility and responsive design</li>
    </ul>
    
    <h3>Requirements</h3>
    <ul>
      <li>2+ years of experience with JavaScript and modern frameworks (React, Vue, or Angular)</li>
      <li>Proficiency with HTML5, CSS3, and CSS preprocessors (SASS, LESS)</li>
      <li>Experience with responsive design and mobile-first approaches</li>
      <li>Familiarity with RESTful APIs and modern front-end build tools</li>
      <li>Understanding of cross-browser compatibility issues and solutions</li>
      <li>Good understanding of web performance optimization techniques</li>
      <li>Strong attention to detail and passion for UI/UX</li>
    </ul>`,
    location: "Delhi, India",
    salary: 1000000,
    level: "Mid-Level",
    category: "Engineering",
  },
  {
    title: "QA Engineer",
    description: `<h3>About the Role</h3>
    <p>We are looking for a detail-oriented QA Engineer to ensure the quality of our software products. You will be responsible for creating and executing test plans, finding and reporting bugs, and helping improve overall software quality.</p>
    
    <h3>Responsibilities</h3>
    <ul>
      <li>Create and execute detailed test plans and test cases</li>
      <li>Perform manual testing of web and mobile applications</li>
      <li>Design, develop, and execute automation scripts using tools like Selenium or Cypress</li>
      <li>Report and track bugs using issue tracking systems</li>
      <li>Work with developers to resolve issues and verify fixes</li>
      <li>Participate in Agile ceremonies and contribute to process improvements</li>
    </ul>
    
    <h3>Requirements</h3>
    <ul>
      <li>2+ years of experience in software testing or quality assurance</li>
      <li>Experience with test management tools and bug tracking systems</li>
      <li>Knowledge of software QA methodologies, tools, and processes</li>
      <li>Experience with automated testing tools and frameworks</li>
      <li>Basic understanding of programming concepts</li>
      <li>Strong analytical and problem-solving skills</li>
      <li>Excellent communication and teamwork abilities</li>
    </ul>`,
    location: "Bangalore, India",
    salary: 900000,
    level: "Entry-Mid",
    category: "Quality Assurance",
  },
  {
    title: "Backend Developer",
    description: `<h3>About the Role</h3>
    <p>We're looking for a skilled Backend Developer to help build and maintain the server-side of our applications. You'll be responsible for implementing business logic, database interactions, and ensuring high performance and security.</p>
    
    <h3>Responsibilities</h3>
    <ul>
      <li>Design and develop robust, scalable, and secure server-side applications</li>
      <li>Implement data storage solutions with focus on efficiency, reliability, and security</li>
      <li>Create and maintain API endpoints for frontend and mobile applications</li>
      <li>Optimize applications for high-performance and high-availability</li>
      <li>Collaborate with frontend developers to ensure seamless integration</li>
      <li>Implement automated testing to ensure code quality</li>
    </ul>
    
    <h3>Requirements</h3>
    <ul>
      <li>3+ years of experience in backend development</li>
      <li>Proficiency in one or more backend languages (Node.js, Python, Java, Ruby, Go)</li>
      <li>Experience with database technologies (SQL, NoSQL)</li>
      <li>Understanding of RESTful APIs and microservices architecture</li>
      <li>Knowledge of cloud services (AWS, Azure, or GCP)</li>
      <li>Understanding of security concerns and best practices</li>
      <li>Experience with version control systems (Git)</li>
    </ul>`,
    location: "Hyderabad, India",
    salary: 1300000,
    level: "Mid-Level",
    category: "Engineering",
  },
  {
    title: "Marketing Manager",
    description: `<h3>About the Role</h3>
    <p>We are seeking a creative and analytical Marketing Manager to develop and implement marketing strategies that increase brand awareness and drive customer acquisition and retention.</p>
    
    <h3>Responsibilities</h3>
    <ul>
      <li>Develop and execute comprehensive marketing plans and campaigns</li>
      <li>Manage digital marketing channels including social media, email, and content marketing</li>
      <li>Analyze campaign performance metrics and optimize strategies based on data</li>
      <li>Collaborate with product and sales teams to align marketing efforts with business goals</li>
      <li>Manage marketing budget and resources effectively</li>
      <li>Stay up-to-date with latest marketing trends, tools, and technologies</li>
    </ul>
    
    <h3>Requirements</h3>
    <ul>
      <li>3-5 years of experience in marketing roles, preferably in B2B or SaaS companies</li>
      <li>Proven track record of successful marketing campaigns</li>
      <li>Experience with digital marketing tools and platforms</li>
      <li>Strong analytical skills and data-driven approach</li>
      <li>Excellent project management and organizational abilities</li>
      <li>Creative mindset with strong communication skills</li>
      <li>Bachelor's degree in Marketing, Business, or related field</li>
    </ul>`,
    location: "Mumbai, India",
    salary: 1400000,
    level: "Mid-Senior",
    category: "Marketing",
  },
  {
    title: "Data Engineer",
    description: `<h3>About the Role</h3>
    <p>We are looking for a skilled Data Engineer to help design, build, and maintain our data processing systems. You will work on creating data pipelines that enable efficient data collection, storage, and analysis.</p>
    
    <h3>Responsibilities</h3>
    <ul>
      <li>Build and optimize data pipelines and ETL processes</li>
      <li>Design and implement database schemas that represent and support business processes</li>
      <li>Develop, construct, test, and maintain architectures for large-scale data processing</li>
      <li>Ensure data quality, reliability, and accessibility</li>
      <li>Collaborate with data scientists and analysts to deliver data solutions</li>
      <li>Implement data security and compliance measures</li>
    </ul>
    
    <h3>Requirements</h3>
    <ul>
      <li>3+ years of experience in data engineering or similar role</li>
      <li>Proficiency in SQL and Python or Scala</li>
      <li>Experience with big data technologies (Hadoop, Spark, Kafka)</li>
      <li>Knowledge of cloud-based data tools and data warehousing solutions</li>
      <li>Understanding of data modeling, data access, and data storage techniques</li>
      <li>Experience with workflow management tools (Airflow, Luigi)</li>
      <li>Strong problem-solving skills and attention to detail</li>
    </ul>`,
    location: "Pune, India",
    salary: 1500000,
    level: "Mid-Level",
    category: "Data",
  }
];

// Function to seed jobs
const seedJobs = async () => {
  try {
    // Find the TCS company by email
    const tcsCompany = await Company.findOne({ email: 'tcs@demo.com' });
    
    if (!tcsCompany) {
      console.error('Company with email tcs@demo.com not found. Please create this account first.');
      process.exit(1);
    }
    
    // Delete existing jobs by this company to avoid duplicates
    await Job.deleteMany({ companyId: tcsCompany._id });
    
    console.log(`Found company: ${tcsCompany.name} with ID: ${tcsCompany._id}`);
    
    // Create jobs for this company
    const jobPromises = jobListings.map(job => {
      const newJob = new Job({
        ...job,
        companyId: tcsCompany._id,
        date: new Date(),
        visible: true
      });
      return newJob.save();
    });
    
    await Promise.all(jobPromises);
    console.log(`Successfully seeded ${jobListings.length} jobs for ${tcsCompany.name}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding jobs:', error);
    process.exit(1);
  }
};

// Run the seed function
seedJobs(); 