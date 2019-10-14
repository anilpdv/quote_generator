import React, {useEffect, useState} from 'react';
import './Quote.css';
const Quote = props => {
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://quotesappapi.herokuapp.com/random');
      const data = await res.json();
      setLoading(false);
      setQuote(data);
    } catch (err) {
      console.log(err);
      setAlert(true);
    }
  };

  const changeQuote = e => {
    e.preventDefault();
    getQuote();
  };

  return (
    <div className="Quote">
      <div className="container">
        <div className="">
          {loading ? (
            <div
              style={{position: 'fixed', top: '20%', left: '50%'}}
              class="spinner-grow text-secondary"
              role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <div>
              <p className="quote p-5 text-muted">
                {quote.quote} <span className="author"> - {quote.author}</span>
              </p>
              <button onClick={changeQuote} className="btn btn-success ">
                {' '}
                quote
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quote;
