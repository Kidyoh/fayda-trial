"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useUIStore } from "@/store/uiStore";
import { Competition } from "@/data/competitions";
import { competitionsMock } from "@/data/competitions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, Trophy, Users, Search, Filter } from "lucide-react";

export default function CompetitionsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addNotification } = useUIStore();

  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "all">(
    "upcoming",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real app, this would come from API
  const competitions = competitionsMock;

  const filteredCompetitions = useMemo(() => {
    let filtered = competitions;

    // Filter by tab
    const now = new Date();
    if (activeTab === "upcoming") {
      filtered = filtered.filter((comp) => new Date(comp.startTime) > now);
    } else if (activeTab === "past") {
      filtered = filtered.filter((comp) => new Date(comp.endTime) < now);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((comp) =>
        comp.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by grade
    if (selectedGrade !== "all") {
      filtered = filtered.filter(
        (comp) => comp.grade === parseInt(selectedGrade),
      );
    }

    return filtered;
  }, [competitions, activeTab, searchQuery, selectedGrade]);

  const getCompetitionStatus = (competition: Competition) => {
    const now = new Date();
    const startTime = new Date(competition.startTime);
    const endTime = new Date(competition.endTime);

    if (now < startTime) return "upcoming";
    if (now >= startTime && now <= endTime) return "active";
    return "ended";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="secondary">Upcoming</Badge>;
      case "active":
        return (
          <Badge variant="default" className="bg-green-500">
            Live
          </Badge>
        );
      case "ended":
        return <Badge variant="outline">Ended</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleJoinCompetition = (competitionId: string) => {
    if (!isAuthenticated) {
      addNotification({
        type: "error",
        message: "Please log in to join competitions",
      });
      return;
    }
    router.push(`/competitions/${competitionId}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            Please log in to view competitions.
          </p>
          <Button asChild>
            <a href="/login">Sign In</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Competitions
          </h1>
          <p className="text-gray-600">
            Test your knowledge and compete with other students
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search competitions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c7cc3f]"
              >
                <option value="all">All Grades</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-8 w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : filteredCompetitions.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No competitions found
                </h3>
                <p className="text-gray-600">
                  {searchQuery || selectedGrade !== "all"
                    ? "Try adjusting your search criteria"
                    : "No competitions available at the moment"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompetitions.map((competition) => {
                  const status = getCompetitionStatus(competition);
                  return (
                    <Card
                      key={competition.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {competition.title}
                            </CardTitle>
                            <CardDescription>
                              Grade {competition.grade} • {competition.entryFee}{" "}
                              ETB
                            </CardDescription>
                          </div>
                          {getStatusBadge(status)}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>
                              {new Date(
                                competition.startTime,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>
                              {new Date(
                                competition.startTime,
                              ).toLocaleTimeString()}{" "}
                              -
                              {new Date(
                                competition.endTime,
                              ).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Trophy className="w-4 h-4 mr-2" />
                            <span>Prize: {competition.prizePool} ETB</span>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter>
                        <Button
                          onClick={() => handleJoinCompetition(competition.id)}
                          className="w-full"
                          disabled={status === "ended"}
                        >
                          {status === "ended"
                            ? "Competition Ended"
                            : "Join Competition"}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
