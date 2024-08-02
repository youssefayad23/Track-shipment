import { Routes, Route } from 'react-router-dom';
import './App.css';
//import Header from './components/header/Header';
import TrackShipment from './pages/TrackShipment';
import { useEffect } from 'react';
import i18next from 'i18next';

function App() {
  useEffect(() => {
    const lastSelectedLanguage = localStorage.getItem('i18nextLng');
    i18next.changeLanguage(lastSelectedLanguage);
    const handleLanguageChange = () => {
      localStorage.setItem('i18nextLng', i18next.language);
      document.body.dir = i18next.language === 'ar' ? 'rtl' : 'ltr';
    };
    handleLanguageChange();

    i18next.on('languageChanged', handleLanguageChange);
    // remove event listener when component unmounts
    return () => {
      i18next.off('languageChanged', handleLanguageChange);
    };
  }, []);
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route
          //path="/shipments/track/:trackingNumber"
          path="/"
          element={<TrackShipment />}
        />
      </Routes>
    </>
  );
}

export default App;
