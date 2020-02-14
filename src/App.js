import React, {Component} from 'react'
import Header from './components/Header'
import Search from './components/Search'
// import in image
import loader from './images/loader.svg'



const UserHint = ({loading, hintText}) => (
  <div className='user-hint'>
    {/* Check if we have a loading state and render out either the spinner image or hint text. This is a ternary operator  */}
    {loading ? <img className='block mx-auto' src={loader} alt="loading spinner"/> : hintText}
  </div>
)

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      // default states
      searchTerm:'',
      hintText: 'Hit enter to search',
    };
  }

  // A function that searches the giphy api using fetch and puts the search term into the query url and then we can use the results
  searchGiphy = async(searchTerm) => {
    // first try fetch, if it fails it gets caught below
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}=${searchTerm}&limit=25&offset=0&rating=PG&lang=en`
      )
      //here the raw response is converted in json data
      const data = await response.json();
      console.log(data);

    } catch (error){}
  };
  // With create react app , we can write methods inside component as arrow functions instead of using constructor and bind
  handleChange = event => {
    // target is the element it, value is what is in the input
    // const value = event.target.value 
    // console.log(event.target.value)
    // can use this way of writing as value is repeated
    // console.log(event.target.key);
      const {value} = event.target;
      // by setting the search term in the state and using that on the input as the value we have created a controlled input. 
      this.setState((prevState, props) => ({
        // take the old props and spread them out here
        ...prevState,
        // then we overwrite the ones we want
        searchTerm: value,
        // Set the hint text only when there are two or more values, otherwise it is blank
        hintText: value.length > 2 ? `Hit enter to search ${value}`: '',
      }));
    };
   
   handleKeyPress = event => {
    const {value} = event.target;
    console.log(value);
    if (value.length > 2 && event.key === 'Enter'){
      // console.log(`Search for ${value}`);
      // here we call the search giphy function using the search term
      this.searchGiphy(value);
      
    }
    // console.log(event.key);
  }

  render() {
    const { searchTerm } = this.state;
    return(
      <div className="page">
        <Header />
        <div className="search grid">
          {/* Stack of gif images */}

          {/* Input field */}
          <input
            className="input grid-item"
            placeholder="Type Something"
            // run a function
            onChange={this.handleChange}
            // Grabbing info about what key is pressed, we are interested in enter
            onKeyPress={this.handleKeyPress}
            // Using the value in the state
            value={searchTerm}
            />
        </div>
        {/* here we pass out userHint and all of our state using a spread operator */}
        <UserHint {...this.state}/>
      </div>
    )
  };
}

export default App;
