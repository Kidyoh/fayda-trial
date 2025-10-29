import FAQClient from "./faq_client";
import FAQHeader from "./faq_header";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

/**
 * Server Component for FAQ Section
 * Handles static content and layout
 */
export default function FAQServer() {
  const faqData: FAQCategory[] = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "You can create an account by clicking the 'Sign Up' button on our homepage and filling in your details. You'll need to provide your name, email, and create a password.",
        },
        {
          question: "How do I enroll in a course?",
          answer:
            "Once you're logged in, browse our course catalog, select the course you want, and click 'Enroll Now'. Some courses are free while others require payment.",
        },
        {
          question: "Can I access courses on mobile?",
          answer:
            "Yes! Our platform is fully responsive and works on all devices. We also have mobile apps available for Android and iOS.",
        },
      ],
    },
    {
      category: "Courses & Learning",
      questions: [
        {
          question: "What types of courses do you offer?",
          answer:
            "We offer courses in various subjects including Mathematics, Physics, Chemistry, Biology, History, Economics, and more. We have both free and premium courses available.",
        },
        {
          question: "Can I download course materials?",
          answer:
            "Yes, enrolled students can download course materials including PDFs, assignments, and other resources for offline study.",
        },
        {
          question: "How long do I have access to a course?",
          answer:
            "Once you enroll in a course, you have lifetime access to the course materials and can learn at your own pace.",
        },
        {
          question: "Do you provide certificates?",
          answer:
            "Yes, we provide certificates of completion for courses once you successfully complete all requirements and assessments.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What should I do if videos won't play?",
          answer:
            "First, check your internet connection. If the issue persists, try refreshing the page or using a different browser. Contact support if problems continue.",
        },
        {
          question: "I forgot my password. How can I reset it?",
          answer:
            "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email to reset your password.",
        },
        {
          question: "Why can't I access my purchased course?",
          answer:
            "Make sure you're logged into the correct account. If you're still having issues, check your email for purchase confirmation or contact our support team.",
        },
      ],
    },
    {
      category: "Billing & Payments",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept major credit cards, debit cards, and mobile money payments including Telebirr and other local Ethiopian payment methods.",
        },
        {
          question: "Can I get a refund?",
          answer:
            "We offer a 30-day money-back guarantee for premium courses. If you're not satisfied, contact us within 30 days of purchase for a full refund.",
        },
        {
          question: "How do I update my billing information?",
          answer:
            "Go to your account settings, select 'Billing Information', and update your payment details. Your changes will be saved automatically.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <FAQHeader />

        {/* FAQ Content */}
        {/* 🔑 ensure the client component is rendered in a hydrated container */}
        <div suppressHydrationWarning>
          <FAQClient faqData={faqData} />
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] rounded-2xl p-12 text-white">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg mb-8 opacity-90">
            Our support team is here to help you succeed in your learning
            journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@fayidaacademy.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#c7cc3f] font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Email Support
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
