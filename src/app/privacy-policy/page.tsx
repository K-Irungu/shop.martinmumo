import Link from "next/link";
import { ArrowLeft, Lock, Eye, Database, Cookie, Mail } from "lucide-react";

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 ">
      {/* HEADER */}
      <div className="mb-10 border-b border-gray-200 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Store
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="text-gray-500 mt-2">Last updated: November 21, 2025</p>
      </div>

      {/* CONTENT */}
      <div className="space-y-10 text-gray-600 leading-relaxed">
        
        {/* SECTION 1 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            1. Introduction
          </h2>
          <p>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase "Beyond the Summit". Please read this privacy policy carefully.
          </p>
        </section>

        {/* SECTION 2 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            2. Information We Collect
          </h2>
          <p className="mb-3">
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you make a purchase.
            </li>
            <li>
              <strong>Payment Data:</strong> Financial data related to your payment method (e.g., valid credit card number, card brand, expiration date) is handled directly by our payment processor, <strong>Pesapal</strong>. We do not store full credit card details on our servers.
            </li>
          </ul>
        </section>

        {/* SECTION 3 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            3. How We Use Your Information
          </h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we use information collected about you via the Site to:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>Process your payments and fulfill your orders.</li>
            <li>Email you regarding your order status (confirmations, shipping updates).</li>
            <li>Send you a newsletter (only if you opted-in).</li>
            <li>Prevent fraudulent transactions and monitor against theft.</li>
          </ul>
        </section>

        {/* SECTION 4 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Cookie className="w-5 h-5 text-blue-600" />
            4. Cookies and Tracking
          </h2>
          <p>
            We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology.
          </p>
        </section>

        {/* SECTION 5 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            5. Third-Party Disclosure
          </h2>
          <p>
            We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users (such as <strong>Pesapal</strong> for payments and courier services for delivery), so long as those parties agree to keep this information confidential.
          </p>
        </section>

        {/* SECTION 6 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            6. Contact Us
          </h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <div className="mt-4 bg-gray-50 p-4 rounded-lg inline-block">
            <p className="font-medium text-gray-900">Privacy Officer</p>
            <p className="text-blue-600">privacy@martinmumo.co.ke</p>
          </div>
        </section>

      </div>
      
      
    </div>
  );
};

export default PrivacyPage;