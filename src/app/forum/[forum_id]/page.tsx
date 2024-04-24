"use client";

import React, { useEffect, useState } from "react";
import ForumDetail from "./forum_main";
import { apiUrl } from "@/apiConfig";

export default function Page({ params }: any) {
  const forumId = params.forum_id;
  const [studentId, setStudentId] = useState("");
  //console.log("forum f1: " + forumId);

  useEffect(() => {
    const getCourse = async () => {
      const res = await fetch(`${apiUrl}/login_register/profile`, {
        next: {
          revalidate: 0,
        },
        credentials: "include",
      });
      const profile = await res.json();
      setStudentId(profile.id);
      //   setForumIdfetched(forum.id);
      //console.log("COurses: " + forum.conversation[0].text);
    };

    getCourse();
  }, []);
  if (studentId === "") {
    return <div>Loading...</div>; // or any other loading indicator
  }
  return (
    <div>
      <ForumDetail studentId={studentId} forumId={forumId} />
    </div>
  );
}
