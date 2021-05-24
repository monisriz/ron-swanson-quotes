import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Search from './Components/Search/Search';
import Quotes from './Components/Quotes/Quotes';
import { Container } from 'react-bootstrap';

function App() {

  const [quotes, setQuotes] = useState([]);
  const [totalVotes, setTotalVotes] = useState(parseInt(localStorage.getItem('totalVotes')) || 0);
  const [searchTerm, setSearchTerm] = useState('');
  const [quoteQty, setQuoteQty] = useState(5);
  const [darkMode, setDarkMode] = useState(false);


  const darkModeToggle = (e) => {
    // let localTheme = localStorage.getItem('darkMode');
    setDarkMode(!darkMode);
    let rootElem = document.getElementsByTagName('body');
    darkMode ? rootElem[0].classList.toggle("dark") : rootElem[0].classList.toggle("dark");
  }

  useEffect(() => {
    async function fetchMyAPI() {
      let url;
      if (!searchTerm && quoteQty) {
        url = `http://ron-swanson-quotes.herokuapp.com/v2/quotes/${quoteQty}`;
      } else {
        url = `http://ron-swanson-quotes.herokuapp.com/v2/quotes/search/${searchTerm}`;
      }
      let response = await fetch(url);
      let data = await response.json();
      setQuotes(data);
    }
    fetchMyAPI()
  }, [quoteQty, searchTerm]
  )

    return (
      <Container>
        <Header
          totalVotes={totalVotes}
          darkModeToggle={darkModeToggle}
          darkMode={darkMode}
        />
        <Search
          setSearchTerm={setSearchTerm}
          setQuoteQty={setQuoteQty}
        />
        <Quotes
          quotes={quotes}
          setTotalVotes={setTotalVotes}
          totalVotes={totalVotes}
          quoteQty={quoteQty}
          darkModeToggle={darkModeToggle}
          darkMode={darkMode}
        />
      </Container>
    );
  }

export default App;