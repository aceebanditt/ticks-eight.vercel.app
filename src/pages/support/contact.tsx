import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Footer } from "@/components/layout/Footer";

export const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us - Your Choice Tickets</title>
        <meta name="description" content="Get in touch with our support team for any questions or assistance" />
      </Head>

      <PageContainer>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            We're here to help! Reach out to us through any of the following channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <Phone className="mx-auto h-8 w-8" />
              <div>
                <h3 className="font-semibold">Phone Support</h3>
                <p className="text-muted-foreground">1-800-YOUR-TICKETS</p>
                <p className="text-sm text-muted-foreground">Mon-Fri: 9am-6pm EST</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <Mail className="mx-auto h-8 w-8" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">support@yourchoicetickets.com</p>
                <p className="text-sm text-muted-foreground">24/7 Support</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <MapPin className="mx-auto h-8 w-8" />
              <div>
                <h3 className="font-semibold">Office</h3>
                <p className="text-muted-foreground">123 Ticket Street</p>
                <p className="text-sm text-muted-foreground">New York, NY 10001</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input id="subject" placeholder="Message subject" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea id="message" placeholder="Your message" rows={5} />
              </div>
              <Button type="submit" className="w-full md:w-auto">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </PageContainer>
      <Footer />
    </>
  );
};

export default ContactPage;