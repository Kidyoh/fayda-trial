"use client";

import { useMemo, useState } from "react";
import CourseCard from "./course_card";
import type { Course } from "@/lib/api/types";
import { motion } from "framer-motion";

interface Props {
  courses: Course[];
}

export default function CourseGridClient({ courses }: Props) {
  const [page, setPage] = useState(1);
  const perPage = 6;
  const totalPages = Math.max(1, Math.ceil((courses?.length || 0) / perPage));

  const current = useMemo(() => {
    const start = (page - 1) * perPage;
    return (courses || []).slice(start, start + perPage);
  }, [page, courses]);

  return (
    <div>
      <motion.div
        key={page}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {current.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </motion.div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-2 rounded-xl bg-white border hover:bg-gray-50"
            disabled={page === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`px-4 py-2 rounded-xl border font-semibold ${
                n === page
                  ? "bg-gradient-to-r from-[#07705d] to-[#c7cc3f] text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-2 rounded-xl bg-white border hover:bg-gray-50"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
