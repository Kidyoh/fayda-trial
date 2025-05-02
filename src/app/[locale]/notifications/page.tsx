"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAccessToken } from "../../../lib/tokenManager";
import { motion } from "framer-motion";
import { Bell, ArrowLeft, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Notifications() {
  const [notificationData, setNotificationData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = getAccessToken();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiUrl}/notifications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch notifications");
        }
        return res.json();
      })
      .then((data) => {
        setNotificationData(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        setIsLoading(false);
      });
  }, [accessToken]);

  const handleNotificationClick = (notificationId: string) => {
    fetch(`${apiUrl}/notifications/notification_read/${notificationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to mark notification as read");
        }
        return res.json();
      })
      .then((data) => {
        // Update local state to reflect the read status
        setNotificationData(
          notificationData.map((notification) =>
            notification.notiId === notificationId
              ? { ...notification, status: "1" }
              : notification
          )
        );
      })
      .catch((error) => {
        console.error("Error updating notification:", error);
      });
  };

  // Format date from timestamp
  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return "Unknown date";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-40 px-4 flex items-center">
        <Link href="/" className="flex items-center text-gray-600">
          <ArrowLeft size={20} className="mr-2" />
          <span className="font-medium">Back</span>
        </Link>
        <h1 className="text-xl font-semibold text-gray-900 mx-auto">
          Notifications
        </h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      {/* Content - with padding for fixed header */}
      <div className="pt-20 px-4 pb-4 max-w-3xl mx-auto">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
              </div>
            ))}
          </div>
        ) : notificationData.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {notificationData.map((notification, index) => (
              <motion.div
                key={notification?.notiId || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className={`bg-white rounded-xl overflow-hidden shadow-sm 
                  ${notification?.status === "0" ? "border-l-4 border-l-primaryColor" : "border border-gray-200"}`}
                >
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-none">
                      <AccordionTrigger 
                        onClick={() => notification?.status === "0" && handleNotificationClick(notification?.notiId)}
                        className="px-4 py-3 hover:no-underline"
                      >
                        <div className="w-full flex items-start">
                          <div className={`p-2 rounded-full mr-3 flex-shrink-0 
                            ${notification?.status === "0" 
                              ? "bg-primaryColor/10 text-primaryColor" 
                              : "bg-gray-100 text-gray-400"}`}
                          >
                            {notification?.status === "0" ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                          </div>
                          <div className="flex-1 text-left">
                            <h2 className={`font-medium ${notification?.status === "0" ? "text-gray-900" : "text-gray-700"}`}>
                              {notification?.notiHead || "Notification"}
                            </h2>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Clock size={12} className="mr-1" />
                              <span>{formatDate(notification?.timestamp) || "Recent"}</span>
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0">
                            {notification?.status === "0" && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full bg-primaryColor/10 text-primaryColor text-xs font-medium">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-0 text-gray-600">
                        <div className="pl-10 border-l border-gray-100 ml-3">
                          {notification?.notiFull || "No additional details available."}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={24} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No notifications</h3>
            <p className="text-gray-600 mb-6">You don't have any notifications at the moment</p>
            <Link href="/" className="inline-block px-4 py-2 bg-primaryColor text-white rounded-lg text-sm font-medium">
              Go to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


