"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Calendar, User, ArrowRight, Heart, Share2, BookOpen, Star, Clock } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "የኢትዮጵያ ሥርዓተ ትምህርት አዲስ ክፍለ ዘመን",
    subtitle: "Ethiopian Education in the New Era",
    description: "Exploring how traditional Ethiopian learning methods blend with modern educational technology to create unique learning experiences that honor our heritage while preparing students for the future.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    author: "Dr. Almaz Tadesse",
    date: "August 10, 2025",
    readTime: "5 min read",
    category: "Education",
    tags: ["Ethiopian Culture", "Modern Learning", "Heritage"],
    likes: 124,
    featured: true,
  },
  {
    id: 2,
    title: "ቴክኖሎጂ እና ባህላዊ ትምህርት",
    subtitle: "Technology Meets Traditional Learning",
    description: "How digital platforms are preserving and sharing traditional Ethiopian knowledge, from ancient manuscripts to oral traditions, making them accessible to new generations.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
    author: "Yohannes Bekele",
    date: "August 8, 2025",
    readTime: "7 min read",
    category: "Technology",
    tags: ["Digital Heritage", "Innovation", "Preservation"],
    likes: 89,
    featured: false,
  },
  {
    id: 3,
    title: "የማህበረሰብ መሰረት ያለው ትምህርት",
    subtitle: "Community-Based Learning Initiatives",
    description: "Success stories from rural Ethiopian communities where collaborative learning approaches are transforming educational outcomes and preserving local wisdom.",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=800&q=80",
    author: "Hanan Mohammed",
    date: "August 5, 2025",
    readTime: "6 min read",
    category: "Community",
    tags: ["Rural Education", "Community", "Local Wisdom"],
    likes: 156,
    featured: false,
  },
  {
    id: 4,
    title: "የሴቶች ትምህርት እና ብቃት ዝርጋታ",
    subtitle: "Women's Education Empowerment",
    description: "Celebrating the achievements of Ethiopian women in education and their role in shaping the future of learning in their communities.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
    author: "Meron Gebre",
    date: "August 3, 2025",
    readTime: "8 min read",
    category: "Empowerment",
    tags: ["Women's Education", "Leadership", "Empowerment"],
    likes: 203,
    featured: false,
  },
  {
    id: 5,
    title: "የቋንቋ ብዝሃነት በትምህርት ውስጥ",
    subtitle: "Linguistic Diversity in Education",
    description: "How Ethiopia's rich linguistic heritage is being integrated into modern curricula, promoting multilingual education that celebrates our diverse cultural landscape.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    author: "Getnet Assefa",
    date: "July 30, 2025",
    readTime: "4 min read",
    category: "Culture",
    tags: ["Languages", "Diversity", "Cultural Identity"],
    likes: 92,
    featured: false,
  },
  {
    id: 6,
    title: "አካባቢ ተኮር ትምህርት ፕሮግራሞች",
    subtitle: "Environmental Education Programs",
    description: "Innovative programs that connect Ethiopian students with their natural environment, promoting sustainability and environmental stewardship through hands-on learning experiences.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    author: "Tesfaye Wolde",
    date: "July 28, 2025",
    readTime: "5 min read",
    category: "Environment",
    tags: ["Sustainability", "Nature", "Conservation"],
    likes: 78,
    featured: false,
  },
];

const BlogCard = ({ post, index }: { post: any; index: number }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white h-[450px] ${
        post.featured ? 'md:col-span-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ethiopian Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 z-10">
        <div className="w-full h-full bg-gradient-to-br from-primaryColor/20 via-transparent to-fourthColor/20"></div>
      </div>
      
      {/* Featured Badge */}
      {post.featured && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-4 left-4 z-30 bg-gradient-to-r from-fourthColor to-thirdColor text-white px-3 py-1 rounded-full text-sm font-semibold font-Sendako flex items-center gap-1"
        >
          <Star size={14} fill="white" />
          Featured
        </motion.div>
      )}

      {/* Image Container */}
      <div className="relative overflow-hidden h-48">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </motion.div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-30 bg-primaryColor/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
          {post.category}
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5 flex flex-col justify-between flex-1 z-20">
        <div>
          {/* Amharic Title */}
          <h3 className={`font-bold text-primaryColor mb-2 font-Sendako line-clamp-2 ${
            post.featured ? 'text-xl' : 'text-lg'
          }`}>
            {post.title}
          </h3>
          
          {/* English Subtitle */}
          <h4 className={`text-gray-600 mb-3 font-medium ${
            post.featured ? 'text-base' : 'text-sm'
          }`}>
            {post.subtitle}
          </h4>
          
          {/* Description */}
          <p className={`text-gray-700 mb-4 ${
            post.featured ? 'text-sm line-clamp-4' : 'text-sm line-clamp-3'
          }`}>
            {post.description}
          </p>
        </div>
        
        <div>
          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <User size={10} />
                <span className="truncate max-w-20">{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={10} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.slice(0, post.featured ? 3 : 2).map((tag: string) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-1 text-xs transition-colors ${
                  isLiked ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                <Heart size={12} fill={isLiked ? 'currentColor' : 'none'} />
                {post.likes + (isLiked ? 1 : 0)}
              </motion.button>
              
              <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-primaryColor transition-colors">
                <Share2 size={12} />
                Share
              </button>
            </div>
            
            <Link
              href={`/blogs/${post.id}`}
              className="group/link flex items-center gap-1 text-xs text-primaryColor hover:text-fourthColor font-semibold transition-colors"
            >
              Read More
              <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Education', 'Technology', 'Community', 'Culture', 'Environment', 'Empowerment'];
  
  const filteredPosts = filter === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === filter);

  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
      {/* Ethiopian Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2307705d' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <Image
              src="/svg/Asset 21.svg"
              alt="Blog Section"
              width={290}
              height={56}
              className="absolute top-3 left-1/2 -translate-x-1/2 z-10"
            />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold font-Sendako text-white z-20 relative mt-8 mb-4"
            >
              ጦማሮች / BLOGS
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Discover insights, stories, and innovations shaping Ethiopia&apos;s educational landscape
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === category
                  ? 'bg-primaryColor text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primaryColor to-fourthColor text-white px-8 py-3 rounded-full font-semibold font-Sendako shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <BookOpen size={20} />
            View All Blogs
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;