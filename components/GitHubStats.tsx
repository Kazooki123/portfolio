/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { createGitHubStatsCache } from "@/lib/fetch-github";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PieChart, Pie, Cell } from "recharts";

const getGitHubStats = createGitHubStatsCache();

const GitHubStats = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        try {
          const data = await getGitHubStats('Kazooki123');
          setStats(data);
        } catch (error) {
          console.log('Trying alternate username...');
          const data = await getGitHubStats('KAZOOKIlovestocode');
          setStats(data);
        }
        setLoading(false);
      } catch (err) {
        console.error('GitHub Stats Error:', err);
        setError('Failed to fetch GitHub stats');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
          <Skeleton className="h-64 w-full mt-8" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <section className="py-12 bg-gradient-to-b from-background via-secondary/50 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center flex items-center justify-center gap-2">
          GitHub Activity <span className="text-2xl">📊</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              title: "Total Repositories",
              value: stats.totalRepos,
              icon: "📚",
            },
            { title: "Total Stars", value: stats.totalStars, icon: "⭐" },
            {
              title: "Total Contributions",
              value: stats.totalContributions,
              icon: "🔥",
            },
            { title: "Pull Requests", value: stats.pullRequests, icon: "🔄" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="backdrop-blur-md bg-black/70 border-none text-white hover:bg-black/80 transition-all duration-300"
            >
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm text-gray-400">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contribution Graph */}
          <Card className="backdrop-blur-md bg-black/70 border-none text-white">
            <CardHeader>
              <CardTitle>Contribution Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.contributionData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "none",
                        borderRadius: "4px",
                        color: "white",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="contributions"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ fill: "#8884d8" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Language Distribution */}
          <Card className="backdrop-blur-md bg-black/70 border-none text-white">
            <CardHeader>
              <CardTitle>Top Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.topLanguages}
                      dataKey="percentage"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(1)}%`
                      }
                    >
                      {stats.topLanguages.map((_: any, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "none",
                        borderRadius: "4px",
                        color: "white",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;