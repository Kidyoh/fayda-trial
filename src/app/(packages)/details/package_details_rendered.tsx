"use client";
import { apiUrl } from "@/apiConfig";
import useFetchStore from "@/app/store/fetchStore";
import DeletePackageReview from "@/components/custom_components/delete_review";
import PackageReviewForm from "@/components/custom_components/packageReviewForm";
import { PurchaseDialogCustom } from "@/components/custom_components/purchaseDialong";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAccessToken } from "@/lib/tokenManager";
import {
  Book,
  Check,
  ChevronRight,
  Clock,
  FileText,
  Heart,
  Lock,
  MessageSquare,
  Play,
  ScrollText,
  Shield,
  Star,
  StickyNote,
  TagIcon,
  TrendingUp,
  User,
  Users,
  Youtube,
  RotateCcw,
  Monitor,
  Trophy,
  HelpCircle,
  BookOpen,
  CheckCircle
} from "lucide-react";
import { PackageAddToCartButton } from "@/components/cart/AddToCartButton";
import Link from "next/link";
import { useEffect, useState } from "react";

// Create a Skeleton component for loading state with Ethiopian colors
const Skeleton = ({ className = "" }) => {
  return <div className={`animate-pulse bg-gradient-to-r from-[#c7cc3f]/20 to-[#bf8c13]/20 rounded ${className}`} />;
};

export default function PackageDetailsRendered(props: any) {
  const PackageId = props.package_id;
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>([]);
  const [tagChosen, setTagChosen] = useState("");
  const [activeTab, setActiveTab] = useState("info");
  const [hasPurchased, setHasPurchased] = useState(false);
  const [purchasedPackages, setPurchasedPackages] = useState<any[]>([]);

  const accessToken = getAccessToken();

  const fetchPackagesReview = useFetchStore(
    (state) => state.fetchPackageReview
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/packages/${PackageId}`, {
          credentials: "include",
        });

        const jsonData = await response.json();
        setData(jsonData);

        // Map tag values to URL slugs
        const tagMap = {
          "Computer": "computer",
          "Language": "language",
          "Art Litrature": "artlitrature",
          "Other": "other",
          "Grade 9": "grade9",
          "Grade 10": "grade10",
          "Grade 11": "grade11",
          "Grade 12": "grade12"
        };

        setTagChosen(tagMap[jsonData.tag] || "");
        console.log("Package data:", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [PackageId, fetchPackagesReview]);

  useEffect(() => {
    fetch(`${apiUrl}/newlogin/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [accessToken]);

  // Check if user has purchased this package
  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (!accessToken || !PackageId) return;
      
      try {
        const response = await fetch(`${apiUrl}/purchaselist/getpuchasedlist`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const purchasedList = await response.json();
          setPurchasedPackages(purchasedList);
          
          // Check if current package is in the purchased list
          // Based on the dashboard code, purchased packages have 'packagesId', 'packageId', or 'id' fields
          const isPurchased = purchasedList.some((pkg: any) => {
            const purchasedPackageId = pkg.packagesId || pkg.packageId || pkg.id;
            const currentPackageId = PackageId;
            
            // Only consider it purchased if the IDs match AND the payment is active or completed
            const idsMatch = purchasedPackageId?.toString() === currentPackageId?.toString();
            const paymentActive = !pkg.paymentStatus || pkg.paymentStatus === "active" || pkg.paymentStatus === "completed";
            
            return idsMatch && paymentActive;
          });
          
          setHasPurchased(isPurchased);
        }
      } catch (error) {
        console.error("Error checking purchase status:", error);
      }
    };

    checkPurchaseStatus();
  }, [accessToken, PackageId]);

  // Calculate total course units and materials
  const totalUnits = data?.courses?.reduce((acc, course) => acc + parseInt(course.parts || 0), 0) || 0;
  const totalMaterials = data?.courses?.reduce((acc, course) => acc + (course.materials?.length || 0), 0) || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#c7cc3f]/5 via-white to-[#bf8c13]/5">
        <div className="container mx-auto px-4 py-12 pt-8 md:pt-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-64 w-full rounded-2xl" />
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-48 w-full rounded-2xl" />
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-80 w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c7cc3f]/5 via-white to-[#bf8c13]/5 relative">

      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="ethiopian-bg" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
              <polygon points="12.5,0 25,12.5 12.5,25 0,12.5" fill="#bf8c13" opacity="0.3" />
              <circle cx="12.5" cy="12.5" r="4" fill="#07705d" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ethiopian-bg)" />
        </svg>
      </div>

      <div className="container mx-auto px-0 md:px-4 pt-20 md:pt-24 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-8 border border-[#c7cc3f]/20 mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-Sendako text-[#07705d] mb-4 leading-tight">
                  {data?.packageName}
                </h1>

                {/* <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#bf8c13] to-[#c7cc3f] text-white text-sm font-semibold">
                    <TagIcon className="h-4 w-4 mr-2" />
                    {data?.tag}
                  </span>
                  <div className="flex items-center text-gray-600 text-sm bg-[#c7cc3f]/10 px-3 py-2 rounded-lg">
                    <Book className="h-4 w-4 mr-2 text-[#07705d]" />
                    {data?.courses?.length || 0} Courses
                  </div>
                  <div className="flex items-center text-gray-600 text-sm bg-[#bf8c13]/10 px-3 py-2 rounded-lg">
                    <Clock className="h-4 w-4 mr-2 text-[#bf8c13]" />
                    {totalUnits} Units
                  </div>
                  <div className="flex items-center text-gray-600 text-sm bg-[#07705d]/10 px-3 py-2 rounded-lg">
                    <Users className="h-4 w-4 mr-2 text-[#07705d]" />
                    {totalMaterials} Materials
                  </div>
                </div> */}


              </div>

              <div>
                <div className="mb-8">
                 
                  <div className="rounded-2xl overflow-hidden border border-[#c7cc3f]/30 bg-gradient-to-r from-[#c7cc3f]/10 to-[#bf8c13]/10">
                    <video
                      controls
                      src="/course.mp4"
                      className="w-full h-64 md:h-96 object-cover"
                      poster={data?.imgUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-2xl overflow-hidden">
                <Tabs
                  defaultValue="info"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="flex w-full h-auto rounded-2xl bg-primaryColor/10">
                    <TabsTrigger
                      value="info"
                      className="flex-1 py-3 rounded-xl text-gray-600 font-semibold data-[state=active]:text-[#07705d] data-[state=active]:border-b-3 data-[state=active]:border-[#07705d] transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-2" />
                        Overview
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="content"
                      className="flex-1 py-3 rounded-2xl text-gray-600 font-semibold data-[state=active]:text-[#07705d] data-[state=active]:border-b-3 data-[state=active]:border-[#07705d] transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <Book className="h-4 w-4 mr-2" />
                        Curriculum
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="review"
                      className="flex-1 py-3 rounded-2xl text-gray-600 font-semibold data-[state=active]:text-[#07705d] data-[state=active]:border-b-3 data-[state=active]:border-[#07705d] transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Reviews
                      </div>
                    </TabsTrigger>
                  </TabsList>

                  {/* Package Info Tab */}
                  <TabsContent value="info" className="p-2 md:p-8">
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-2xl font- mb-4 text-[#07705d] font-Sendako flex items-center">
                          <Star className="h-6 w-6 mr-3 text-[#bf8c13]" />
                          Package Description
                        </h2>
                        <div className="bg-gradient-to-r from-[#c7cc3f]/5 to-[#bf8c13]/5 rounded-xl p-6 border border-[#c7cc3f]/20">
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {data?.packageDescription}
                          </p>
                        </div>
                      </div>

                      {/* Enhanced Stats Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                        {/* Courses Stat */}
                        <div className="bg-gradient-to-br from-[#07705d]/10 to-[#07705d]/5 p-6 rounded-2xl border border-[#07705d]/20 transition-all duration-300 group hover:shadow-lg">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#07705d] to-[#bf8c13] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                              <Book className="h-7 w-7 text-white" />
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-bold text-[#07705d] block">{data?.courses?.length || 0}</span>
                              <span className="text-xs text-gray-500 uppercase tracking-wide">Total</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-[#07705d] font-semibold text-lg mb-1">Courses</h4>
                            <p className="text-gray-600 text-sm">Comprehensive learning paths</p>
                          </div>
                        </div>

                        {/* Units Stat */}
                        <div className="bg-gradient-to-br from-[#bf8c13]/10 to-[#bf8c13]/5 p-6 rounded-2xl border border-[#bf8c13]/20 transition-all duration-300 group hover:shadow-lg">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#bf8c13] to-[#c7cc3f] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                              <TrendingUp className="h-7 w-7 text-white" />
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-bold text-[#bf8c13] block">{totalUnits}</span>
                              <span className="text-xs text-gray-500 uppercase tracking-wide">Units</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-[#bf8c13] font-semibold text-lg mb-1">Learning Units</h4>
                            <p className="text-gray-600 text-sm">Structured learning modules</p>
                          </div>
                        </div>

                        {/* Materials Stat */}
                        <div className="bg-gradient-to-br from-[#c7cc3f]/10 to-[#c7cc3f]/5 p-6 rounded-2xl border border-[#c7cc3f]/20 transition-all duration-300 group hover:shadow-lg">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#c7cc3f] to-[#bf8c13] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                              <ScrollText className="h-7 w-7 text-white" />
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-bold text-[#c7cc3f] block">{totalMaterials}</span>
                              <span className="text-xs text-gray-500 uppercase tracking-wide">Items</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-[#c7cc3f] font-semibold text-lg mb-1">Study Materials</h4>
                            <p className="text-gray-600 text-sm">Videos, docs & assessments</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Curriculum Tab */}
                  <TabsContent value="content" className="p-2 md:p-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-[#07705d] flex items-center">
                        <Book className="h-6 w-6 mr-3 text-[#bf8c13]" />
                        Course Curriculum
                      </h2>
                      <div className="space-y-6">
                        {data.courses?.map((course: any, courseIndex: number) => (
                          <Accordion
                            key={course.id || courseIndex}
                            type="single"
                            collapsible
                            className="border border-[#c7cc3f]/30 rounded-2xl overflow-hidden bg-white"
                          >
                            <AccordionItem value={course.id || `course-${courseIndex}`} className="border-0">
                              <AccordionTrigger className="px-6 py-4 hover:bg-gradient-to-r hover:from-[#c7cc3f]/10 hover:to-[#bf8c13]/10 hover:no-underline">
                                <div className="flex justify-between w-full items-center">
                                  <div className="flex items-center">
                                    <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#07705d] to-[#bf8c13] text-white mr-4 font-bold text-lg">
                                      {courseIndex + 1}
                                    </div>
                                    <div className="text-left">
                                      <h3 className="font-bold text-[#07705d] text-lg">{course?.courseName}</h3>
                                      <p className="text-sm text-[#bf8c13] font-medium">{course?.parts} units • {course?.materials?.length || 0} materials</p>
                                    </div>
                                  </div>
                                </div>
                              </AccordionTrigger>

                              <AccordionContent className="px-2 md:px-6 py-4 bg-gradient-to-r from-[#c7cc3f]/5 to-[#bf8c13]/5">
                                <div className="mb-6 p-4 bg-white rounded-xl border border-[#c7cc3f]/20">
                                  <h4 className="font-semibold text-[#07705d] mb-2">Course Description</h4>
                                  <p className="text-gray-700 leading-relaxed capitalize">{course?.courseDescription}</p>
                                </div>

                                <div className="space-y-6">
                                  {Array.from(
                                    { length: parseInt(course?.parts || "0", 10) || 0 },
                                    (_, unitIndex) => {
                                      // Get all materials for this specific unit, ensure part is a string for comparison
                                      const unitMaterials = course?.materials?.filter(
                                        (material: any) => material?.part && material?.part.toString() === (unitIndex + 1).toString()
                                      ) || [];

                                      // Safely get the unit title with fallback
                                      let unitTitle = "Unit " + (unitIndex + 1);
                                      try {
                                        if (course?.CourseUnitsList &&
                                          Array.isArray(course.CourseUnitsList) &&
                                          course.CourseUnitsList[unitIndex] &&
                                          course.CourseUnitsList[unitIndex].Title) {
                                          unitTitle = course.CourseUnitsList[unitIndex].Title;
                                        }
                                      } catch (e) {
                                        console.error("Error accessing unit title:", e);
                                      }

                                      return (
                                        <div key={unitIndex} className="bg-white rounded-xl p-2 md:p-6 border border-[#c7cc3f]/20">
                                          <h4 className="text-lg font-bold text-[#07705d] mb-4 flex items-center">
                                            <span className="h-8 w-8 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#bf8c13] to-[#c7cc3f] text-white mr-3 text-sm font-bold">
                                              {unitIndex + 1}
                                            </span>
                                            Unit {unitIndex + 1}{unitTitle !== `Unit ${unitIndex + 1}` ? `: ${unitTitle}` : ""}
                                          </h4>

                                          {unitMaterials.length > 0 ? (
                                            <ul className="space-y-3 bg-gradient-to-r from-[#c7cc3f]/5 to-[#bf8c13]/5 rounded-xl p-1 md:p-4 border border-[#c7cc3f]/20">
                                              {unitMaterials.map((material: any, materialIndex: number) => {
                                                const materialType = material?.materialType;
                                                let icon = <FileText size={16} />;
                                                let label = "Resource";
                                                let name = "Untitled resource";

                                                if (materialType === "video" && material?.video) {
                                                  icon = <Play size={16} />;
                                                  label = "Video";
                                                  name = material.video.vidTitle || "Untitled video";
                                                } else if (materialType === "file" && material?.file) {
                                                  icon = <FileText size={16} />;
                                                  label = "Document";
                                                  name = material.file.title || "Untitled document";
                                                } else if (materialType === "assessment" && material?.assementId) {
                                                  icon = <StickyNote size={16} />;
                                                  label = "Assessment";
                                                  name = material.assementId.assesmentTitle || "Untitled assessment";
                                                } else if (materialType === "link" && material?.link) {
                                                  icon = <Youtube size={16} />;
                                                  label = "Link";
                                                  name = material.link.title || "Untitled link";
                                                }

                                                return (
                                                  <li
                                                    key={material.id || `material-${materialIndex}`}
                                                    className="flex flex-wrap items-center py-3 px-2 md:px-4 rounded-xl hover:bg-gradient-to-r hover:from-[#c7cc3f]/10 hover:to-[#bf8c13]/10 transition-all duration-200 border border-transparent hover:border-[#c7cc3f]/30 group"
                                                  >
                                                    <div className="w-8 h-8 bg-gradient-to-br from-[#bf8c13] to-[#c7cc3f] rounded-lg flex items-center justify-center mr-3 text-white group-hover:scale-110 transition-transform duration-200">
                                                      {icon}
                                                    </div>
                                                    <div className="flex-1">
                                                      <span className="text-[#07705d] font-medium">{name}</span>
                                                    </div>
                                                    <p className="text-xs truncate max-w-[10rem] font-semibold bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] text-white px-3 py-1 rounded-full mr-3">
                                                      {label}
                                                    </p>
                                                    <div className="w-6 h-6 bg-[#07705d]/10 rounded-lg flex items-center justify-center">
                                                      <Lock size={12} className="text-[#07705d]" />
                                                    </div>
                                                  </li>
                                                );
                                              })}
                                            </ul>
                                          ) : (
                                            <div className="py-4 px-4 text-center bg-gradient-to-r from-[#c7cc3f]/10 to-[#bf8c13]/10 rounded-xl border border-[#c7cc3f]/20">
                                              <FileText className="h-8 w-8 text-[#bf8c13] mx-auto mb-2" />
                                              <p className="text-[#07705d] font-medium text-sm">No materials available for this unit</p>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Reviews Tab */}
                  <TabsContent value="review" className="p-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-[#07705d] flex items-center">
                        <MessageSquare className="h-6 w-6 mr-3 text-[#bf8c13]" />
                        Student Reviews
                      </h2>

                      {data?.review?.length > 0 ? (
                        <div className="space-y-6 mb-8">
                          {data?.review?.map((review: any, index: number) => (
                            <div
                              key={review?.id || index}
                              className="bg-white border border-[#c7cc3f]/30 rounded-2xl p-6 transition-shadow duration-300"
                            >
                              <div className="flex justify-between">
                                <div className="flex items-start gap-4">
                                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#07705d] to-[#bf8c13] flex items-center justify-center text-white font-bold text-lg">
                                    {review?.Student?.firstName?.charAt(0)}{review?.Student?.lastName?.charAt(0)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-bold text-[#07705d] mb-2">
                                      {review?.Student?.firstName} {review?.Student?.lastName}
                                    </div>
                                    <div className="bg-gradient-to-r from-[#c7cc3f]/5 to-[#bf8c13]/5 rounded-xl p-4 border border-[#c7cc3f]/20">
                                      <p className="text-gray-700 leading-relaxed">{review?.text}</p>
                                    </div>
                                  </div>
                                </div>

                                {review?.Student?.id === profile?.id && (
                                  <DeletePackageReview reviewId={review?.id} />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gradient-to-r from-[#c7cc3f]/10 to-[#bf8c13]/10 rounded-2xl border border-[#c7cc3f]/30">
                          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#bf8c13] to-[#c7cc3f] flex items-center justify-center mb-4">
                            <Star className="text-white" size={32} />
                          </div>
                          <h3 className="text-xl font-bold text-[#07705d] mb-2">No reviews yet</h3>
                          <p className="text-gray-600 mb-6">Be the first to review this package and help other students!</p>
                        </div>
                      )}

                      <div className="bg-white border border-[#c7cc3f]/30 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-[#07705d] mb-4 flex items-center">
                          <Star className="h-5 w-5 mr-2 text-[#bf8c13]" />
                          Write a Review
                        </h3>
                        <PackageReviewForm
                          packageId={data?.id}
                          studentId={profile?.id}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="sticky top-24 bg-white rounded-2xl border border-[#c7cc3f]/30 overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={data?.imgUrl}
                    alt={data?.packageName}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07705d]/80 via-transparent to-transparent"></div>

                  {/* Ethiopian Pattern Overlay */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2">
                      <Heart className="h-5 w-5 text-[#bf8c13]" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Enhanced Pricing Section */}
                  {data?.discountStatus ? (
                    <div className="mb-6">
                      <div className="flex items-center text-sm text-[#bf8c13] mb-2 bg-[#bf8c13]/10 px-3 py-1 rounded-full w-fit">
                        <Clock size={14} className="mr-1" />
                        <span className="font-medium">Ends {new Date(data?.discountExpriyDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl font-bold text-[#07705d]">{data?.temporaryPrice} Birr</span>
                        <span className="text-lg line-through text-gray-400">{data?.price} Birr</span>
                      </div>
                      <span className="bg-gradient-to-r from-[#bf8c13] to-[#c7cc3f] text-white text-sm font-bold px-3 py-1 rounded-full">
                        {Math.round((1 - data?.temporaryPrice / data?.price) * 100)}% OFF
                      </span>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-[#07705d] font-Sendako">{data?.price} Birr</span>
                      <p className="text-sm text-gray-600 mt-1">One-time payment • Lifetime access</p>
                    </div>
                  )}

                  {/* Enhanced Features List */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-sm text-gray-700 group">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#07705d] to-[#bf8c13] rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                        <RotateCcw size={14} className="text-white" />
                      </div>
                      <span className="font-medium">Full lifetime access</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700 group">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#bf8c13] to-[#c7cc3f] rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                        <Book size={14} className="text-white" />
                      </div>
                      <span className="font-medium">{data?.courses?.length} comprehensive courses</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700 group">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#c7cc3f] to-[#07705d] rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                        <TrendingUp size={14} className="text-white" />
                      </div>
                      <span className="font-medium">{totalUnits} structured learning units</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700 group">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#07705d] to-[#c7cc3f] rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                        <Monitor size={14} className="text-white" />
                      </div>
                      <span className="font-medium">Mobile & desktop access</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700 group">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#bf8c13] to-[#07705d] rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                        <Trophy size={14} className="text-white" />
                      </div>
                      <span className="font-medium">Certificate of completion</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700 group">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#c7cc3f] to-[#bf8c13] rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                        <HelpCircle size={14} className="text-white" />
                      </div>
                      <span className="font-medium">24/7 community support</span>
                    </div>
                  </div>

                  {/* Enhanced Purchase Section */}
                  {profile?.studentStatus === "active" ? (
                    <div className="space-y-4">
                      {hasPurchased ? (
                        // Show enroll button if user has already purchased
                        <div className="space-y-4">
                          <Link
                            href="/dashboard/packages"
                            className="w-full bg-gradient-to-r from-[#07705d] to-[#bf8c13] text-white font-bold py-4 px-6 rounded-2xl hover:from-[#07705d]/90 hover:to-[#bf8c13]/90 transition-all duration-200 flex items-center justify-center group"
                          >
                            <BookOpen className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                            Go to Dashboard
                          </Link>
                          <div className="bg-gradient-to-r from-[#c7cc3f]/10 to-[#bf8c13]/10 rounded-xl p-4 border border-[#c7cc3f]/20 text-center">
                            <div className="flex items-center justify-center text-sm text-[#07705d] font-medium">
                              <CheckCircle className="h-4 w-4 mr-2 text-[#c7cc3f]" />
                              You own this package
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Show purchase options if user hasn't purchased
                        <div className="space-y-3">
                          <PackageAddToCartButton 
                            packageData={data}
                            className="w-full"
                          />
                          <div className="text-center">
                            <span className="text-sm text-gray-500">or</span>
                          </div>
                          {data?.discountStatus ? (
                            <PurchaseDialogCustom
                              packageId={data?.id}
                              price={data?.temporaryPrice}
                              price2={data?.temporaryPrice2}
                              price3={data?.temporaryPrice3}
                            />
                          ) : (
                            <PurchaseDialogCustom
                              packageId={data?.id}
                              price={data?.price}
                              price2={data?.price2}
                              price3={data?.price3}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {profile?.accountType === "Student" ? (
                        <div className="text-center p-4 bg-gradient-to-r from-[#bf8c13]/10 to-[#c7cc3f]/10 border border-[#bf8c13]/30 rounded-xl">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#bf8c13] to-[#c7cc3f] rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <p className="text-sm text-[#07705d] font-semibold mb-2">
                            Confirm your email to purchase!
                          </p>
                          <Link
                            href="/profile"
                            className="inline-flex items-center px-4 py-2 text-sm font-semibold bg-[#07705d] text-white rounded-xl hover:bg-[#07705d]/90 transition-colors"
                          >
                            Go to Profile
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      ) : (
                        <div className="text-center p-4 bg-gradient-to-r from-[#c7cc3f]/10 to-[#bf8c13]/10 border border-[#c7cc3f]/30 rounded-xl">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#07705d] to-[#bf8c13] rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <Users className="h-6 w-6 text-white" />
                          </div>
                          <p className="text-sm text-[#07705d] font-semibold mb-4">
                            Join thousands of students learning with us!
                          </p>
                          <div className="flex flex-col gap-3">
                            <Link
                              href="/login"
                              className="px-6 py-2 text-sm font-semibold bg-[#07705d] text-white rounded-xl hover:bg-[#07705d]/90 transition-colors"
                            >
                              Log in
                            </Link>
                            <Link
                              href="/signup"
                              className="px-6 py-2 text-sm font-semibold border-2 border-[#07705d] text-[#07705d] rounded-xl hover:bg-[#07705d]/5 transition-colors"
                            >
                              Sign Up Free
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
