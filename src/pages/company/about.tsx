import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/PageContainer";
import { Footer } from "@/components/layout/Footer";

export const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Us - Your Choice Tickets</title>
        <meta name="description" content="Learn about Your Choice Tickets and our mission to connect fans with live events" />
      </Head>

      <PageContainer>
        <h1 className="text-4xl font-bold mb-8">About Your Choice Tickets</h1>
        
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                Your Choice Tickets is dedicated to connecting fans with the events they love. 
                We provide a secure, easy-to-use platform for purchasing tickets to concerts, 
                sports events, theater shows, and more.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-muted-foreground">
                Founded with a passion for live entertainment, Your Choice Tickets has grown 
                into a trusted destination for event tickets. We work directly with venues, 
                promoters, and artists to ensure our customers have access to the best events 
                in their area.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li>• Trust and transparency in every transaction</li>
                <li>• Customer satisfaction as our top priority</li>
                <li>• Innovation in ticket purchasing technology</li>
                <li>• Accessibility to live entertainment for all</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
};

export default AboutPage;