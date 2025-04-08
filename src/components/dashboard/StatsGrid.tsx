import { motion } from "framer-motion";
import { School, MapPin, GraduationCap, Phone, Trophy, Mail, Calendar, User, Globe, Medal, Star, Sparkles } from "lucide-react";

interface StatsGridProps {
  userData: {
    age: string;
    email: string;
    schoolName: string;
    city: string;
    region: string;
    gread: string;
    phoneNumber: string;
    points: number;
  };
}

export default function StatsGrid({ userData }: StatsGridProps) {
  const stats = [
    {
      label: "Personal Info",
      items: [
        { label: "Age", value: userData.age },
        { label: "Email", value: userData.email },
      ],
      icon: <User className="w-5 h-5" />,
      pattern: "radial-gradient(circle at 10% 20%, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 80%)",
      delay: 0.1,
    },
    {
      label: "Location",
      items: [
        { label: "School", value: userData.schoolName },
        { label: "City", value: userData.city },
        { label: "Region", value: userData.region },
      ],
      icon: <MapPin className="w-5 h-5" />,
      pattern: "radial-gradient(circle at 90% 10%, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 80%)",
      delay: 0.2,
    },
    {
      label: "Academic",
      items: [{ label: "Grade", value: userData.gread }],
      icon: <GraduationCap className="w-5 h-5" />,
      pattern: "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.015) 0%, rgba(0, 0, 0, 0.005) 70%)",
      delay: 0.3,
    },
    {
      label: "Contact",
      items: [{ label: "Phone", value: userData.phoneNumber }],
      icon: <Phone className="w-5 h-5" />,
      pattern: "radial-gradient(circle at 20% 80%, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 80%)",
      delay: 0.4,
    },
    {
      label: "Achievement",
      items: [{ label: "Points", value: userData.points }],
      icon: <Sparkles className="w-5 h-5" />,
      pattern: "radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 80%)",
      delay: 0.5,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          transition={{ duration: 0.4, delay: stat.delay }}
          whileHover={{ 
            y: -8, 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: { duration: 0.2 } 
          }}
          className="relative rounded-2xl overflow-hidden group"
        >
          {/* 3D-like card effect with white background */}
          <div className="absolute inset-0 bg-white rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)] transition-all duration-300"></div>
          
          {/* Decorative elements */}
          <div className="absolute -right-6 -top-6 w-12 h-12 rounded-full bg-primaryColor/5"></div>
          <div className="absolute -left-6 -bottom-6 w-12 h-12 rounded-full bg-primaryColor/5"></div>
          
          {/* Content container */}
          <div className="relative z-10 h-full">
            {/* Header */}
            <div 
              className="flex items-center border-b border-gray-100 p-5" 
              style={{ background: stat.pattern }}
            >
              <div className="h-10 w-10 rounded-xl shadow-sm bg-white flex items-center justify-center border border-gray-50 mr-3">
                <div className="text-primaryColor">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-primaryColor">{stat.label}</h3>
              {index === 4 && (
                <div className="absolute -right-1 -top-1">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-primaryColor/10 blur-md"></div>
                    <Star className="w-5 h-5 text-primaryColor relative z-10" />
                  </div>
                </div>
              )}
            </div>
            
            {/* Content with subtle pattern */}
            <div className="p-5 space-y-4">
              {stat.items.map((item, idx) => (
                <motion.div 
                  key={item.label} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: stat.delay + idx * 0.1, duration: 0.3 }}
                  className="group"
                >
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <span className="text-gray-500 font-medium text-sm">{item.label}</span>
                    {item.label === "Points" ? (
                      <div className="flex items-center space-x-1.5 bg-primaryColor/10 px-3 py-1 rounded-full">
                        <Trophy className="w-4 h-4 text-primaryColor" />
                        <span className="font-bold text-primaryColor">{item.value}</span>
                      </div>
                    ) : (
                      <span className="font-medium text-gray-800 group-hover:text-primaryColor transition-colors duration-200">{item.value}</span>
                    )}
                  </div>
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-100 to-transparent mt-1"></div>
                </motion.div>
              ))}
            </div>
            
            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primaryColor/0 via-primaryColor/30 to-primaryColor/0"></div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
} 