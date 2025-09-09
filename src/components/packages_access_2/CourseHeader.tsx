import React, { useState, useEffect } from "react";

interface CourseHeaderProps {
    courseName: string;
    courseDescription: string;
}

function getCourseImage(courseName: string) {
    if (!courseName || courseName.trim() === '') return null;
    const match = courseName.match(/^[A-Za-z]+/);
    if (!match) return null;
    const base = match[0];
    const imageName = base.charAt(0).toUpperCase() + base.slice(1).toLowerCase() + ".png";
    return `/course/${imageName}`;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ courseName, courseDescription }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    useEffect(() => {
        if (courseName && courseName.trim() !== '') {
            const newImageUrl = getCourseImage(courseName);
            setImageUrl(newImageUrl);
            setImageError(false);
            setImageLoaded(false);
        }
    }, [courseName]);

    const handleImageLoad = () => {
        setImageLoaded(true);
        setImageError(false);
    };

    const handleImageError = () => {
        setImageError(true);
        setImageLoaded(false);
    };
    return (
        <div className="mb-6 flex items-center gap-4">
            {imageUrl && !imageError && (
                <div className="relative w-20 h-20">
                    <img
                        src={imageUrl}
                        alt={courseName}
                        className={`w-20 h-20 object-contain rounded-lg transition-opacity duration-300 ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                    />
                    {!imageLoaded && !imageError && (
                        <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
                            <div className="w-8 h-8 bg-gray-300 rounded"></div>
                        </div>
                    )}
                </div>
            )}
            <div className="flex-1">
                <h1 className="text-3xl font-bold text-[#07705d] mb-2">
                    {courseName || 'Course'}
                </h1>
                <p className="text-gray-600">
                    {courseDescription || 'Loading course information...'}
                </p>
            </div>
        </div>
    );
};

export default CourseHeader;
