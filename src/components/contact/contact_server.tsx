import ContactClient from "./contact_client";
import ContactHeader from "./contact_header";

/**
 * Server Component for Contact Page
 * Handles static content and layout
 */
export default function ContactServer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <ContactHeader />

        {/* Main Content */}
        <ContactClient />

        {/* Bottom CTA Section */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of students who are already learning with Fayida
            Academy. Explore our courses and start your educational journey
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#c7cc3f] to-[#bf8c13] text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              aria-label="Browse our course catalog"
            >
              Browse Courses
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-[#c7cc3f] hover:text-[#c7cc3f] transition-all duration-200"
              aria-label="Learn more about Fayida Academy"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
