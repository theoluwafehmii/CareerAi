import { Job, jobs } from "./jobs-data";
import { Skill } from "./skill-extractor";
import { getRecommendationsForSkills, LearningResource } from "./learning-resources";

export interface JobMatch extends Job {
    matchScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    learningRecommendations?: LearningResource[];
}

/**
 * Normalizes a skill name for consistent comparison.
 */
function normalizeSkillName(name: string): string {
    return name.toLowerCase().trim();
}

/**
 * Matches user's extracted matched skills against a provided list of jobs.
 * 
 * @param userMatchedSkills Skills extracted from the user's resume.
 * @param jobList The list of jobs to match against (e.g., hybrid jobs).
 * @returns An array of ranked job recommendations with match details.
 */
export function matchJobs(userMatchedSkills: Skill[], jobList: Job[]): JobMatch[] {
    // Extract just the normalized names for comparison
    const userSkillNames = new Set(
        userMatchedSkills.map((s) => normalizeSkillName(s.name))
    );

    const results: JobMatch[] = jobList.map((job) => {
        const jobRequirements = job.requirements.map(normalizeSkillName);

        const matchedSkills: string[] = [];
        const missingSkills: string[] = [];

        jobRequirements.forEach((req) => {
            if (userSkillNames.has(req)) {
                matchedSkills.push(req);
            } else {
                missingSkills.push(req);
            }
        });

        // Calculate match score: (matched / total) * 100
        const totalRequirements = jobRequirements.length;
        const matchCount = matchedSkills.length;
        const matchScore = totalRequirements > 0
            ? Math.round((matchCount / totalRequirements) * 100)
            : 0;

        const learningRecommendations = getRecommendationsForSkills(missingSkills);

        return {
            ...job,
            matchScore,
            matchedSkills,
            missingSkills,
            learningRecommendations
        };
    });

    // 4. Filter out jobs with very weak matches (under 10%)
    const filteredMatches = results.filter((match) => match.matchScore >= 10);

    // 5. De-duplicate by title (preserve the one with the highest matchScore)
    const uniqueMatchesMap = new Map<string, JobMatch>();

    filteredMatches.forEach((match) => {
        const existing = uniqueMatchesMap.get(match.title);
        if (!existing || match.matchScore > existing.matchScore) {
            uniqueMatchesMap.set(match.title, match);
        }
    });

    // 6. Sort by score descending and limit to top 5
    return Array.from(uniqueMatchesMap.values())
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 5);
}
