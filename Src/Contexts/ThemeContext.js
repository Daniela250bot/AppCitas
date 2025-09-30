import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themes = {
  light: {
    backgroundColor: '#fff',
    textColor: '#000',
    cardBackground: '#f9fbff',
    primaryColor: '#0A74DA',
    headerBackground: '#007AFF',
    headerTintColor: '#fff',
  },
  dark: {
    backgroundColor: '#000',
    textColor: '#fff',
    cardBackground: '#333',
    primaryColor: '#0A74DA',
    headerBackground: '#333',
    headerTintColor: '#fff',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[theme], themeName: theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};