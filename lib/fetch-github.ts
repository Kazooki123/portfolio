/* eslint-disable @typescript-eslint/no-explicit-any */
interface GitHubRepo {
  name: string;
  stargazers_count: number;
  fork: boolean;
}

interface LanguageData {
  [key: string]: number;
}

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalContributions: number;
  pullRequests: number;
  contributionData: Array<{
    name: string;
    contributions: number;
  }>;
  topLanguages: Array<{
    name: string;
    percentage: number;
  }>;
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const GITHUB_API = 'https://api.github.com';
  
  try {
    // First, verify the user exists and get basic profile
    const userResponse = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (!userResponse.ok) {
      console.error('User fetch failed:', await userResponse.text());
      throw new Error(`Failed to fetch user data. Status: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    console.log('Found user:', userData.login); // Debug log

    // Get user repos with error handling
    const reposResponse = await fetch(
      `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    if (!reposResponse.ok) {
      console.error('Repos fetch failed:', await reposResponse.text());
      throw new Error(`Failed to fetch repos. Status: ${reposResponse.status}`);
    }

    const repos: GitHubRepo[] = await reposResponse.json();
    console.log(`Found ${repos.length} repositories`); // Debug log

    // Get pull requests with error handling
    const prsResponse = await fetch(
      `${GITHUB_API}/search/issues?q=author:${username}+type:pr`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    if (!prsResponse.ok) {
      console.error('PRs fetch failed:', await prsResponse.text());
      throw new Error(`Failed to fetch PRs. Status: ${prsResponse.status}`);
    }

    const prsData: { total_count: number } = await prsResponse.json();

    const eventsResponse = await fetch(
      `${GITHUB_API}/users/${username}/events/public`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    if (!eventsResponse.ok) {
      console.error('Events fetch failed:', await eventsResponse.text());
      throw new Error(`Failed to fetch events. Status: ${eventsResponse.status}`);
    }

    const events = await eventsResponse.json();
    
    // Generate mock contribution data based on events
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    const monthlyContributions: Record<string, number> = {};
    for (let d = new Date(sixMonthsAgo); d <= today; d.setMonth(d.getMonth() + 1)) {
      const month = d.toLocaleString('default', { month: 'short' });
      monthlyContributions[month] = 0;
    }

    events.forEach((event: any) => {
      const month = new Date(event.created_at).toLocaleString('default', { month: 'short' });
      if (monthlyContributions[month] !== undefined) {
        monthlyContributions[month]++;
      }
    });

    // Get language statistics with error handling
    const languageStats: LanguageData = {};
    for (const repo of repos) {
      if (repo.fork) continue;
      
      const langResponse = await fetch(
        `${GITHUB_API}/repos/${username}/${repo.name}/languages`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        }
      );

      if (!langResponse.ok) {
        console.warn(`Failed to fetch languages for ${repo.name}`);
        continue;
      }

      const langData: LanguageData = await langResponse.json();
      Object.entries(langData).forEach(([lang, bytes]) => {
        if (typeof bytes === 'number') {
          languageStats[lang] = (languageStats[lang] || 0) + bytes;
        }
      });
    }

    // Calculate totals
    const totalRepos = repos.filter(repo => !repo.fork).length;
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalContributions = Object.values(monthlyContributions).reduce((a, b) => a + b, 0);
    
    // Calculate language percentages
    const totalBytes = Object.values(languageStats).reduce((a, b) => a + b, 0);
    const topLanguages = Object.entries(languageStats)
      .map(([name, bytes]) => ({
        name,
        percentage: Number(((bytes / totalBytes) * 100).toFixed(1))
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    return {
      totalRepos,
      totalStars,
      totalContributions,
      pullRequests: prsData.total_count,
      contributionData: Object.entries(monthlyContributions).map(([name, contributions]) => ({
        name,
        contributions
      })),
      topLanguages
    };
  } catch (error) {
    console.error('GitHub API Error:', error);
    throw new Error(`Failed to fetch GitHub stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Cache helper to prevent excessive API calls
export function createGitHubStatsCache() {
  let cachedData: GitHubStats | null = null;
  let lastFetch: number = 0;
  const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

  return async (username: string): Promise<GitHubStats> => {
    const now = Date.now();
    if (cachedData && now - lastFetch < CACHE_DURATION) {
      return cachedData;
    }

    cachedData = await fetchGitHubStats(username);
    lastFetch = now;
    return cachedData;
  };
}