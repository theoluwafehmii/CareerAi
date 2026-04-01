export interface LearningResource {
  title: string;
  link: string;
  type: "course" | "video" | "documentation";
}

const resourcesData: Record<string, LearningResource[]> = {
  // Frontend
  "html": [{ title: "HTML Crash Course", link: "https://www.youtube.com/watch?v=qz0aGYrrlhU", type: "video" }],
  "css": [{ title: "CSS Tutorial for Beginners", link: "https://www.youtube.com/watch?v=yfoY53QXEnI", type: "video" }],
  "javascript": [
    { title: "JavaScript Course", link: "https://www.youtube.com/watch?v=jS4aFq5-91M", type: "video" },
    { title: "MDN JS Docs", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", type: "documentation" }
  ],
  "react": [{ title: "React Tutorial", link: "https://react.dev/learn", type: "documentation" }],
  "tailwind css": [{ title: "Tailwind CSS Documentation", link: "https://tailwindcss.com/docs/installation", type: "documentation" }],
  
  // Backend
  "node.js": [{ title: "Node.js Tutorial", link: "https://nodejs.org/en/learn", type: "documentation" }],
  "express": [{ title: "Express.js Crash Course", link: "https://www.youtube.com/watch?v=L72fhGm1tfE", type: "video" }],
  "sql": [{ title: "SQL Tutorial", link: "https://www.w3schools.com/sql/", type: "documentation" }],
  "mongodb": [{ title: "MongoDB University", link: "https://learn.mongodb.com/", type: "course" }],
  "api": [{ title: "REST API Concepts", link: "https://restfulapi.net/", type: "documentation" }],
  
  // Data / ML
  "python": [{ title: "Python for Beginners", link: "https://www.youtube.com/watch?v=kqtD5dpn9C8", type: "video" }],
  "pandas": [{ title: "Pandas User Guide", link: "https://pandas.pydata.org/docs/user_guide/index.html", type: "documentation" }],
  "numpy": [{ title: "NumPy Quickstart", link: "https://numpy.org/doc/stable/user/quickstart.html", type: "documentation" }],
  "excel": [{ title: "Excel Crash Course", link: "https://www.youtube.com/watch?v=Vl0H-qTclOg", type: "video" }],
  "power bi": [{ title: "Power BI Tutorial", link: "https://learn.microsoft.com/en-us/power-bi/", type: "documentation" }],
  "machine learning": [{ title: "Machine Learning Concepts", link: "https://www.coursera.org/learn/machine-learning", type: "course" }],
  "statistics": [{ title: "Intro to Statistics", link: "https://www.khanacademy.org/math/statistics-probability", type: "course" }],
  "data visualization": [{ title: "Data Visualization with Python", link: "https://www.coursera.org/learn/python-for-data-visualization", type: "course" }],
  
  // Cybersecurity
  "linux": [{ title: "Linux Basics for Hackers", link: "https://nostarch.com/linuxbasicsforhackers", type: "documentation" }],
  "siem": [{ title: "What is SIEM?", link: "https://www.ibm.com/topics/siem", type: "documentation" }],
  "penetration testing": [{ title: "Penetration Testing Course", link: "https://www.youtube.com/watch?v=3Kq1MIfTWCE", type: "video" }],
  "network security": [{ title: "Network Security Fundamentals", link: "https://www.coursera.org/learn/network-security", type: "course" }],
  
  // Blockchain
  "solidity": [{ title: "CryptoZombies - Learn Solidity", link: "https://cryptozombies.io/", type: "course" }],
  "blockchain": [{ title: "Blockchain Specialization", link: "https://www.coursera.org/specializations/blockchain", type: "course" }],
  "smart contracts": [{ title: "Smart Contracts Guide", link: "https://ethereum.org/en/developers/docs/smart-contracts/", type: "documentation" }],
  "web3": [{ title: "Web3.js Documentation", link: "https://web3js.readthedocs.io/", type: "documentation" }],
  
  // Mobile
  "flutter": [{ title: "Flutter Documentation", link: "https://docs.flutter.dev/", type: "documentation" }],
  "dart": [{ title: "Dart Language Tour", link: "https://dart.dev/language", type: "documentation" }],
  "react native": [{ title: "React Native Basics", link: "https://reactnative.dev/docs/getting-started", type: "documentation" }],
  "kotlin": [{ title: "Kotlin Bootcamp", link: "https://developer.android.com/courses/kotlin-bootcamp/overview", type: "course" }],
  
  // Game Dev
  "unity": [{ title: "Unity Learn", link: "https://learn.unity.com/", type: "course" }],
  "unreal engine": [{ title: "Unreal Online Learning", link: "https://dev.epicgames.com/community/unreal-engine/learning", type: "course" }],
  "c#": [{ title: "C# Fundamentals", link: "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/", type: "documentation" }]
};

export function getRecommendationsForSkills(skills: string[]): LearningResource[] {
  const recommendations: LearningResource[] = [];
  const addedLinks = new Set<string>();

  for (const skill of skills) {
    const key = skill.toLowerCase().trim();
    const resources = resourcesData[key];
    
    if (resources) {
      for (const res of resources) {
        if (!addedLinks.has(res.link)) {
          recommendations.push(res);
          addedLinks.add(res.link);
        }
      }
    }
  }

  // To avoid overwhelming the user, we return max 4 relevant resources per job
  return recommendations.slice(0, 4);
}
