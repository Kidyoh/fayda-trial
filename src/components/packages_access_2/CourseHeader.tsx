import React from "react";

interface CourseHeaderProps {
    courseName: string;
    courseDescription: string;
}


function getCourseImage(courseName: string) {
    const match = courseName.match(/^[A-Za-z]+/);
    if (!match) return null;
    const base = match[0];
    const imageName = base.charAt(0).toUpperCase() + base.slice(1).toLowerCase() + ".png";
    return `/course/${imageName}`;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ courseName, courseDescription }) => {
    const imageUrl = getCourseImage(courseName);
    return (
        <div className="mb-6 flex items-center gap-4">
            {imageUrl && (
                <img
                    src={imageUrl || '/course/Biology.png'}
                    alt={courseName}
                    className="w-20 h-20 object-contain rounded-lg"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
            )}
            <div>
                <h1 className="text-3xl font-bold text-[#07705d] mb-2">{courseName}</h1>
                <p className="text-gray-600">{courseDescription}</p>
            </div>
        </div>
    );
};

export default CourseHeader;
