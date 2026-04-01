export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  source?: "local" | "api";
}

export const jobs: Job[] = [
  {
    id: "blockchain-developer",
    title: "Blockchain Developer",
    description: "Build decentralized applications and smart contracts using blockchain technologies.",
    requirements: [
      "blockchain",
      "solidity",
      "smart contracts",
      "web3",
      "ethereum",
      "javascript",
    ],
  },
  {
    id: "ethical-hacker",
    title: "Ethical Hacker",
    description: "Test systems for vulnerabilities using penetration testing and offensive security techniques.",
    requirements: [
      "ethical hacking",
      "penetration testing",
      "kali linux",
      "network security",
      "vulnerability assessment",
      "linux",
    ],
  },
  {
    id: "cyber-security-analyst",
    title: "Cyber Security Analyst",
    description: "Monitor systems, detect threats, and protect digital infrastructure.",
    requirements: [
      "cybersecurity",
      "siem",
      "incident response",
      "risk assessment",
      "threat modeling",
      "linux",
      "network security",
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Analyze structured and unstructured data to generate insights and predictive models.",
    requirements: [
      "python",
      "sql",
      "pandas",
      "numpy",
      "machine learning",
      "statistics",
      "data visualization",
      "power bi",
      "excel",
    ],
  },
  {
    id: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    description: "Build, train, and deploy machine learning systems and models.",
    requirements: [
      "python",
      "machine learning",
      "tensorflow",
      "pytorch",
      "scikit-learn",
      "model deployment",
      "numpy",
      "pandas",
    ],
  },
  {
    id: "game-developer",
    title: "Game Developer",
    description: "Build interactive video games and gameplay systems.",
    requirements: [
      "c#",
      "unity",
      "unreal engine",
      "game development",
      "physics",
      "3d graphics",
    ],
  },
  {
    id: "mobile-app-developer",
    title: "Mobile App Developer",
    description: "Develop mobile applications for Android or iOS platforms.",
    requirements: [
      "flutter",
      "dart",
      "react native",
      "kotlin",
      "java",
      "mobile development",
    ],
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    description: "Build user-facing, responsive interfaces for websites and web applications.",
    requirements: [
      "html",
      "css",
      "javascript",
      "react",
      "tailwind css",
      "bootstrap",
    ],
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    description: "Build and maintain server-side applications, APIs, and databases.",
    requirements: [
      "node.js",
      "express",
      "api",
      "sql",
      "mongodb",
      "database",
    ],
  },
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    description: "Build both frontend and backend parts of modern applications.",
    requirements: [
      "html",
      "css",
      "javascript",
      "react",
      "node.js",
      "sql",
      "api",
      "git",
    ],
  },
];