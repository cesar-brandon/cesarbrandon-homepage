"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
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

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export default function GitHubContributionCard({
  username = "cesar-brandon",
}: {
  username?: string;
}) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [stats, setStats] = useState({ commits: 0, prs: 0, issues: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);

        // Fetch user data
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`,
        );
        if (!userResponse.ok) {
          throw new Error(`GitHub user not found: ${username}`);
        }
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch contribution data (simplified for demo)
        // In a real app, you would need to use GitHub's GraphQL API to get detailed contribution data
        // This is a simplified version that generates mock data
        const today = new Date();
        const mockContributions = Array.from({ length: 365 }, (_, i) => {
          const date = new Date();
          date.setDate(today.getDate() - 365 + i);
          const count = Math.floor(Math.random() * 10);
          let level: 0 | 1 | 2 | 3 | 4 = 0;
          if (count > 0) level = 1;
          if (count > 2) level = 2;
          if (count > 5) level = 3;
          if (count > 8) level = 4;

          return {
            date: date.toISOString().split("T")[0],
            count,
            level,
          };
        });
        setContributions(mockContributions);

        // Mock stats data
        setStats({
          commits: 487,
          prs: 32,
          issues: 18,
        });

        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch GitHub data",
        );
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

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
          <div className="flex items-center justify-center h-40 text-center">
            <div>
              <p className="text-destructive text-lg font-medium">
                Error loading GitHub data
              </p>
              <p className="text-muted-foreground mt-2">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full lg:max-w-3xl rounded-3xl border-none">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <Tabs defaultValue="contributions">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="contributions" className="pt-4">
            {loading ? (
              <Skeleton className="h-[120px] w-full" />
            ) : (
              <div className="overflow-x-auto">
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
                            const contribution =
                              contributions[contributionIndex];
                            const bgColor = getColor(contribution?.level);

                            return (
                              <div
                                key={`day-${contributionIndex}`}
                                className={cn(
                                  "w-3 h-3 rounded-sm transition-colors",
                                  bgColor,
                                )}
                                title={
                                  contribution
                                    ? `${contribution.count} contributions on ${contribution.date}`
                                    : "No contributions"
                                }
                              />
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
                              getColor(level),
                            )}
                          />
                        ))}
                        <span>More</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="stats" className="pt-4">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Commits</p>
                      <p className="text-3xl font-bold mt-1">{stats.commits}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">
                        Pull Requests
                      </p>
                      <p className="text-3xl font-bold mt-1">{stats.prs}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Issues</p>
                      <p className="text-3xl font-bold mt-1">{stats.issues}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-3">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Repositories
                        </p>
                        <p className="text-xl font-medium mt-1">
                          {user?.public_repos || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Followers
                        </p>
                        <p className="text-xl font-medium mt-1">
                          {user?.followers || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Following
                        </p>
                        <p className="text-xl font-medium mt-1">
                          {user?.following || 0}
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
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
