import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { IntlProvider } from "react-intl";
import HomePage from "./modules/home/pages/Home";
import enMessages from "./locales/en.json";
import { TooltipProvider } from "./components/atoms/tooltip/tooltip";
import { useState, useEffect } from "react";
import faMessages from "./locales/faMessages.json";
import { ThemeProvider } from "./components/molecules/providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import WelcomePage from "./modules/welcome/pages/page";

type Messages = {
  [locale: string]: {
    [key: string]: string;
  };
};

const messages: Messages = {
  "en-US": enMessages,
  fa: faMessages,
};

// Component to manage locale based on the URL
const LocaleProvider = ({ setLocale }: any) => {
  const location = useLocation();

  useEffect(() => {
    const lang = location.pathname.split("/")[1]; // Get the language code from the path
    if (lang === "fa" || lang === "en") {
      setLocale(lang);
    } else {
      setLocale(navigator.language.startsWith("fa") ? "fa" : "en-US"); // Fallback to browser language
    }
  }, [location, setLocale]);

  return null; // This component doesn't need to render anything
};

const App = () => {
  const [locale, setLocale] = useState(
    navigator.language.startsWith("fa") ? "fa" : "en-US"
  );
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: 1000 * 60 * 3, // 3 minutes in milliseconds
        refetchOnWindowFocus: false, // Optional: Prevent refetch on window focus
        staleTime: 1000 * 60 * 3, // Optional: Mark data as fresh for 3 minutes
      },
    },
  });

  // Effect to change the dir attribute based on locale
  useEffect(() => {
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
            />
            <BrowserRouter>
              <LocaleProvider setLocale={setLocale} />{" "}
              {/* Add LocaleProvider here */}
              <div>
                <Routes>
                  <Route path="*" element={<WelcomePage />} />
                  <Route path="/:lang/home" element={<HomePage />} />
                  {/* <Route path="/about" element={<About />} /> */}
                  <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
