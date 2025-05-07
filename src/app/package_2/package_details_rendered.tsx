"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Play,
  ScrollText,
  Text,
  Youtube,
  StickyNote,
  FileText,
  Lock,
  Check,
  ChevronRight,
  Star,
  Clock,
  Book,
  User,
  Calendar,
  TagIcon,
  Award,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import { PurchaseDialogCustom } from "@/components/custom_components/purchaseDialong";
import Footer from "@/components/main_components/footer";
import PackageReviewForm from "@/components/custom_components/packageReviewForm";
import DeletePackageReview from "@/components/custom_components/delete_review";
import useFetchStore from "@/app/store/fetchStore";
import { setAccessToken, getAccessToken, clearAccessToken } from "@/lib/tokenManager";

// Create a Skeleton component for loading state
const Skeleton = ({ className = "" }) => {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
};

export default function PackageDetailsRendered(props: any) {
  const PackageId = props.package_id;
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>([]);
  const [tagChosen, setTagChosen] = useState("");
  const [activeTab, setActiveTab] = useState("info");

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

  // Calculate total course units and materials
  const totalUnits = data?.courses?.reduce((acc, course) => acc + parseInt(course.parts || 0), 0) || 0;
  const totalMaterials = data?.courses?.reduce((acc, course) => acc + (course.materials?.length || 0), 0) || 0;
   
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-80 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primaryColor">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400 mt-0.5" />
            <Link href="/searchPackages" className="text-gray-500 hover:text-primaryColor">
              Packages
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400 mt-0.5" />
            <Link
              href={`/packages_access/filter_packages/${tagChosen}`}
              className="text-gray-500 hover:text-primaryColor"
            >
              {data?.tag}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400 mt-0.5" />
            <span className="text-primaryColor font-medium truncate">
              {data?.packageName}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                {data?.packageName}
              </motion.h1>
              
              <div className="flex items-center mb-6 space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primaryColor/10 text-primaryColor text-sm font-medium">
                  <TagIcon className="h-3.5 w-3.5 mr-1" />
                  {data?.tag}
                </span>
                <span className="inline-flex items-center text-gray-500 text-sm">
                  <Book className="h-4 w-4 mr-1.5 text-gray-400" />
                  {data?.courses?.length || 0} Courses
                </span>
                <span className="inline-flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
                  {totalUnits} Units
                </span>
              </div>

              {/* Main Tabs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <Tabs
                  defaultValue="info"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="flex w-full border-b border-gray-100 bg-gray-50">
                    <TabsTrigger 
                      value="info" 
                      className="flex-1 py-4 data-[state=active]:text-primaryColor data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primaryColor"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="content" 
                      className="flex-1 py-4 data-[state=active]:text-primaryColor data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primaryColor"
                    >
                      Curriculum
                    </TabsTrigger>
                    <TabsTrigger 
                      value="review" 
                      className="flex-1 py-4 data-[state=active]:text-primaryColor data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primaryColor"
                    >
                      Reviews
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Package Info Tab */}
                  <TabsContent value="info" className="p-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-xl font-semibold mb-3 text-gray-900">Package Description</h2>
                        <p className="text-gray-700 leading-relaxed">
                          {data?.packageDescription}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 flex flex-col items-center">
                          <div className="w-12 h-12 bg-primaryColor/10 rounded-full flex items-center justify-center mb-2">
                            <Book className="h-6 w-6 text-primaryColor" />
                          </div>
                          <span className="text-2xl font-bold text-gray-900">{data?.courses?.length || 0}</span>
                          <span className="text-gray-500 text-sm">Courses</span>
                        </div>
                        
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 flex flex-col items-center">
                          <div className="w-12 h-12 bg-primaryColor/10 rounded-full flex items-center justify-center mb-2">
                            <ScrollText className="h-6 w-6 text-primaryColor" />
                          </div>
                          <span className="text-2xl font-bold text-gray-900">{totalUnits}</span>
                          <span className="text-gray-500 text-sm">Units</span>
                        </div>
                        
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 flex flex-col items-center">
                          <div className="w-12 h-12 bg-primaryColor/10 rounded-full flex items-center justify-center mb-2">
                            <FileText className="h-6 w-6 text-primaryColor" />
                          </div>
                          <span className="text-2xl font-bold text-gray-900">{totalMaterials}</span>
                          <span className="text-gray-500 text-sm">Materials</span>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                  
                  {/* Curriculum Tab */}
                  <TabsContent value="content" className="p-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-xl font-semibold mb-4 text-gray-900">Course Curriculum</h2>
                      <div className="space-y-4">
                        {data.courses?.map((course: any, courseIndex: number) => (
                          <Accordion 
                            key={course.id || courseIndex} 
                            type="single" 
                            collapsible
                            className="border border-gray-200 rounded-lg overflow-hidden"
                          >
                            <AccordionItem value={course.id || `course-${courseIndex}`} className="border-0">
                              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 hover:no-underline bg-gray-50">
                                <div className="flex justify-between w-full items-center">
                                  <div className="flex items-center">
                                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primaryColor/10 text-primaryColor mr-3">
                                      {courseIndex + 1}
                                    </div>
                                    <div className="text-left">
                                      <h3 className="font-medium text-gray-900">{course?.courseName}</h3>
                                      <p className="text-sm text-gray-500">{course?.parts} units</p>
                                    </div>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              
                              <AccordionContent className="px-4 py-3 bg-white">
                                <div className="mb-4">
                                  <p className="text-gray-700">{course?.courseDescription}</p>
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
                                        <div key={unitIndex} className="border-t border-gray-100 pt-4">
                                          <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                                            <span className="h-6 w-6 flex items-center justify-center rounded-full bg-primaryColor/10 text-primaryColor mr-2 text-xs">
                                              {unitIndex + 1}
                                            </span>
                                            Unit {unitIndex + 1}{unitTitle !== `Unit ${unitIndex + 1}` ? `: ${unitTitle}` : ""}
                                          </h4>
                                          
                                          {unitMaterials.length > 0 ? (
                                            <ul className="space-y-2">
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
                                                    className="flex items-center py-2 px-3 rounded-md hover:bg-gray-50"
                                                  >
                                                    <div className="text-gray-400 mr-3">
                                                      {icon}
                                                    </div>
                                                    <div className="flex-1">
                                                      <span className="text-gray-700">{name}</span>
                                                    </div>
                                                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                      {label}
                                                    </span>
                                                    <Lock size={14} className="ml-3 text-gray-400" />
                                                  </li>
                                                );
                                              })}
                                            </ul>
                                          ) : (
                                            <div className="py-2 px-3 text-gray-500 italic text-sm">
                                              No materials available for this unit
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
                    </motion.div>
                  </TabsContent>

                  {/* Reviews Tab */}
                  <TabsContent value="review" className="p-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-xl font-semibold mb-4 text-gray-900">Student Reviews</h2>
                      
                      {data?.review?.length > 0 ? (
                        <div className="space-y-4 mb-8">
                          {data?.review?.map((review: any, index: number) => (
                            <div
                              key={review?.id || index}
                              className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
                            >
                              <div className="flex justify-between">
                                <div className="flex items-start gap-3">
                                  <div className="h-10 w-10 rounded-full bg-primaryColor/10 flex items-center justify-center text-primaryColor font-medium">
                                    {review?.Student?.firstName?.charAt(0)}{review?.Student?.lastName?.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {review?.Student?.firstName} {review?.Student?.lastName}
                                    </div>
                                    <p className="text-gray-700 mt-1">{review?.text}</p>
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
                        <div className="text-center py-8">
                          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <Star className="text-gray-400" size={24} />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                          <p className="text-gray-500 mb-6">Be the first to review this package</p>
                        </div>
                      )}
                      
                      <div className="border-t border-gray-100 pt-6">
                        <h3 className="text-lg font-medium mb-4">Write a Review</h3>
                        <PackageReviewForm
                          packageId={data?.id}
                          studentId={profile?.id}
                        />
                      </div>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-24 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={data?.imgUrl}
                    alt={data?.packageName}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="p-6">
                  {data?.discountStatus ? (
                    <div className="mb-4">
                      <div className="flex items-center text-sm text-red-600 mb-1">
                        <Clock size={14} className="mr-1" />
                        <span>Discount ends {new Date(data?.discountExpriyDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-gray-900">{data?.temporaryPrice} Birr</span>
                        <span className="text-lg line-through text-gray-400">{data?.price} Birr</span>
                        <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                          {Math.round((1 - data?.temporaryPrice / data?.price) * 100)}% OFF
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900">{data?.price} Birr</span>
                    </div>
                  )}
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Check size={18} className="mr-2 text-green-500" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check size={18} className="mr-2 text-green-500" />
                      <span>{data?.courses?.length} full courses</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check size={18} className="mr-2 text-green-500" />
                      <span>{totalUnits} learning units</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check size={18} className="mr-2 text-green-500" />
                      <span>Access on all devices</span>
                    </div>
                  </div>
                  
                  {profile?.studentStatus === "active" ? (
                    <div className="mt-4">
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
                  ) : (
                    <div className="mt-4">
                      {profile?.accountType === "Student" ? (
                        <div className="text-center p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                          <p className="text-sm text-yellow-700 mb-2">
                            You need to confirm your email to purchase!
                          </p>
                          <Link 
                            href="/profile" 
                            className="text-sm font-medium text-primaryColor hover:underline"
                          >
                            Go to your profile to activate
                          </Link>
                        </div>
                      ) : (
                        <div className="text-center p-3 bg-gray-50 border border-gray-100 rounded-lg">
                          <p className="text-sm text-gray-700 mb-2">
                            You need to sign in to purchase!
                          </p>
                          <div className="flex justify-center gap-3">
                            <Link 
                              href="/login" 
                              className="px-4 py-1 text-sm font-medium bg-primaryColor text-white rounded-full hover:bg-primaryColor/90 transition-colors"
                            >
                              Log in
                            </Link>
                            <Link
                              href="/signup" 
                              className="px-4 py-1 text-sm font-medium border border-primaryColor text-primaryColor rounded-full hover:bg-primaryColor/5 transition-colors"
                            >
                              Sign Up
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
