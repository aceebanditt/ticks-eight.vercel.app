import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Head from "next/head";
import { PageContainer } from "@/components/layout/PageContainer";
import { Footer } from "@/components/layout/Footer";

export const HelpCenterPage = () => {
  return (
    <>
      <Head>
        <title>Help Center - Your Choice Tickets</title>
        <meta name="description" content="Get help with your tickets and find answers to common questions" />
      </Head>
      
      <PageContainer>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Help Center</h1>
          <p className="text-xl text-muted-foreground">
            Find answers and support for all your ticketing needs
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Quick Help Topics</h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>How to Purchase Tickets</AccordionTrigger>
                  <AccordionContent>
                    Select your event, choose your seats, and complete the checkout process using our secure payment system.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Ticket Delivery Methods</AccordionTrigger>
                  <AccordionContent>
                    We offer mobile tickets, print-at-home, and physical ticket delivery options depending on the event.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Refund Policy</AccordionTrigger>
                  <AccordionContent>
                    All sales are final unless an event is cancelled. Visit our refunds page for more information.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Contact Support</h2>
              <div className="space-y-4">
                <p>Our support team is available 24/7 to assist you with any questions or concerns.</p>
                <div className="space-y-2">
                  <p>Phone: 1-800-YOUR-TICKETS</p>
                  <p>Email: support@yourchoicetickets.com</p>
                  <p>Hours: 24/7</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
};

export default HelpCenterPage;