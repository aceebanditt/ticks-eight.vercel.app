import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/PageContainer";
import { Footer } from "@/components/layout/Footer";

export const ShippingPage = () => {
  return (
    <>
      <Head>
        <title>Shipping Information - Your Choice Tickets</title>
        <meta name="description" content="Learn about our ticket delivery methods and shipping policies" />
      </Head>

      <PageContainer>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Shipping Information</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about ticket delivery
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Delivery Methods</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">Mobile Tickets</h3>
                  <p className="text-muted-foreground">Instant delivery to your mobile device. Simply show your phone at the venue.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Print-at-Home</h3>
                  <p className="text-muted-foreground">Download and print your tickets immediately after purchase.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Standard Shipping</h3>
                  <p className="text-muted-foreground">Physical tickets delivered within 5-7 business days.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Express Shipping</h3>
                  <p className="text-muted-foreground">Next-day delivery available for select events.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Shipping Policies</h2>
              <div className="space-y-4">
                <p>We offer various shipping methods to ensure you receive your tickets securely and on time.</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>All shipping times are estimated</li>
                  <li>Tracking information provided for physical tickets</li>
                  <li>International shipping available for select events</li>
                  <li>Signature may be required for delivery</li>
                  <li>Address changes not permitted after order placement</li>
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

export default ShippingPage;