import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const what = searchParams.get('what') || 'developer';
  
  const adzunaAppId = process.env.ADZUNA_APP_ID;
  const adzunaAppKey = process.env.ADZUNA_APP_KEY;
  const joobleApiKey = process.env.JOOBLE_API_KEY;

  let allJobs: any[] = [];

  // 1. Fetch from Adzuna
  const fetchAdzuna = async () => {
    if (!adzunaAppId || !adzunaAppKey) return [];
    
    const response = await fetch(
      `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${adzunaAppId}&app_key=${adzunaAppKey}&results_per_page=20&what=${encodeURIComponent(what)}`,
      { cache: 'no-store' }
    );

    if (!response.ok) throw new Error(`Adzuna API status: ${response.status}`);
    const data = await response.json();
    
    return (data.results || []).map((adzunaJob: any) => {
      let salary_range = "Not specified";
      if (adzunaJob.salary_min && adzunaJob.salary_max) {
        salary_range = `$${adzunaJob.salary_min.toLocaleString()} - $${adzunaJob.salary_max.toLocaleString()}`;
      } else if (adzunaJob.salary_min) {
        salary_range = `From $${adzunaJob.salary_min.toLocaleString()}`;
      }
      
      return {
        job_id: `adzuna-${adzunaJob.id}`,
        job_title: adzunaJob.title,
        company_name: adzunaJob.company?.display_name || "Unknown Company",
        location: adzunaJob.location?.display_name || "Remote",
        employment_type: adzunaJob.contract_time === "full_time" ? "Full-time" : (adzunaJob.contract_time || "Full-time"),
        job_description: adzunaJob.description || "",
        salary_range: salary_range
      };
    });
  };

  // 2. Fetch from Jooble
  const fetchJooble = async () => {
    if (!joobleApiKey) return [];

    const response = await fetch(`https://jooble.org/api/${joobleApiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords: what, location: "Remote", page: "1" }),
      cache: "no-store"
    });

    if (!response.ok) throw new Error(`Jooble API status: ${response.status}`);
    const data = await response.json();

    return (data.jobs || []).map((joobleJob: any) => {
      return {
        job_id: `jooble-${joobleJob.id}`,
        job_title: joobleJob.title,
        company_name: joobleJob.company || "Unknown Company",
        location: joobleJob.location || "Remote",
        employment_type: joobleJob.type || "Full-time",
        // remove HTML tags from snippet if any
        job_description: joobleJob.snippet?.replace(/<[^>]*>?/gm, '') || "",
        salary_range: joobleJob.salary || "Not specified"
      };
    });
  };

  try {
    // Run all fetches concurrently
    const results = await Promise.allSettled([fetchAdzuna(), fetchJooble()]);

    // Aggregate successful results
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        allJobs = [...allJobs, ...result.value];
      } else {
        console.error("One of the job APIs failed:", result.reason);
      }
    });

    // If both failed and we have no credentials, we still return whatever we got (maybe empty array)
    return NextResponse.json(allJobs);
  } catch (error) {
    console.error("Error orchestrating API jobs fetch:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

