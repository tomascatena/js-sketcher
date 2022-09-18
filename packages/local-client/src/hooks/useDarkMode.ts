import { useMediaQuery } from '@mui/material';
import React from 'react';
import darkTheme from '@/themes/darkTheme';
import lightTheme from '@/themes/lightTheme';

export const useDarkMode = () => {
  // Get OS-level preference for dark mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // state: boolean ; true == use dark mode
  const [darkMode, setDarkMode] = React.useState(true);

  const theme = React.useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  const toggleDarkMode = (checked: boolean) => {
    if (checked === null) {
      setDarkMode(prefersDarkMode);
    } else {
      setDarkMode(checked);
    }
  };

  return {
    theme,
    darkMode,
    toggleDarkMode,
  };
};
