import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/PageContainer";
import { Footer } from "@/components/layout/Footer";

export const DisclaimerPage = () => {
  return (
    <>
      <Head>
        <title>Legal Disclaimer - Your Choice Tickets</title>
        <meta name="description" content="Legal disclaimer and terms for Your Choice Tickets marketplace" />
      </Head>

      <PageContainer maxWidth="narrow">
        <h1 className="text-4xl font-bold mb-8">Legal Disclaimer</h1>
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">General Disclaimer</h2>
              <p className="text-muted-foreground">
                The information provided on Your Choice Tickets is for general informational purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Ticket Resale Disclaimer</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">Your Choice Tickets operates as a ticket marketplace where prices are set by sellers and may differ from face value. We guarantee:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Valid tickets for your selected event</li>
                  <li>Timely delivery of tickets</li>
                  <li>Refunds for cancelled events</li>
                  <li>Secure transaction processing</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Your Choice Tickets shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of the website. This includes, but is not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
};

export default DisclaimerPage;