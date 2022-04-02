import React from 'react';
import { ThemeProvider } from '@mui/material'
import { Routes, Route } from 'react-router-dom'

import Navbar from '../src/components/Navbar'
import { HomePage } from './pages/Home';
import { muiTheme } from './muiTheme';


function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
