import Image from "next/image";
import { apiUrl } from "@/apiConfig";
import BlogClient from "./blog_client";

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
 * Server Component for Blog Section
 * Fetches blogs from API and handles static layout
 */
export default async function BlogServer() {
  let blogs: Blog[] = [];

  try {
    const response = await fetch(`${apiUrl}/blogs/displayhome`, {
      cache: "no-store",
    });

    if (response.ok) {
      const jsonData = await response.json();

      // Ensure data is always an array
      const blogsArray = Array.isArray(jsonData) ? jsonData : [];

      // Enhance data with additional properties
      blogs = blogsArray.map((blog: Blog, index: number) => ({
        ...blog,
        readTime: `${Math.floor(Math.random() * 10) + 2} min read`,
        category: [
          "Education",
          "Technology",
          "Community",
          "Culture",
          "Environment",
          "Article",
        ][Math.floor(Math.random() * 6)],
      }));
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    blogs = [];
  }

  return (
    <section className="pt-2 lg:pt-16 px-4 bg-white relative overflow-hidden">
      {/* Ethiopian Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2307705d' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-10 relative flex flex-col items-center">
          <Image
            src="/svg/Asset 21.svg"
            alt="Blogs"
            width={290}
            height={56}
            className="absolute w-full md:w-max top-3 left-1/2 -translate-x-1/2 z-10"
          />
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-white z-20 my-8">
            Latest Insights
          </h2>
        </div>

        {/* Client Component for filtering and display */}
        <BlogClient blogs={blogs} />
      </div>
    </section>
  );
}
