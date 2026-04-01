import { jobs as localJobs, Job } from "./jobs-data";
import { normalizeApiJobs, ApiJob } from "./api-job-normalizer";

/**
 * Fetches raw jobs from the internal/mock API.
 * @returns An array of raw ApiJob objects.
 */
async function fetchApiJobs(): Promise<ApiJob[]> {
  try {
    const response = await fetch("/api/jobs", {
      cache: "no-store", // Ensure we get fresh data
    });

    if (!response.ok) {
      throw new Error(`API fetch failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching API jobs:", error);
    return [];
  }
}

/**
 * Deduplicates jobs based on job title (case-insensitive).
 * Keeps the job with more requirements, or a longer description,
 * falling back to the first occurrence if tied.
 */
function deduplicateJobs(jobsList: Job[]): Job[] {
  const jobMap = new Map<string, Job>();

  for (const job of jobsList) {
    const titleKey = job.title.toLowerCase().trim();
    const existing = jobMap.get(titleKey);

    if (!existing) {
      jobMap.set(titleKey, job);
      continue;
    }

    // Better version rule 1: more complete requirements
    if (job.requirements.length > existing.requirements.length) {
      jobMap.set(titleKey, job);
      continue;
    } else if (job.requirements.length < existing.requirements.length) {
      continue;
    }

    // Better version rule 2: richer description
    if (job.description.length > existing.description.length) {
      jobMap.set(titleKey, job);
      continue;
    }
    
    // Default: keep the first occurrence (existing)
  }

  return Array.from(jobMap.values());
}

/**
 * Provides a unified list of jobs from both local and API sources.
 * This is the primary entry point for jobs in CareerAI.
 * 
 * @returns A promise that resolves to a combined list of normalized Jobs.
 */
export async function getHybridJobs(): Promise<Job[]> {
  // Always include local jobs with their source labeled
  const normalizedLocalJobs: Job[] = localJobs.map(job => ({
    ...job,
    source: "local"
  }));

  try {
    // Attempt to fetch and normalize API jobs
    const rawApiJobs = await fetchApiJobs();
    
    if (rawApiJobs.length === 0) {
      return deduplicateJobs(normalizedLocalJobs);
    }

    const normalizedApiJobs = normalizeApiJobs(rawApiJobs);

    // Merge both sources and deduplicate
    const mergedJobs = [...normalizedLocalJobs, ...normalizedApiJobs];
    return deduplicateJobs(mergedJobs);
  } catch (error) {
    // If anything fails during fetching or normalization, return only local jobs
    console.error("Hybrid job source encountered an error, falling back to local jobs:", error);
    return deduplicateJobs(normalizedLocalJobs);
  }
}
