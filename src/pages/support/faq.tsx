import Head from "next/head";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/PageContainer";
import { Footer } from "@/components/layout/Footer";

export const FAQPage = () => {
  return (
    <>
      <Head>
        <title>FAQ - Your Choice Tickets</title>
        <meta name="description" content="Frequently asked questions about tickets, events, and our services" />
      </Head>

      <PageContainer>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about our services and ticket purchasing
          </p>
        </div>

        <Card className="p-6">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I purchase tickets?</AccordionTrigger>
              <AccordionContent>
                Browse our event listings, select your desired event, and click "Get Tickets". Choose your seats or ticket type, then proceed to checkout. We accept all major credit cards and various payment methods.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Are my tickets guaranteed?</AccordionTrigger>
              <AccordionContent>
                Yes, all tickets purchased through Your Choice Tickets are 100% guaranteed to be valid and authentic. If any issues arise, we'll provide comparable or better tickets, or a full refund.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How will I receive my tickets?</AccordionTrigger>
              <AccordionContent>
                Depending on the event and venue, tickets will be delivered via mobile transfer, email as print-at-home tickets, or physical tickets shipped to your address. Delivery method will be clearly indicated before purchase.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>What is your refund policy?</AccordionTrigger>
              <AccordionContent>
                All sales are final unless an event is cancelled or rescheduled. If an event is cancelled, you'll receive a full refund. For rescheduled events, tickets will typically be valid for the new date.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Can I transfer my tickets to someone else?</AccordionTrigger>
              <AccordionContent>
                Yes, most tickets can be transferred to another person through our platform. Log into your account, find the order, and select the transfer option. The recipient will receive instructions via email.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>What if an event is cancelled?</AccordionTrigger>
              <AccordionContent>
                If an event is cancelled, you'll automatically receive a full refund to your original payment method within 7-10 business days. We'll notify you via email about the cancellation and refund process.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Are there any additional fees?</AccordionTrigger>
              <AccordionContent>
                Ticket prices may include service fees, delivery fees, and facility charges. All applicable fees will be clearly displayed before you complete your purchase.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>How do I sell tickets on your platform?</AccordionTrigger>
              <AccordionContent>
                To sell tickets, create a seller account and follow our listing guidelines. We'll verify your tickets and handle the secure transaction process. Visit our Sell Tickets page for more information.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </PageContainer>
      <Footer />
    </>
  );
};

export default FAQPage;