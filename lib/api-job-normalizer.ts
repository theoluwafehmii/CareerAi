import { Job } from "./jobs-data";
import { extractSkills, SOFT_SKILLS } from "./skill-extractor";

/**
 * Represents the raw job format returned by external/mock APIs.
 */
export interface ApiJob {
  job_id?: string;
  job_title?: string;
  company_name?: string;
  location?: string;
  employment_type?: string;
  job_description?: string;
  salary_range?: string;
}

/**
 * Normalizes a single raw API job object into the internal Job format.
 * It uses the skill-extractor to identify requirements from the job description,
 * but filters out soft skills to keep the matching focused on technical requirements.
 * 
 * @param apiJob The raw job data from the API.
 * @returns A normalized Job object or null if critical data is missing.
 */
export function normalizeApiJob(apiJob: ApiJob, searchQuery: string = ""): Job | null {
  // Safety check: skip jobs without critical identifiers or content
  if (!apiJob.job_id || !apiJob.job_title || !apiJob.job_description) {
    return null;
  }

  // Combine description and the search query internally to guarantee the skills 
  // used to fetch this job are accounted for in its requirements, without messing up the UI description.
  const textToExtract = `${apiJob.job_title} ${apiJob.job_description} ${searchQuery}`;
  const { matchedSkills, additionalSkills } = extractSkills(textToExtract);
  
  // Combine all detected skills
  const allDetectedSkills = [
    ...matchedSkills.map(s => s.name),
    ...additionalSkills.map(s => s.name)
  ];

  // Filter out soft skills to ensure only technical requirements are used for matching
  const softSkillsSet = new Set(SOFT_SKILLS.map(s => s.toLowerCase()));
  const technicalRequirements = allDetectedSkills.filter(
    skill => !softSkillsSet.has(skill.toLowerCase())
  );

  return {
    id: apiJob.job_id,
    title: apiJob.job_title,
    description: apiJob.job_description,
    requirements: Array.from(new Set(technicalRequirements)), // Remove duplicates
    source: "api"
  };
}

/**
 * Normalizes an array of raw API job objects, filtering out invalid ones.
 * 
 * @param apiJobs Array of raw API jobs.
 * @param searchQuery The query string used to fetch these jobs.
 * @returns Array of normalized Job objects.
 */
export function normalizeApiJobs(apiJobs: ApiJob[], searchQuery: string = ""): Job[] {
  return apiJobs
    .map(job => normalizeApiJob(job, searchQuery))
    .filter((job): job is Job => job !== null);
}
