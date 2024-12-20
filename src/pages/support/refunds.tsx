import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/PageContainer";
import { Footer } from "@/components/layout/Footer";

export const RefundsPage = () => {
  return (
    <>
      <Head>
        <title>Refund Policy - Your Choice Tickets</title>
        <meta name="description" content="Learn about our refund policies and procedures" />
      </Head>

      <PageContainer>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Refund Policy</h1>
          <p className="text-xl text-muted-foreground">
            Understanding our refund process and guidelines
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Refund Guidelines</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">Event Cancellation</h3>
                  <p className="text-muted-foreground">Full refunds are provided for cancelled events within 7-10 business days.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Event Postponement</h3>
                  <p className="text-muted-foreground">Tickets remain valid for rescheduled dates. Refunds available if unable to attend.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Event Changes</h3>
                  <p className="text-muted-foreground">Partial refunds may be available for significant changes to event lineup or venue.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Refund Process</h2>
              <div className="space-y-4">
                <p>Our refund process is designed to be simple and transparent.</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Refunds processed to original payment method</li>
                  <li>Processing time: 7-10 business days</li>
                  <li>Service fees may be non-refundable</li>
                  <li>Email confirmation sent when refund is processed</li>
                  <li>Contact support for refund status updates</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
};

export default RefundsPage;