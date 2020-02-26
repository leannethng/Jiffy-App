import React, {Component} from 'react'
import Header from './components/Header'
//import Search from './components/Search'
// import in image
import loader from './images/loader.svg'

// Create a random choice funtion which takes in an array and returns a random index number. This is a closure!
const randomChoice = arr => {
  const randIndex = Math.floor(Math.random()*arr.length);
  console.log(arr[randIndex]);
  return arr[randIndex];
};

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
      hintText: '',
      gif: null,
      // Creating an empty array for adding gifs to
      gifs: [],
    };
  }
 
  // A function that searches the giphy api using fetch and puts the search term into the query url and then we can use the results
  searchGiphy = async searchTerm => {
    // first try fetch, if it fails it gets caught below
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}=${searchTerm}&limit=25&offset=0&rating=PG&lang=en`
      )
      //here the raw response is converted in json data
      //instead of typing data.data we ca use this {data}
      
      const {data} = await response.json();
      

      // Here we can grab a random gif from our image object
      const randomGif = randomChoice(data);
      
      // console.log(data);
      
      this.setState((prevState, props) => ({
        ...prevState,
        // gets the random result and puts it in the state
        gif: randomGif,
        // here we use spread to take previous gifs and then spread them out, ten add new random gif to the end
        gifs: [...prevState.gifs,randomGif ],
        
      }))
        // console.log(this.state.gif.index);
      // console.log(data[Math.floor(Math.random()*data.length)]);

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
    //console.log(value);
    if (value.length > 2 && event.key === 'Enter'){
      // console.log(`Search for ${value}`);
      // here we call the search giphy function using the search term
      this.searchGiphy(value);
      
    }
    // console.log(event.key);
  }

  render() {
    const { searchTerm, gif, gifs, index } = this.state;
    return(
      <div className="page">
        <Header />
        <div className="search grid">
          {/* Stack of gif images */}
          {/* here we loop over our array of gif images fromt he state and create multiple videos from it */}
         
           {this.state.gifs.map(gif =>
              <video
              // key = {this.state.gifs.index}
                className='grid-item video'
                autoPlay
                loop
                src={gif.images.original.mp4}
              />)}
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
