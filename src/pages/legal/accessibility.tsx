import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/PageContainer";
import { Footer } from "@/components/layout/Footer";

export const AccessibilityPage = () => {
  return (
    <>
      <Head>
        <title>Accessibility Statement - Your Choice Tickets</title>
        <meta name="description" content="Our commitment to digital accessibility and inclusive design at Your Choice Tickets" />
      </Head>

      <PageContainer maxWidth="narrow">
        <h1 className="text-4xl font-bold mb-8">Accessibility Statement</h1>
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Our Commitment</h2>
              <p className="text-muted-foreground">
                Your Choice Tickets is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Accessibility Features</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">Website Navigation</h3>
                  <p className="text-muted-foreground">Our website is designed to be navigable with keyboard controls and screen readers.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Color Contrast</h3>
                  <p className="text-muted-foreground">We maintain appropriate color contrast ratios for better readability.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Text Alternatives</h3>
                  <p className="text-muted-foreground">Images include appropriate alternative text descriptions.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Responsive Design</h3>
                  <p className="text-muted-foreground">Our website adapts to different screen sizes and devices.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you encounter any accessibility barriers or have suggestions for improvement, please contact our support team:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Email: accessibility@yourchoicetickets.com</li>
                <li>Phone: 1-800-YOUR-TICKETS</li>
                <li>Hours: 24/7 Support Available</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
};

export default AccessibilityPage;