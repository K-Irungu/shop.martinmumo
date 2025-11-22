import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CreditCard,
  AlertCircle,
  Clock,
  Book,
  CircleDollarSign,
  RefreshCcw,
  X,
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* HEADER */}
      <div className="mb-12 border-b border-gray-200 pb-8">
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
      <div className="space-y-12 text-gray-600 leading-relaxed">
        {/* SECTION 1 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            1. Introduction
          </h2>
          <p>
            This Privacy Policy explains how we collect, use, store, and protect
            your personal data when you visit our Site or place a pre-order for
            the book titled.
          </p>
          <p>We are committed to complying with:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Kenya’s Data Protection Act, 2019</li>
            <li>The Data Protection (General) Regulations, 2021</li>
            <li>
              Global data protection principles, including GDPR-aligned
              requirements
            </li>
          </ul>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            2. Personal Data We Collect
          </h2>
          <p>When placing a pre-order, we collect the following information:</p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Delivery address</li>
            <li>
              Payment details (processed securely through third-party payment
              providers)
            </li>
            <li>Any additional information voluntarily provided by you</li>
          </ul>
        </section>

        {/* SECTION 3 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            3. How We Use Your Data
          </h2>
          <p>We collect and process your data for the following purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Processing and fulfilling your pre-order</li>
            <li>Delivering the Product to your specified address</li>
            <li>Communication regarding your order status</li>
            <li>Customer support</li>
            <li>Compliance with legal obligations</li>
            <li>Improving our services and user experience</li>
          </ul>
          <p>Your data will not be sold, traded, or rented to third parties.</p>
        </section>

        {/* SECTION 4 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <Truck className="w-5 h-5 text-blue-600" /> */}
            4. Lawful Basis for Processing
          </h2>
          <p>We process your data on the following legal bases:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Performance of a contract</strong> (to fulfill your order)
            </li>
            <li>
              <strong>Compliance with legal obligations </strong>{" "}
              (record-keeping and transactional requirements)
            </li>
            <li>
              <strong>Consent</strong>, where applicable
            </li>
          </ul>
        </section>

        {/* SECTION 5 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <CircleDollarSign className="w-5 h-5 text-blue-600" /> */}
            5. Data Sharing and Third Parties
          </h2>
          <p>
            We may share your data with trusted third parties strictly for
            operational purposes:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Delivery and courier services</li>
            <li> Payment processing providers</li>
            <li>Cloud hosting and website service providers</li>
            <li>Legal or regulatory authorities where required by law</li>
          </ul>
          <p>
            All third-party partners are required to maintain confidentiality
            and comply with data protection laws.
          </p>
        </section>

        {/* SECTION 6 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <RefreshCcw className="w-5 h-5 text-blue-600" /> */}
            6. International Data Transfers
          </h2>
          <p>
            Where data is stored or processed outside Kenya, we take steps to
            ensure the receiving country or service provider has adequate data
            protection safeguards consistent with global standards.
          </p>
        </section>

        {/* SECTION 7 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <X className="w-5 h-5 text-blue-600" /> */}
            7. Data Retention
          </h2>
          <p>We retain your personal data only for as long as necessary:</p>

          <ul className="list-disc pl-5 space-y-2">
            <li>For fulfilling your order</li>
            <li>For accounting, legal, and regulatory compliance</li>
            <li>For resolving disputes or claims</li>
          </ul>

          <p>After this period, data is securely deleted or anonymised.</p>

          {/* <p>Questions about the Terms of Service should be sent to us at:</p>
          <div className="mt-4 bg-gray-50 p-4 rounded-lg inline-block">
            <p className="font-medium text-gray-900">Support Team</p>
            <p className="text-blue-600">support@martimumo.co.ke</p>

          </div> */}
        </section>

        {/* Section 8 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <X className="w-5 h-5 text-blue-600" /> */}
            8. Data Security
          </h2>
          <p>
            We implement appropriate technical and organisational measures to
            safeguard your personal information, including:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Encrypted data transmission</li>
            <li>Secure servers</li>
            <li>Restricted access controls</li>
            <li>Regular security audits</li>
          </ul>
          <p>
            However, no online transmission is fully secure; you acknowledge
            this limitation.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <X className="w-5 h-5 text-blue-600" /> */}
            9. Your Rights
          </h2>
          <p>Subject to applicable law, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data (“right to be forgotten”)</li>
            <li>Withdraw consent (where processing is based on consent)</li>
            <li>Request restriction of processing</li>
            <li>Object to certain processing activities</li>
            <li>Request data portability</li>
          </ul>
        </section>

        {/* Section 10 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <X className="w-5 h-5 text-blue-600" /> */}
            10. Cookies and Tracking
          </h2>
          <p>
            Our Site may use cookies or similar technologies to enhance user
            experience and collect analytics. You may disable cookies through
            your browser settings.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <X className="w-5 h-5 text-blue-600" /> */}
            11. Limitation of Liability
          </h2>
          <p>We shall not be liable for:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Security breaches arising from user negligence (e.g., sharing
              passwords)
            </li>
            <li>
              Data interception during transmission beyond our reasonable
              control
            </li>
            <li>
              Actions of third-party service providers who are not under our
              direct control
            </li>
          </ul>
        </section>

        {/* Section 12 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <X className="w-5 h-5 text-blue-600" /> */}
            12. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. The updated
            version will be posted on this Site with the “Last Updated” date.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
