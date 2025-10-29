import React from "react";
import Link from "next/link";
import { ScrollText } from "lucide-react";

interface ForumButtonProps {
  forumId: string;
}

const ForumButton: React.FC<ForumButtonProps> = ({ forumId }) => {
  if (!forumId) return null;
  return (
    <div className="mb-6">
      <Link
        href={`/forum/${forumId}`}
        className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#07705d] to-[#bf8c13] hover:from-[#07705d]/90 hover:to-[#bf8c13]/90 text-white rounded-lg transition-all duration-200 w-full justify-center font-medium shadow-md"
      >
        <ScrollText size={18} />
        Course Forum
      </Link>
    </div>
  );
};

export default ForumButton;
