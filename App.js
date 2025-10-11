import { UserProvider } from "./Src/Contexts/UserContext";
import { ThemeProvider } from "./Src/Contexts/ThemeContext";
import AppNavigation from "./Src/Navigation/AppNavigation";


export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <AppNavigation />
      </ThemeProvider>
    </UserProvider>
  );
}