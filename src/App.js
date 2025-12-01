import './App.css';
import { ThemeProvider } from './pages/themes/themeProvider';
import AppRoutes from './routes/AppRoutes';
import { useContext } from 'react'; 
import { ThemeContext } from './pages/themes/themeContext';

function App() {
  return (
    <>
      <ThemeProvider>
    <AppRoutes />
    </ThemeProvider>
    </>
  );
}

export default App;
