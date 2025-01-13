import React from 'react';
import BookList from './components/BookList.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Toastify CSS

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

function App() {
  // MUI tema özelleştirmesi
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2'
      },
      secondary: {
        main: '#9c27b0'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="colored"
        />
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>BookStore Frontend</h1>
        <BookList />
      </div>
    </ThemeProvider>
  );
}

export default App;
