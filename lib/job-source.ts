import { jobs as localJobs, Job } from "./jobs-data";

/**
 * Returns the local mock jobs, simulating an API response.
 * We removed the external APIs (Adzuna/Jooble) as requested.
 * 
 * @returns A promise that resolves to a list of Jobs.
 */
export async function getHybridJobs(query: string = ""): Promise<Job[]> {
  const normalizedLocalJobs: Job[] = localJobs.map(job => ({
    ...job,
    source: "local"
  }));

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return normalizedLocalJobs;
}
