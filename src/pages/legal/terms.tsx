import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/PageContainer";
import { Footer } from "@/components/layout/Footer";

export const TermsPage = () => {
  return (
    <>
      <Head>
        <title>Terms of Service - Your Choice Tickets</title>
        <meta name="description" content="Terms of service and user agreement for Your Choice Tickets" />
      </Head>

      <PageContainer maxWidth="narrow">
        <Card>
          <CardHeader>
            <CardTitle>Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Your Choice Tickets, you agree to be bound by these Terms of Service
              and all applicable laws and regulations.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials (information or software) on
              Your Choice Tickets for personal, non-commercial viewing only.
            </p>

            <h2>3. Ticket Purchases</h2>
            <p>
              All ticket purchases are final. Refunds are only available in accordance with our refund
              policy and applicable laws.
            </p>

            <h2>4. User Account</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password.
              You agree to accept responsibility for all activities that occur under your account.
            </p>

            <h2>5. Service Modifications</h2>
            <p>
              We reserve the right to modify or discontinue any part of our service without notice
              at any time.
            </p>

            <h2>6. Pricing and Availability</h2>
            <p>
              Prices for events are subject to change without notice. We reserve the right to modify
              or discontinue any event listing without prior notice.
            </p>

            <h2>7. Privacy Policy</h2>
            <p>
              Your use of Your Choice Tickets is also governed by our Privacy Policy. Please review
              our Privacy Policy to understand our practices.
            </p>

            <h2>8. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us through our
              support channels.
            </p>
          </CardContent>
        </Card>
      </PageContainer>
      <Footer />
    </>
  );
};

export default TermsPage;