import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      // Parse input JSON
      const parsedInput = JSON.parse(input);
      // Validate the input format
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        alert('Invalid JSON format. Please provide data in correct format.');
        return;
      }
      // Send POST request
      const res = await axios.post('https://bajajfin-bs4n.onrender.com/bfhl', parsedInput);
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while processing the request.');
    }
  };

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    let output = [];
    
    // Ensure proper display for each selected option
    if (selectedOptions.includes('Numbers')) {
      output.push(<div key="numbers">Numbers: {numbers.length ? numbers.join(', ') : 'None'}</div>);
    }
    if (selectedOptions.includes('Alphabets')) {
      output.push(<div key="alphabets">Alphabets: {alphabets.length ? alphabets.join(', ') : 'None'}</div>);
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      output.push(<div key="highest_lowercase_alphabet">Highest Lowercase Alphabet: {highest_lowercase_alphabet.length ? highest_lowercase_alphabet.join(', ') : 'None'}</div>);
    }
    return output;
  };

  return (
    <div>
      <h1>21BCE5055</h1>
      <textarea 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        rows="5" 
        cols="40" 
        placeholder='Enter JSON data, e.g., {"data": ["A", "1", "b", "c", "2"]}'
      />
      <button onClick={handleSubmit}>Submit</button>
      <select multiple onChange={handleSelectChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>
      <div>
        {renderResponse()}
      </div>
    </div>
  );
};

export default App;
