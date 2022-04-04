import React from 'react';
import { ThemeProvider } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import Navbar from '../src/components/Navbar'
import { HomePage } from './pages/Home';
import { muiTheme } from './muiTheme';
import { ErrorFallback } from './components/ErrorFallback';


function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
