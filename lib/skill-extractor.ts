import { jobs } from "./jobs-data";

export interface Skill {
  name: string;
  count: number;
}

export interface ExtractedSkills {
  matchedSkills: Skill[];
  additionalSkills: Skill[];
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s.#+-]/g, " ")
    .split(/\s+/)
    .map((word) => word.replace(/\.+$/, "")) // Strip trailing dots (like from end of sentences)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

const SKILL_SYNONYMS: Record<string, string> = {
  // Frontend
  js: "javascript",
  "react.js": "react",
  "react js": "react",
  nextjs: "next.js",
  "next js": "next.js",
  ts: "typescript",
  "tailwind": "tailwind css",
  tailwindcss: "tailwind css",
  "boot strap": "bootstrap",
  
  // Backend & Database
  nodejs: "node.js",
  "node js": "node.js",
  "express.js": "express",
  "express js": "express",
  mongodb: "mongodb",
  "mongo db": "mongodb",
  postgresql: "postgres",
  postgre: "postgres",
  mysql: "sql",
  mssql: "sql",
  
  // Data Science & AI
  powerbi: "power bi",
  "microsoft excel": "excel",
  "ms excel": "excel",
  ml: "machine learning",
  ai: "machine learning",
  "artificial intelligence": "machine learning",
  "deep learning": "machine learning",
  "machine-learning": "machine learning",
  neural: "machine learning",
  numpy: "numpy",
  scikit: "scikit-learn",
  sklearn: "scikit-learn",
  tf: "tensorflow",
  
  // Cybersecurity
  pentest: "penetration testing",
  "penetration test": "penetration testing",
  "ethical hacking": "ethical hacking",
  "cyber security": "cybersecurity",
  "cyber security analyst": "cybersecurity",
  infosec: "cybersecurity",
  "network security": "network security",
  "threat model": "threat modeling",
  "incident response": "incident response",
  "vulnerability": "vulnerability assessment",
  
  // Mobile
  "reactnative": "react native",
  "react-native": "react native",
  "mobile app": "mobile development",
  "app development": "mobile development",
  
  // Blockchain
  "smart contract": "smart contracts",
  web3js: "web3",
  eth: "ethereum",
  btc: "blockchain",
  crypto: "blockchain",
  "distributed ledger": "blockchain",
  
  // Game Development
  unity3d: "unity",
  "unreal engine": "unreal engine",
  ue4: "unreal engine",
  ue5: "unreal engine",
  "game design": "game development",
  
  // General Tech
  "source control": "git",
  vcs: "git",
  gh: "git", // GitHub
};

export const SOFT_SKILLS = [
  "communication",
  "teamwork",
  "leadership",
  "problem solving",
  "critical thinking",
  "time management",
  "adaptability",
  "creativity",
  "work ethic",
  "attention to detail",
  "decision making",
  "public speaking",
  "negotiation",
  "conflict resolution",
  "customer service",
  "project management",
  "agile",
  "scrum",
];

const COMMON_TECHNICAL_SKILLS = [
  // Web Development
  "html",
  "css",
  "javascript",
  "typescript",
  "react",
  "next.js",
  "tailwind css",
  "bootstrap",
  "sass",
  "less",
  "webpack",
  "vite",
  
  // Backend & Databases
  "node.js",
  "express",
  "api",
  "rest api",
  "graphql",
  "sql",
  "postgres",
  "mongodb",
  "database",
  "redis",
  "docker",
  
  // Data & AI
  "python",
  "pandas",
  "numpy",
  "excel",
  "power bi",
  "machine learning",
  "statistics",
  "data visualization",
  "tensorflow",
  "pytorch",
  "scikit-learn",
  "model deployment",
  "r",
  "tableau",
  
  // Cybersecurity & Networks
  "blockchain",
  "solidity",
  "smart contracts",
  "web3",
  "ethereum",
  "ethical hacking",
  "penetration testing",
  "kali linux",
  "linux",
  "network security",
  "vulnerability assessment",
  "cybersecurity",
  "siem",
  "incident response",
  "risk assessment",
  "threat modeling",
  "firewalls",
  "encryption",
  
  // Game & Mobile
  "c#",
  "unity",
  "unreal engine",
  "game development",
  "physics",
  "3d graphics",
  "flutter",
  "dart",
  "react native",
  "kotlin",
  "java",
  "mobile development",
  "swift",
  "objective-c",
  
  // Tools & Others
  "git",
  "aws",
  "azure",
  "cloud computing",
  "firebase",
];

function canonicalizeSkill(skill: string): string {
  return SKILL_SYNONYMS[skill] || skill;
}

function getJobSkillVocabulary(): Set<string> {
  const allSkills = jobs.flatMap((job) =>
    job.requirements.map((req) => canonicalizeSkill(req.toLowerCase().trim()))
  );
  return new Set(allSkills);
}

function getAllKnownSkills() {
  const matchedVocabulary = getJobSkillVocabulary();
  const additionalVocabulary = new Set([
    ...SOFT_SKILLS.map((skill: string) => canonicalizeSkill(skill.toLowerCase().trim())),
    ...COMMON_TECHNICAL_SKILLS.map((skill) => canonicalizeSkill(skill.toLowerCase().trim())),
  ]);

  return {
    matchedVocabulary,
    additionalVocabulary,
    allVocabulary: new Set([...matchedVocabulary, ...additionalVocabulary]),
  };
}

function tokenize(text: string): string[] {
  return normalizeText(text).split(" ").filter(Boolean);
}

function findLongestSkillMatch(
  tokens: string[],
  startIndex: number,
  allVocabulary: Set<string>
): { skill: string; length: number } | null {
  for (let size = 3; size >= 1; size--) {
    if (startIndex + size > tokens.length) continue;

    const phrase = tokens.slice(startIndex, startIndex + size).join(" ");
    const canonicalPhrase = canonicalizeSkill(phrase);

    if (allVocabulary.has(canonicalPhrase)) {
      return {
        skill: canonicalPhrase,
        length: size,
      };
    }
  }

  return null;
}

export function extractSkills(resumeText: string): ExtractedSkills {
  const tokens = tokenize(resumeText);
  const { matchedVocabulary, additionalVocabulary, allVocabulary } = getAllKnownSkills();

  const matchedCounts: Record<string, number> = {};
  const additionalCounts: Record<string, number> = {};

  let i = 0;

  while (i < tokens.length) {
    const match = findLongestSkillMatch(tokens, i, allVocabulary);

    if (match) {
      if (matchedVocabulary.has(match.skill)) {
        matchedCounts[match.skill] = (matchedCounts[match.skill] || 0) + 1;
      } else if (additionalVocabulary.has(match.skill)) {
        additionalCounts[match.skill] = (additionalCounts[match.skill] || 0) + 1;
      }

      i += match.length;
    } else {
      i += 1;
    }
  }

  const matchedSkills: Skill[] = Object.entries(matchedCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const additionalSkills: Skill[] = Object.entries(additionalCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return {
    matchedSkills,
    additionalSkills,
  };
}