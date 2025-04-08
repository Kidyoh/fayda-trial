import { Home, LayoutGrid, BookOpen, Pencil, LogOut } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  activeMenu: string;
  onMenuSelect: (menu: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ activeMenu, onMenuSelect, onLogout }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "mycourse", label: "My Courses", icon: LayoutGrid },
    { id: "mypackage", label: "My Packages", icon: BookOpen },
  ];

  return (
    <div className="px-3 mt-6">
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onMenuSelect(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeMenu === item.id
                  ? "bg-primaryColor text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          );
        })}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onMenuSelect("profile")}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            activeMenu === "profile"
              ? "bg-primaryColor text-white shadow-md"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Pencil size={20} />
          <span className="font-medium">Edit Profile</span>
        </motion.button>

        <div className="pt-4 mt-4 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
} 