'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CompetitionAPI, Competition, CompetitionStatus, Grade } from '@/lib/competitionAPI';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, Trophy, Users, MapPin, Search, Filter, X } from 'lucide-react';
import { formatCompetitionDate, formatCompetitionTime, getCompetitionStatus } from '@/lib/competitionAPI';

const CompetitionsPage: React.FC = () => {
  const router = useRouter();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    all: true,
    quiz: false,
    exam: false,
    challenge: false,
    tournament: false,
    grade9: false,
    grade10: false,
    grade11: false,
    grade12: false,
  });

  useEffect(() => {
    fetchCompetitions();
  }, [activeTab]);

  // Filter competitions based on search query and filters
  useEffect(() => {
    let filtered = competitions;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(competition =>
        competition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        competition.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        competition.competitionType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filters
    if (!filters.all) {
      filtered = filtered.filter(competition => {
        const typeConditions = [
          filters.quiz && competition.competitionType.toLowerCase().includes('quiz'),
          filters.exam && competition.competitionType.toLowerCase().includes('exam'),
          filters.challenge && competition.competitionType.toLowerCase().includes('challenge'),
          filters.tournament && competition.competitionType.toLowerCase().includes('tournament'),
        ];

        const gradeConditions = [
          filters.grade9 && competition.grade.toString().includes('9'),
          filters.grade10 && competition.grade.toString().includes('10'),
          filters.grade11 && competition.grade.toString().includes('11'),
          filters.grade12 && competition.grade.toString().includes('12'),
        ];

        return typeConditions.some(condition => condition) || gradeConditions.some(condition => condition);
      });
    }

    setFilteredCompetitions(filtered);
  }, [competitions, searchQuery, filters]);

  const handleFilterChange = (id: string) => {
    if (id === "all") {
      setFilters({
        all: true,
        quiz: false,
        exam: false,
        challenge: false,
        tournament: false,
        grade9: false,
        grade10: false,
        grade11: false,
        grade12: false,
      });
    } else {
      setFilters({
        ...filters,
        [id]: !filters[id as keyof typeof filters],
        all: false
      });
    }
  };

  const handleTagClick = (id: string) => {
    if (id === "all") {
      setFilters({
        all: true,
        quiz: false,
        exam: false,
        challenge: false,
        tournament: false,
        grade9: false,
        grade10: false,
        grade11: false,
        grade12: false,
      });
    } else if (id === "upcoming") {
      setActiveTab("upcoming");
    } else {
      setFilters({
        all: false,
        quiz: id === "quiz",
        exam: id === "exam",
        challenge: id === "challenge",
        tournament: id === "tournament",
        grade9: false,
        grade10: false,
        grade11: false,
        grade12: false,
      });
    }
  };

  // Filter categories for competitions
  const filterCategories = [
    {
      name: "Competition Types",
      items: [
        { id: "quiz", label: "Quiz", tag: "quiz" },
        { id: "exam", label: "Exam", tag: "exam" },
        { id: "challenge", label: "Challenge", tag: "challenge" },
        { id: "tournament", label: "Tournament", tag: "tournament" },
      ]
    },
    {
      name: "Grades",
      items: [
        { id: "grade9", label: "Grade 9", tag: "9" },
        { id: "grade10", label: "Grade 10", tag: "10" },
        { id: "grade11", label: "Grade 11", tag: "11" },
        { id: "grade12", label: "Grade 12", tag: "12" },
      ]
    }
  ];

  // Popular tags that appear at the top
  const popularTags = [
    { id: "all", label: "All Competitions" },
    { id: "upcoming", label: "Upcoming" },
    { id: "quiz", label: "Quiz" },
    { id: "tournament", label: "Tournament" },
  ];

  const fetchCompetitions = async () => {
    try {
      setLoading(true);
      setError(null);

      const status: 'upcoming' | 'active' | 'completed' | 'cancelled' | undefined = 
        activeTab === 'upcoming' ? 'upcoming' :
        activeTab === 'past' ? 'completed' :
        undefined;

      const response = await CompetitionAPI.getCompetitions({
        status,
      });

      if (response.success) {
        setCompetitions(response.competitions);
      } else {
        setError('Failed to fetch competitions');
      }
    } catch (err) {
      console.error('Error fetching competitions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch competitions');
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetail = (competitionId: string) => {
    router.push(`/competitions/${competitionId}`);
  };

  const getStatusColor = (competition: Competition) => {
    switch (competition.status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (competition: Competition) => {
    return competition.status.charAt(0).toUpperCase() + competition.status.slice(1);
  };

  const CompetitionCard: React.FC<{ competition: Competition }> = ({ competition }) => (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
            {competition.title}
          </CardTitle>
          <Badge className={`${getStatusColor(competition)} border-0 font-medium`}>
            {getStatusText(competition)}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
            Grade {competition.grade}
          </span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium capitalize">
            {competition.competitionType}
          </span>
        </div>
        <CardDescription className="text-gray-600 line-clamp-3">
          {competition.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="space-y-3">
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>
              {formatCompetitionDate(competition.startDate)} - {formatCompetitionDate(competition.endDate)}
            </span>
          </div>

          {/* Exam Count */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="w-4 h-4 text-green-500" />
            <span>{competition.examCount || 0} Exams</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>Online (Fayida Academy Platform)</span>
          </div>

          {/* Prizes */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-medium text-yellow-700">
              {competition.totalPrizes} Total Prizes
            </span>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Users className="w-4 h-4 text-purple-500" />
            <span>
              {competition.registrationCount} Participants
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={() => handleShowDetail(competition.id)}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
        >
          Show Details
        </Button>
      </CardFooter>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white relative">
        {/* Hero Section */}
        <section className="relative pt-20 bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center text-white pb-16 md:pt-24">
          <div className="container mx-auto px-6 z-10 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">Find Your Perfect Competition</h1>
              <p className="text-xl mb-8 text-white/90">Join exciting quiz tournaments and compete with students from across the country</p>

              <div className="bg-white rounded-2xl shadow-lg p-3 flex items-center">
                <Search className="ml-3 text-[#07705d]" size={20} />
                <input
                  type="text"
                  placeholder="Search for competitions..."
                  disabled
                  className="w-full px-4 py-3 text-gray-800 focus:outline-none bg-transparent text-lg"
                />
                <button className="ml-auto bg-[#bf8c13] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#bf8c13]/90 transition-all duration-200" disabled>
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/10 z-0"></div>
        </section>

        <div className="container mx-auto px-6 pb-16 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#07705d] mb-4">Quiz Competitions</h2>
            <p className="text-lg text-gray-600">Loading competitions...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-80 animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-gray-300 rounded w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white relative">
        {/* Hero Section */}
        <section className="relative pt-20 bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center text-white pb-16 md:pt-24">
          <div className="container mx-auto px-6 z-10 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">Find Your Perfect Competition</h1>
              <p className="text-xl mb-8 text-white/90">Join exciting quiz tournaments and compete with students from across the country</p>

              <div className="bg-white rounded-2xl shadow-lg p-3 flex items-center">
                <Search className="ml-3 text-[#07705d]" size={20} />
                <input
                  type="text"
                  placeholder="Search for competitions..."
                  disabled
                  className="w-full px-4 py-3 text-gray-800 focus:outline-none bg-transparent text-lg"
                />
                <button className="ml-auto bg-[#bf8c13] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#bf8c13]/90 transition-all duration-200" disabled>
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/10 z-0"></div>
        </section>

        <div className="container mx-auto px-6 pb-16 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#07705d] mb-4">Quiz Competitions</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-800 mb-4">{error}</p>
              <Button 
                onClick={fetchCompetitions}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Hero Section */}
      <section className="relative pt-20 bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center text-white pb-16 md:pt-24">
        <div className="container mx-auto px-6 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Find Your Perfect Competition</h1>
            <p className="text-xl mb-8 text-white/90">Join exciting quiz tournaments and compete with students from across the country</p>

            <div className="bg-white rounded-2xl shadow-lg p-3 flex items-center">
              <Search className="ml-3 text-[#07705d]" size={20} />
              <input
                type="text"
                placeholder="Search for competitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 text-gray-800 focus:outline-none bg-transparent text-lg"
              />
              <button className="ml-auto bg-[#bf8c13] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#bf8c13]/90 transition-all duration-200">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/10 z-0"></div>
      </section>

      {/* Quick Filter Tags */}
      <section className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {popularTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 border shadow-sm ${
                (tag.id === "all" && filters.all) || (tag.id === "upcoming" && activeTab === "upcoming") || 
                (tag.id !== "all" && tag.id !== "upcoming" && filters[tag.id as keyof typeof filters])
                  ? "bg-[#07705d] text-white border-[#07705d] shadow-md"
                  : "bg-white text-[#07705d] hover:bg-[#c7cc3f]/10 border-[#c7cc3f]"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-6 pb-16 relative z-10">
        {/* Search Results Counter */}
        {searchQuery && (
          <div className="mb-6 text-center">
            <p className="text-lg text-[#07705d] font-medium">
              {filteredCompetitions.length} competition{filteredCompetitions.length !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        )}

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#07705d]">
            {loading ? "Loading competitions..." : `${filteredCompetitions.length} competitions found`}
          </h2>
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#c7cc3f] shadow-sm text-[#07705d] hover:bg-[#c7cc3f]/10 transition-colors"
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        {/* Mobile Filter Drawer */}
        <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity lg:hidden ${mobileFiltersOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <div className={`absolute right-0 top-0 h-full bg-white w-80 transition-transform shadow-xl ${mobileFiltersOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-[#07705d]">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 text-gray-500 hover:text-[#bf8c13] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {filterCategories.map((category, idx) => (
                  <div key={idx} className="border-b border-[#c7cc3f]/30 pb-6 last:border-0">
                    <h4 className="font-medium mb-4 text-[#07705d]">{category.name}</h4>
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <Checkbox
                            id={`mobile-${item.id}`}
                            checked={filters[item.id as keyof typeof filters]}
                            onCheckedChange={() => handleFilterChange(item.id)}
                            className="data-[state=checked]:bg-[#07705d] data-[state=checked]:border-[#07705d]"
                          />
                          <label htmlFor={`mobile-${item.id}`} className="ml-2 text-sm text-gray-700">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full mt-6 bg-[#07705d] text-white py-3 rounded-xl hover:bg-[#07705d]/90 transition-colors font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#c7cc3f]/30 sticky top-24">
              <h3 className="text-lg font-semibold mb-4 text-[#07705d]">Filters</h3>

              <div className="space-y-6">
                <div className="pb-4 border-b border-[#c7cc3f]/30">
                  <div className="flex items-center mb-2">
                    <Checkbox
                      id="filter-all"
                      checked={filters.all}
                      onCheckedChange={() => handleFilterChange("all")}
                      className="data-[state=checked]:bg-[#07705d] data-[state=checked]:border-[#07705d]"
                    />
                    <label htmlFor="filter-all" className="ml-2 text-sm font-medium text-[#07705d]">
                      All Competitions
                    </label>
                  </div>
                </div>

                {filterCategories.map((category, idx) => (
                  <div key={idx} className="pb-4 border-b border-[#c7cc3f]/30 last:border-0">
                    <h4 className="font-medium mb-4 text-[#07705d]">{category.name}</h4>
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <Checkbox
                            id={`filter-${item.id}`}
                            checked={filters[item.id as keyof typeof filters]}
                            onCheckedChange={() => handleFilterChange(item.id)}
                            className="data-[state=checked]:bg-[#07705d] data-[state=checked]:border-[#07705d]"
                          />
                          <label htmlFor={`filter-${item.id}`} className="ml-2 text-sm text-gray-700">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Competitions Grid */}
          <div className="flex-1">
            <div className="mb-6 hidden lg:flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#07705d]">
                {loading ? "Loading competitions..." : `${filteredCompetitions.length} competitions found`}
              </h2>
            </div>

        {/* Tabs for filtering */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-white border shadow-sm">
              <TabsTrigger 
                value="upcoming" 
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white font-medium"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger 
                value="past"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white font-medium"
              >
                Past
              </TabsTrigger>
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white font-medium"
              >
                All
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-8">
              {filteredCompetitions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCompetitions.map((competition) => (
                    <CompetitionCard key={competition.id} competition={competition} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {searchQuery ? 'No competitions found' : 'No Upcoming Competitions'}
                  </h3>
                  <p className="text-gray-500">
                    {searchQuery ? 'Try adjusting your search criteria' : 'Check back soon for exciting new quiz tournaments!'}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-8">
              {filteredCompetitions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCompetitions.map((competition) => (
                    <CompetitionCard key={competition.id} competition={competition} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {searchQuery ? 'No competitions found' : 'No Past Competitions'}
                  </h3>
                  <p className="text-gray-500">
                    {searchQuery ? 'Try adjusting your search criteria' : 'Past competitions will appear here after they conclude.'}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="all" className="mt-8">
              {filteredCompetitions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCompetitions.map((competition) => (
                    <CompetitionCard key={competition.id} competition={competition} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {searchQuery ? 'No competitions found' : 'No Competitions Available'}
                  </h3>
                  <p className="text-gray-500">
                    {searchQuery ? 'Try adjusting your search criteria' : 'Competitions will appear here when they become available.'}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionsPage;
