import { useEffect } from "react";
import { useCookieConsent } from "@/contexts/CookieContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Cookie } from "lucide-react";

export const CookieConsent = () => {
  const { preferences, hasConsented, updatePreferences, acceptAll, rejectAll } = useCookieConsent();

  useEffect(() => {
    if (!hasConsented) {
      const timer = setTimeout(() => {
        const element = document.getElementById("cookie-consent-alert");
        if (element) {
          element.classList.remove("translate-y-full");
          element.classList.add("translate-y-0");
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [hasConsented]);

  if (hasConsented) return null;

  return (
    <Alert
      id="cookie-consent-alert"
      className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 transform translate-y-full"
    >
      <Cookie className="h-4 w-4" />
      <AlertTitle>Cookie Settings</AlertTitle>
      <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <span className="flex-1">
          We use cookies to enhance your browsing experience and analyze site traffic.
        </span>
        <div className="flex flex-wrap gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Customize</Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90vh]">
              <SheetHeader>
                <SheetTitle>Cookie Preferences</SheetTitle>
                <SheetDescription>
                  Manage your cookie preferences. Essential cookies are always enabled as they are
                  required for the website to function properly.
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Essential Cookies</Label>
                      <p className="text-sm text-muted-foreground">
                        Required for basic website functionality. Cannot be disabled.
                      </p>
                    </div>
                    <Switch checked disabled />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Performance Cookies</Label>
                      <p className="text-sm text-muted-foreground">
                        Help us understand how visitors interact with our website.
                      </p>
                    </div>
                    <Switch
                      checked={preferences.performance}
                      onCheckedChange={(checked) =>
                        updatePreferences({ performance: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Functional Cookies</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable advanced features and personalization.
                      </p>
                    </div>
                    <Switch
                      checked={preferences.functional}
                      onCheckedChange={(checked) =>
                        updatePreferences({ functional: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Marketing Cookies</Label>
                      <p className="text-sm text-muted-foreground">
                        Help us deliver relevant advertisements.
                      </p>
                    </div>
                    <Switch
                      checked={preferences.marketing}
                      onCheckedChange={(checked) =>
                        updatePreferences({ marketing: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Button variant="outline" onClick={rejectAll}>
            Reject All
          </Button>
          <Button onClick={acceptAll}>Accept All</Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};