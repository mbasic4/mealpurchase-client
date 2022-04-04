import React from 'react';
import { Container, ThemeProvider } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import Navbar from '../src/components/Navbar'
import { HomePage } from './pages/Home';
import { muiTheme } from './muiTheme';
import { ErrorFallback } from './components/ErrorFallback';


function App() {
  return (
    <ThemeProvider theme={muiTheme}>
        <Navbar />
        <Container sx={{ height: 'calc(100vh - 64px)' }}>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </ErrorBoundary>
        </Container>
    </ThemeProvider>
  );
}

export default App;
