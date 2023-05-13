import React, { useState } from "react";
import MyChart from "./components/MyGraph";
import "./App.css"

function App() {
  const [click, setClick] = useState(false); //use state for click handling
  const [wordCount, setWordCount] = useState({}); //use state object for filtered words

  const handleClick = async () => {
    const response = await fetch(
      "https://www.terriblytinytales.com/test.txt"
    );
    const text = await response.text();
    
    // Perform preprocessing steps
    const lowercased = text.toLowerCase();
    const withoutPunctuations = lowercased.replace(/[^\w\s]/gi, '');
    const words = withoutPunctuations.split(/\s+/);
    
    // Removing stopwords from words i.e words that are having highest frequency but are not so important like a, an, the and so on
    function removeStopwords(words) {
      const stopwords = ['a', 'an', 'the', 'and', 'or', 'but', 'is', 'of', 'to', 'it', 'for', 'but', 'in', 'my', 'your', 'i', 'you', 'us', 'on', 'our', 'their'];
      return words.filter(word => !stopwords.includes(word));
    }
    
    const filteredWords = removeStopwords(words);

    // Counting the frequency of filtered words
    const filtered = {};
    for (const word of filteredWords) {
      filtered[word] = (filtered[word] || 0) + 1;
    }


    setWordCount(filtered);
    setClick(true);

  };

  return (
    <div className="App">
      {click ? <MyChart data={wordCount} /> : <button onClick={handleClick} className="submit">Submit</button>}
      
    </div>
  );
}

export default App;