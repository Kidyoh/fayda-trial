import React from "react";
import VideoDetails from "../../app/(packages)/access/[single_course_id]/components/videoDetails";
import AssessmentDetails from "../../app/(packages)/access/[single_course_id]/components/assessmentDetails";
import FileDetails from "../../app/(packages)/access/[single_course_id]/components/fileDetails";
import LinkDetails from "../../app/(packages)/access/[single_course_id]/components/linkDetails";

interface MaterialContentProps {
  activeMaterialtype: string;
  activeMaterialId: string;
  studentId: string;
}

const MaterialContent: React.FC<MaterialContentProps> = ({ activeMaterialtype, activeMaterialId, studentId }) => {
  
  if (!activeMaterialtype || !activeMaterialId || activeMaterialtype === "" || activeMaterialId === "")
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#07705d] to-[#bf8c13] flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl">📖</span>
          </div>
          <div className="text-[#07705d] font-semibold text-lg">Welcome to Your Course</div>
          <div className="text-gray-600 max-w-md">
            <p className="mb-2">Choose a lesson from the navigation menu to begin your learning journey.</p>
            <p className="text-sm text-gray-500">Videos, assessments, and resources are organized by units and parts for easy access.</p>
          </div>
        </div>
      </div>
    );
  if (activeMaterialtype === "video")
    return <VideoDetails video_id={activeMaterialId} student_id={studentId} />;
  if (activeMaterialtype === "assessment")
    return <AssessmentDetails assessment_id={activeMaterialId} student_id={studentId} />;
  if (activeMaterialtype === "file")
    return <FileDetails file_id={activeMaterialId} student_id={studentId} />;
  if (activeMaterialtype === "link")
    return <LinkDetails link_id={activeMaterialId} student_id={studentId} />;
  
  return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#07705d] to-[#bf8c13] flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl">📖</span>
          </div>
          <div className="text-[#07705d] font-semibold text-lg">Welcome to Your Course</div>
          <div className="text-gray-600 max-w-md">
            <p className="mb-2">Choose a lesson from the navigation menu to begin your learning journey.</p>
            <p className="text-sm text-gray-500">Videos, assessments, and resources are organized by units and parts for easy access.</p>
          </div>
        </div>
      </div>
  );
};

export default MaterialContent;
