import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/PageContainer";
import { Footer } from "@/components/layout/Footer";

export const PressPage = () => {
  return (
    <>
      <Head>
        <title>Press Room - Your Choice Tickets</title>
        <meta name="description" content="Latest news and press releases from Your Choice Tickets" />
      </Head>

      <PageContainer>
        <h1 className="text-4xl font-bold mb-8">Press Room</h1>
        
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Media Inquiries</h2>
              <p className="text-muted-foreground">
                For press inquiries, please contact our media relations team at 
                press@yourchoicetickets.com. We aim to respond to all media 
                requests within 24 hours.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Company Assets</h2>
              <p className="text-muted-foreground">
                Download our brand assets, including logos, executive headshots, 
                and product screenshots. Please refer to our brand guidelines 
                when using these materials.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Recent News</h2>
              <p className="text-muted-foreground">
                Stay tuned for the latest updates and announcements from 
                Your Choice Tickets.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
};

export default PressPage;