import React from "react";
import { UserProvider } from "./Src/Contexts/UserContext";
import { ThemeProvider } from "./Src/Contexts/ThemeContext";
import AppNavegacion from "./Src/Navigation/AppNavigation";

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppNavegacion />
      </UserProvider>
    </ThemeProvider>
  );
}
