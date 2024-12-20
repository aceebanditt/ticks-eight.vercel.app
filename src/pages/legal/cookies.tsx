import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/PageContainer";
import { Footer } from "@/components/layout/Footer";

const CookiePolicyPage = () => {
  return (
    <>
      <Head>
        <title>Cookie Policy - Your Choice Tickets</title>
        <meta name="description" content="Learn about how we use cookies and similar technologies on Your Choice Tickets" />
      </Head>

      <PageContainer maxWidth="narrow">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">What Are Cookies</h2>
              <p className="text-muted-foreground">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain features.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">How We Use Cookies</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground">Required for basic website functionality and security.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Performance Cookies</h3>
                  <p className="text-muted-foreground">Help us understand how visitors interact with our website.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Functionality Cookies</h3>
                  <p className="text-muted-foreground">Remember your preferences and personalization choices.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Marketing Cookies</h3>
                  <p className="text-muted-foreground">Used to deliver relevant advertisements and track their effectiveness.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Managing Cookies</h2>
              <p className="text-muted-foreground mb-4">
                You can control and manage cookies in your browser settings. Please note that removing or blocking cookies may impact your experience on our website.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Browser settings to manage cookies</li>
                <li>Third-party opt-out tools</li>
                <li>Cookie consent preferences</li>
                <li>Impact of disabling cookies</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
};

export default CookiePolicyPage;