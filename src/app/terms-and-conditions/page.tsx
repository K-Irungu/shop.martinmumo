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

const TermsPage = () => {
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
        <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
        <p className="text-gray-500 mt-2">Last updated: November 21, 2025</p>
      </div>

      {/* CONTENT */}
      <div className="space-y-12 text-gray-600 leading-relaxed">
        {/* SECTION 1 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <ShieldCheck className="w-5 h-5 text-blue-600" /> */}
            1. Introduction
          </h2>
          <p>
            These Terms and Conditions (“Terms”) govern all pre-orders made
            through this website (“Site”) for the book titled Beyond the Summit
            (“Product”). By placing a pre-order, you agree to be bound by these
            Terms.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <Book className="w-5 h-5 text-blue-600" /> */}
            2. Nature of a Pre-Order
          </h2>
          <p>
            A pre-order reserves your copy of the Product prior to its official
            release. By placing a pre-order, you acknowledge that:
          </p>
          <p>
            Delivery timelines may vary depending on printing schedules,
            logistics, and third-party service providers.
          </p>
        </section>

        {/* SECTION 3 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <Clock className="w-5 h-5 text-blue-600" /> */}
            3. Delivery Timeline
          </h2>
          <p>
            We aim to deliver all pre-ordered Products within 14 days of the
            official release date or within 14 days from the date of order
            placement, whichever applies.
          </p>
          <p>
            Delivery periods may be extended due to circumstances outside our
            control, including but not limited to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Delays by courier or postal services</li>
            <li>Supplier or printing delays</li>
            <li>Public holidays or force majeure events</li>
          </ul>
          <p>
            We shall not be liable for delays caused by third-party service
            providers.
          </p>
        </section>

        {/* SECTION 4 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <Truck className="w-5 h-5 text-blue-600" /> */}
            4. Delivery Information
          </h2>
          <p>
            Customers must provide accurate contact details, physical delivery
            address, and phone number.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>
                Delivery costs are not included in the listed purchase price{" "}
              </strong>{" "}
              of the Product unless expressly stated. Applicable delivery fees
              will be displayed at checkout before payment is completed.
            </li>
            <li>
              <strong>Delivery charges</strong> may vary depending on:
              <ul className="list-disc pl-5 space-y-2">
                <li>The customer’s location</li>
                <li>Courier rates</li>
                <li>Weight and volume of the Product, and</li>
                <li>
                  Any special delivery instructions provided by the customer
                </li>
              </ul>
            </li>
            <li>
              Customers are responsible for paying all delivery fees in full at
              the time of placing the order.
            </li>
            <li>
              We shall not dispatch any Product where delivery fees remain
              unpaid
            </li>
            <li>
              We shall not be held responsible for:
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Failed deliveries due to incorrect or incomplete information
                </li>
                <li>
                  Delays resulting from the customer’s unavailability at the
                  delivery address
                </li>
                <li>
                  Where delivery fails due to customer error, re-delivery
                  charges may apply
                </li>
              </ul>
            </li>
          </ul>
        </section>

        {/* SECTION 5 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <CircleDollarSign className="w-5 h-5 text-blue-600" /> */}
            5. Pricing & Payment
          </h2>
          <p>
            The price displayed at the time of placing the order is final.
            Payment must be made in full at checkout through the available
            payment methods.
          </p>
        </section>

        {/* SECTION 6 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <RefreshCcw className="w-5 h-5 text-blue-600" /> */}
            6. Refund Policy
          </h2>
          <p>
            All pre-orders are generally non-refundable, except in the limited
            circumstances below:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              The Product is not delivered within 30 days past the expected
              delivery timeline, and the delay is not caused by the customer.
            </li>
            <li>
              The Product arrives damaged due to our packaging or handling.
            </li>
            <li>
              The order is cancelled by us due to unforeseen publishing or
              supply issues.
            </li>
          </ul>
          <p>
            We reserve the right to approve or decline refund requests at our
            sole discretion. Where a refund is issued, it shall be processed
            using the original payment method.
          </p>
        </section>

        {/* SECTION 7 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <X className="w-5 h-5 text-blue-600" /> */}
            7. Cancellation by the Customer
          </h2>
          <p>
            Because pre-orders are used to plan printing quantities and
            logistics, customer-initiated cancellations are not guaranteed.
          </p>
          <p>
            We may, at our discretion, approve a cancellation only if the order
            has not yet been processed for shipping.
          </p>
          <p>An administrative fee may apply.</p>

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
            8. Product Description and Availability
          </h2>
          <p>
            We make reasonable efforts to ensure that all Product descriptions
            on the Site are accurate. However, minor variations may occur during
            printing.
          </p>
          <p>
            Availability is subject to stock limitations, and we reserve the
            right to cancel or amend orders accordingly.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <X className="w-5 h-5 text-blue-600" /> */}
            9. Limitation of Availability
          </h2>
          <p>To the maximum extent permitted by law:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              We shall not be liable for indirect, incidental, or consequential
              damages.
            </li>
            <li>
              Our total aggregate liability arising from a pre-order shall not
              exceed the amount paid for the specific order.
            </li>
            <li>
              We are not liable for delays, loss, or damage attributable to
              third-party delivery providers.
            </li>
          </ul>
          <p>
            {" "}
            Nothing in these Terms limits liability where such limitation is
            prohibited by Kenyan law.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <X className="w-5 h-5 text-blue-600" /> */}
            10. Force Majure
          </h2>
          <p>
            We shall not be responsible for failure to perform obligations where
            such failure is caused by events beyond our reasonable control,
            including natural disasters, war, strikes, pandemics, governmental
            actions, or system failures.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <X className="w-5 h-5 text-blue-600" /> */}
            11. Intellectual Property
          </h2>
          <p>
            All content, branding, manuscripts, images, and materials related to
            the Product are protected by copyright and may not be reproduced
            without written permission.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <X className="w-5 h-5 text-blue-600" /> */}
            12. Governing Law & Dispute Resolution
          </h2>
          <p>
            These Terms shall be governed by and interpreted in accordance with
            the laws of Kenya.
          </p>
          <p>
            Any disputes shall be resolved through negotiation in the first
            instance. If unresolved, the dispute may be referred to:{" "}
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Mediation under Kenyan law, or</li>
            <li>The Kenyan courts, which shall have exclusive jurisdiction.</li>
          </ul>
        </section>

        {/* Section 13 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {/* <X className="w-5 h-5 text-blue-600" /> */}
            13. Amendments
          </h2>
          <p>
            We may update these Terms from time to time. The version published
            on the Site at the time of your order shall apply to your purchase.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
