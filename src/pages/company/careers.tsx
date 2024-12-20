import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/PageContainer";
import { Footer } from "@/components/layout/Footer";

export const CareersPage = () => {
  return (
    <>
      <Head>
        <title>Careers - Your Choice Tickets</title>
        <meta name="description" content="Join our team at Your Choice Tickets and help shape the future of live event ticketing" />
      </Head>

      <PageContainer>
        <h1 className="text-4xl font-bold mb-8">Careers at Your Choice Tickets</h1>
        
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Join Our Team</h2>
              <p className="text-muted-foreground">
                At Your Choice Tickets, we're building the future of live event ticketing. 
                We're looking for passionate individuals who share our vision of making live 
                entertainment accessible to everyone.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold">Senior Software Engineer</h3>
                  <p className="text-muted-foreground">Help build and scale our ticketing platform</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold">Product Designer</h3>
                  <p className="text-muted-foreground">Create intuitive user experiences for our customers</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold">Customer Success Manager</h3>
                  <p className="text-muted-foreground">Support our growing customer base</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Benefits & Culture</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li>• Competitive salary and equity packages</li>
                <li>• Comprehensive health, dental, and vision coverage</li>
                <li>• Flexible work arrangements</li>
                <li>• Professional development opportunities</li>
                <li>• Regular team events and activities</li>
                <li>• Discounted event tickets</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
};

export default CareersPage;