"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, GitPullRequest, GitCommit, GitBranch, Star, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  stargazers_count?: number;
  watchers_count?: number;
}

interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionWeek {
  contributionDays: {
    date: string;
    contributionCount: number;
    contributionLevel: string;
  }[];
}

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hora

interface CacheData {
  timestamp: number;
  data: any;
}

const cache: { [key: string]: CacheData } = {};

export default function GitHubContributionCard({
  username = "cesar-brandon",
}: {
  username?: string;
}) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [stats, setStats] = useState({ 
    commits: 0, 
    prs: 0, 
    issues: 0,
    stargazers: 0,
    watchers: 0,
    branches: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("contributions");

  const fetchWithCache = useCallback(async (key: string, query: string, variables: any) => {
    const now = Date.now();
    if (cache[key] && now - cache[key].timestamp < CACHE_DURATION) {
      return cache[key].data;
    }

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub data');
    }

    const data = await response.json();
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    cache[key] = {
      timestamp: now,
      data: data.data
    };

    return data.data;
  }, []);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchWithCache(
          `github-data-${username}`,
          `
          query($username: String!) {
            user(login: $username) {
              name
              login
              avatarUrl
              url
              bio
              repositories(first: 100) {
                totalCount
                nodes {
                  stargazerCount
                  watchers {
                    totalCount
                  }
                  defaultBranchRef {
                    name
                  }
                }
              }
              followers {
                totalCount
              }
              following {
                totalCount
              }
              contributionsCollection {
                totalCommitContributions
                totalPullRequestContributions
                totalIssueContributions
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      contributionLevel
                    }
                  }
                }
              }
            }
          }
          `,
          { username }
        );

        const userData = data.user;
        
        // Calcular estadísticas adicionales
        const stargazers = userData.repositories.nodes.reduce(
          (sum: number, repo: any) => sum + repo.stargazerCount,
          0
        );
        const watchers = userData.repositories.nodes.reduce(
          (sum: number, repo: any) => sum + repo.watchers.totalCount,
          0
        );
        const branches = userData.repositories.nodes.filter(
          (repo: any) => repo.defaultBranchRef
        ).length;

        setUser({
          name: userData.name,
          login: userData.login,
          avatar_url: userData.avatarUrl,
          html_url: userData.url,
          bio: userData.bio,
          public_repos: userData.repositories.totalCount,
          followers: userData.followers.totalCount,
          following: userData.following.totalCount,
          stargazers_count: stargazers,
          watchers_count: watchers
        });

        const contributionData = userData.contributionsCollection.contributionCalendar.weeks
          .flatMap((week: ContributionWeek) => week.contributionDays)
          .map((day: { date: string; contributionCount: number; contributionLevel: string }) => ({
            date: day.date,
            count: day.contributionCount,
            level: day.contributionLevel === 'NONE' ? 0 :
                   day.contributionLevel === 'FIRST_QUARTILE' ? 1 :
                   day.contributionLevel === 'SECOND_QUARTILE' ? 2 :
                   day.contributionLevel === 'THIRD_QUARTILE' ? 3 : 4
          }));

        setContributions(contributionData);

        setStats({
          commits: userData.contributionsCollection.totalCommitContributions,
          prs: userData.contributionsCollection.totalPullRequestContributions,
          issues: userData.contributionsCollection.totalIssueContributions,
          stargazers,
          watchers,
          branches
        });

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch GitHub data");
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username, fetchWithCache]);

  const getColor = (level: number) => {
    const colors: { [key: number]: string } = {
      0: "bg-muted",
      1: "bg-primary/20",
      2: "bg-primary/40",
      3: "bg-primary/60",
      4: "bg-primary",
    };
    return colors[level] || colors[0];
  };

  if (error) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center h-40 text-center"
          >
            <div>
              <p className="text-destructive text-lg font-medium">
                Error loading GitHub data
              </p>
              <p className="text-muted-foreground mt-2">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full lg:max-w-3xl rounded-3xl border-none">
      <CardHeader className="pb-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          {loading ? (
            <>
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-3 w-[100px]" />
                </div>
              </div>
              <Skeleton className="h-8 w-[100px]" />
            </>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={user?.avatar_url}
                    alt={user?.name || username}
                  />
                  <AvatarFallback>
                    {username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">
                    {user?.name || username}
                  </CardTitle>
                  <CardDescription>
                    <a
                      href={user?.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      @{username}
                    </a>
                  </CardDescription>
                </div>
              </div>
              <Badge
                variant="outline"
                className="self-start md:self-center px-3 py-1"
              >
                <Calendar className="mr-1 h-3 w-3" />
                {contributions.reduce((sum, day) => sum + day.count, 0)}{" "}
                contributions
              </Badge>
            </>
          )}
        </motion.div>
      </CardHeader>

      <CardContent className="pt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="contributions" className="pt-4">
              {loading ? (
                <Skeleton className="h-[120px] w-full" />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-x-auto"
                >
                  <div className="contribution-calendar min-w-[640px]">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-end mb-1 text-xs text-muted-foreground">
                        <div className="w-8 text-center">Mon</div>
                        <div className="w-8 text-center">Wed</div>
                        <div className="w-8 text-center">Fri</div>
                      </div>
                      <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-1">
                        {Array.from({ length: 53 }).map((_, weekIndex) => (
                          <div
                            key={`week-${weekIndex}`}
                            className="flex flex-col gap-1"
                          >
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                              const contributionIndex = weekIndex * 7 + dayIndex;
                              const contribution = contributions[contributionIndex];
                              const bgColor = getColor(contribution?.level);

                              return (
                                <TooltipProvider key={`day-${contributionIndex}`}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: contributionIndex * 0.001 }}
                                        className={cn(
                                          "w-3 h-3 rounded-sm transition-colors hover:scale-110",
                                          bgColor
                                        )}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      {contribution
                                        ? `${contribution.count} contributions on ${contribution.date}`
                                        : "No contributions"}
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1 ml-2">
                          <span>Less</span>
                          {[0, 1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={cn(
                                "w-3 h-3 rounded-sm",
                                getColor(level)
                              )}
                            />
                          ))}
                          <span>More</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="stats" className="pt-4">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <GitCommit className="mx-auto h-5 w-5 text-muted-foreground" />
                        <p className="text-muted-foreground text-sm mt-2">Commits</p>
                        <p className="text-3xl font-bold mt-1">{stats.commits}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <GitPullRequest className="mx-auto h-5 w-5 text-muted-foreground" />
                        <p className="text-muted-foreground text-sm mt-2">
                          Pull Requests
                        </p>
                        <p className="text-3xl font-bold mt-1">{stats.prs}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <GitBranch className="mx-auto h-5 w-5 text-muted-foreground" />
                        <p className="text-muted-foreground text-sm mt-2">Issues</p>
                        <p className="text-3xl font-bold mt-1">{stats.issues}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-3">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <Star className="mx-auto h-5 w-5 text-muted-foreground" />
                          <p className="text-muted-foreground text-sm mt-2">
                            Stars
                          </p>
                          <p className="text-xl font-medium mt-1">
                            {stats.stargazers}
                          </p>
                        </div>
                        <div>
                          <Eye className="mx-auto h-5 w-5 text-muted-foreground" />
                          <p className="text-muted-foreground text-sm mt-2">
                            Watchers
                          </p>
                          <p className="text-xl font-medium mt-1">
                            {stats.watchers}
                          </p>
                        </div>
                        <div>
                          <GitBranch className="mx-auto h-5 w-5 text-muted-foreground" />
                          <p className="text-muted-foreground text-sm mt-2">
                            Branches
                          </p>
                          <p className="text-xl font-medium mt-1">
                            {stats.branches}
                          </p>
                        </div>
                      </div>

                      {user?.bio && (
                        <div className="mt-6 pt-6 border-t">
                          <p className="text-muted-foreground text-sm mb-2">
                            Bio
                          </p>
                          <p>{user.bio}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </CardContent>
    </Card>
  );
}
