import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Billings Management",
};

const layout = ({ children }) => {
  return (
    <html lang="vn">
      <body>
        <Provider>
          <div className="main"></div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
