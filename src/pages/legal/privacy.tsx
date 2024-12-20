import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/PageContainer";
import { Footer } from "@/components/layout/Footer";

export const PrivacyPolicyPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - Your Choice Tickets</title>
        <meta name="description" content="Privacy policy and data protection information for Your Choice Tickets users" />
      </Head>

      <PageContainer maxWidth="narrow">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            How we collect, use, and protect your personal information
          </p>
        </div>

        <Card className="p-6">
          <CardContent className="prose prose-sm max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly, including name, email, phone number, and payment details when purchasing tickets. We also collect usage data and device information automatically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use your information to process transactions, provide customer support, send important updates, and improve our services. We may also use data for marketing purposes with your consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="mb-4">
                We share your information with event organizers, payment processors, and service providers as necessary. We never sell your personal data to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or misuse. All payment information is encrypted using SSL technology.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="mb-4">
                You have the right to access, correct, or delete your personal data. You can also opt out of marketing communications and request data portability.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
              <p className="mb-4">
                Our services are not intended for children under 13. We do not knowingly collect or maintain information from children under 13 years of age.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
              <p className="mb-4">
                Your information may be transferred and processed in countries outside your residence. We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Policy Updates</h2>
              <p className="mb-4">
                We may update this policy periodically. We will notify you of significant changes through our website or email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p>
                For privacy-related questions or concerns, contact our Data Protection Officer at privacy@yourchoicetickets.com or call 1-800-YOUR-TICKETS.
              </p>
            </section>
          </CardContent>
        </Card>
      </PageContainer>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;