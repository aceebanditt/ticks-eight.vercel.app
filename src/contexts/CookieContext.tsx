import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CookiePreferences {
  essential: boolean;
  performance: boolean;
  functional: boolean;
  marketing: boolean;
}

interface CookieContextType {
  preferences: CookiePreferences;
  hasConsented: boolean;
  updatePreferences: (newPreferences: Partial<CookiePreferences>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
}

const defaultPreferences: CookiePreferences = {
  essential: true,
  performance: false,
  functional: false,
  marketing: false,
};

const CookieContext = createContext<CookieContextType | null>(null);

export const CookieProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    const storedPreferences = localStorage.getItem("cookiePreferences");
    if (storedPreferences) {
      setPreferences(JSON.parse(storedPreferences));
      setHasConsented(true);
    }
  }, []);

  const updatePreferences = (newPreferences: Partial<CookiePreferences>) => {
    const updatedPreferences = { ...preferences, ...newPreferences };
    setPreferences(updatedPreferences);
    setHasConsented(true);
    localStorage.setItem("cookiePreferences", JSON.stringify(updatedPreferences));
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      performance: true,
      functional: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    setHasConsented(true);
    localStorage.setItem("cookiePreferences", JSON.stringify(allAccepted));
  };

  const rejectAll = () => {
    const allRejected = {
      essential: true,
      performance: false,
      functional: false,
      marketing: false,
    };
    setPreferences(allRejected);
    setHasConsented(true);
    localStorage.setItem("cookiePreferences", JSON.stringify(allRejected));
  };

  return (
    <CookieContext.Provider
      value={{
        preferences,
        hasConsented,
        updatePreferences,
        acceptAll,
        rejectAll,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieProvider");
  }
  return context;
};