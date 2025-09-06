import React from "react";
import VideoDetails from "../../app/packages_access_2/[single_course_id]/components/videoDetails";
import AssessmentDetails from "../../app/packages_access_2/[single_course_id]/components/assessmentDetails";
import FileDetails from "../../app/packages_access_2/[single_course_id]/components/fileDetails";
import LinkDetails from "../../app/packages_access_2/[single_course_id]/components/linkDetails";

interface MaterialContentProps {
  activeMaterialtype: string;
  activeMaterialId: string;
  studentId: string;
}

const MaterialContent: React.FC<MaterialContentProps> = ({ activeMaterialtype, activeMaterialId, studentId }) => {
  if (!activeMaterialtype)
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#07705d] to-[#bf8c13] flex items-center justify-center">
            <span className="text-white text-2xl">▶</span>
          </div>
          <div className="text-[#07705d] font-medium">Select a material to get started</div>
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
  return null;
};

export default MaterialContent;
