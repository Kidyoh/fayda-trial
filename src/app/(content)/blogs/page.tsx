import { apiUrl } from "@/apiConfig";
import BlogsClient from "./blogs_client";

interface Blog {
  id: string;
  title: string;
  text: string;
  imgUrl: string;
  createdAt: string;
  readTime?: string;
  category?: string;
}

/**
 * Server Component for Blogs Page
 * Fetches blogs from API and handles static layout
 */
export default async function Blogs() {
  let blogs: Blog[] = [];

  try {
    const response = await fetch(`${apiUrl}/blogs/displayhome`, {
      cache: "no-store",
    });

    if (response.ok) {
      const jsonData = await response.json();
      // Ensure data is always an array
      const blogsArray = Array.isArray(jsonData) ? jsonData : [];

      blogs = blogsArray.map((blog: Blog) => ({
        ...blog,
        readTime: `${Math.floor(Math.random() * 10) + 2} min read`,
        category: ["Technology", "Education", "Tips", "News"][
          Math.floor(Math.random() * 4)
        ],
      }));
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    blogs = [];
  }

  return (
    <div className="min-h-screen bg-white relative pt-16">
      {/* Geometric Ethiopian pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 z-0"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='#bf8c13' fill-opacity='0.12'%3E%3Cpath d='M40 40l20-20v40l-20-20zm0 0l-20-20v40l20-20z'/%3E%3C/g%3E%3C/svg%3E')`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:mt-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#07705d] mb-4">
            Blogs
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Explore stories, insights, and innovations in Ethiopian education.
          </p>
        </div>

        {/* Client Component for filtering and display */}
        <BlogsClient blogs={blogs} />
      </div>
    </div>
  );
}
