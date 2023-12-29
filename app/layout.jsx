import "@styles/globals.css";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Provider from "@components/Provider";
import { LanguageProvider } from "@components/LanguageContext";

export const metadata = {
  title: "Billin' | Your Billings Management",
};

const Layout = ({ children }) => {
  return (
    <html>
      <body>
        <Provider>
          <LanguageProvider>
            <div className="main"></div>
            <main className="app min-h-screen">
              <Nav />
              <div className="flex-1 w-full">
                {children}
              </div>
              <Footer />
            </main>
          </LanguageProvider>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
