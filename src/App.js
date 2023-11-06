import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";
import AuthService from "./services/auth.service";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Login from "./scenes/login";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Products from "./scenes/products";
import Form from "./scenes/form";
import Line from "./scenes/line";
import FAQ from "./scenes/faq";

function App() {
  const [theme, colorMode] = useMode();

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
    console.log(user);
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {currentUser ? (
            <>
              <Sidebar />
              <main className="content">
                <Topbar />
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={<Navigate to="/dashboard" />}
                  />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/faq" element={<FAQ />} />
                </Routes>
              </main>
            </>
          ) : (
            <>
              <Routes>
                <Route path="/" element={<Login />} />
              </Routes>
              <Navigate to="/" replace />
            </>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
