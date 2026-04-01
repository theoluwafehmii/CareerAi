import { NextResponse } from "next/server";

const externalJobs = [
  {
    job_id: "api-001",
    job_title: "Frontend Engineer",
    company_name: "TechNova",
    location: "Remote",
    employment_type: "Full-time",
    job_description: "We are looking for a frontend engineer skilled in React, JavaScript, CSS, HTML, and Tailwind CSS. Experience with Bootstrap is a plus.",
    salary_range: "$60,000 - $80,000"
  },
  {
    job_id: "api-002",
    job_title: "Cyber Security Specialist",
    company_name: "SecureNet",
    location: "Hybrid",
    employment_type: "Full-time",
    job_description: "The ideal candidate should have experience with SIEM, Linux, penetration testing, incident response, and network security.",
    salary_range: "$75,000 - $95,000"
  },
  {
    job_id: "api-003",
    job_title: "Backend Engineer",
    company_name: "DataScale",
    location: "Remote",
    employment_type: "Full-time",
    job_description: "Expertise in Node.js, Express, SQL, and MongoDB is required. Knowledge of API design and database management is essential.",
    salary_range: "$80,000 - $110,000"
  },
  {
    job_id: "api-004",
    job_title: "Full Stack Developer",
    company_name: "CloudFlow",
    location: "Remote",
    employment_type: "Full-time",
    job_description: "Seeking a developer proficient in React, Node.js, and PostgreSQL. Experience with TypeScript and GraphQL is preferred.",
    salary_range: "$90,000 - $125,000"
  },
  {
    job_id: "api-005",
    job_title: "Data Scientist",
    company_name: "Insightly",
    location: "On-site",
    employment_type: "Full-time",
    job_description: "We need someone with strong Python, Pandas, and NumPy skills. Experience in Machine Learning, Statistics, and Data Visualization is a must.",
    salary_range: "$85,000 - $115,000"
  },
  {
    job_id: "api-006",
    job_title: "Machine Learning Engineer",
    company_name: "AIVision",
    location: "Remote",
    employment_type: "Full-time",
    job_description: "Expertise in Python, PyTorch, and TensorFlow. Candidate will work on Deep Learning, NLP, and model optimization.",
    salary_range: "$110,000 - $150,000"
  },
  {
    job_id: "api-007",
    job_title: "Ethical Hacker",
    company_name: "ShieldOps",
    location: "Hybrid",
    employment_type: "Contract",
    job_description: "Perform Penetration Testing and Vulnerability Assessment. Proficiency in Kali Linux and Ethical Hacking tools is mandatory.",
    salary_range: "$90/hr - $110/hr"
  },
  {
    job_id: "api-008",
    job_title: "Blockchain Engineer",
    company_name: "CryptoLogic",
    location: "Remote",
    employment_type: "Full-time",
    job_description: "Develop smart contracts using Solidity. Experience with Ethereum, Web3.js, and Blockchain security is required.",
    salary_range: "$120,000 - $170,000"
  },
  {
    job_id: "api-009",
    job_title: "Mobile App Developer",
    company_name: "AppSphere",
    location: "Remote",
    employment_type: "Full-time",
    job_description: "Build high-performance apps with React Native or Flutter. Experience with iOS/Android development and Redux.",
    salary_range: "$80,000 - $110,000"
  },
  {
    job_id: "api-010",
    job_title: "Game Developer",
    company_name: "NeoPixel",
    location: "On-site",
    employment_type: "Full-time",
    job_description: "Experience with Unity, C#, and 3D modeling. Knowledge of Shader programming and game physics is a plus.",
    salary_range: "$75,000 - $105,000"
  },
  {
    job_id: "api-011",
    job_title: "React Developer",
    company_name: "WebWizards",
    location: "Remote",
    employment_type: "Full-time",
    job_description: "Specialized in React, Next.js, and CSS modules. Passionate about building responsive UI and fast web apps.",
    salary_range: "$70,000 - $95,000"
  },
  {
    job_id: "api-012",
    job_title: "Cyber Security Analyst",
    company_name: "WallSecure",
    location: "Hybrid",
    employment_type: "Full-time",
    job_description: "Monitor Network Security, conduct risk assessments, and manage firewalls and encryption protocols.",
    salary_range: "$85,000 - $105,000"
  }
];

export async function GET() {
  return NextResponse.json(externalJobs);
}
