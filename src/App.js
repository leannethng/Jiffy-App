import React, {Component} from 'react'
import Header from './components/Header'
import Search from './components/Search'
import UserHint from './components/UserHint'




// Create a random choice funtion which takes in an array and returns a random index number. This is a closure!
const randomChoice = arr => {
  const randIndex = Math.floor(Math.random()*arr.length);
  console.log(arr[randIndex]);
  return arr[randIndex];
};

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      // default states
      searchTerm:'',
      hintText: '',
      loading: false,
      // Creating an empty array for adding gifs to
      gifs: [],   
    };
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this)
  }
 
  // A function that searches the giphy api using fetch and puts the search term into the query url and then we can use the results
  searchGiphy = async searchTerm => {
    this.setState({
      // Here we set loading state to true to show spinner
      loading:true
    })


    // first try fetch, if it fails it gets caught below
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}=${searchTerm}&limit=25&offset=0&rating=PG&lang=en`
      )
      //here the raw response is converted in json data
      //instead of typing data.data we ca use this {data}
      const {data} = await response.json();

      // Here we check if the array of results is empty
      //  if it is we throw and error which will stop the
      // code here and handle it in the catch area

      if(!data.length){
        throw `Nothing Found for ${searchTerm}`
      }

      // Here we can grab a random gif from our image object
      const randomGif = randomChoice(data);
      
      // console.log(data);
      this.setState((prevState, props) => ({
        ...prevState,
        // here we use spread to take previous gifs and then spread them out, ten add new random gif to the end
        gifs: [...prevState.gifs,randomGif ],
        // Turn off the loading spinner again
        loading: false,
        hintText: `Hit enter to see more ${searchTerm}`
      }))
        // console.log(this.state.gif.index);
      // console.log(data[Math.floor(Math.random()*data.length)]);
    } catch (error){
      this.setState((prevState, props)=>({
        ...prevState,
        hintText: error,
        loading: false,
      }));
      console.log(error)
    }
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
  };

 // Method for focusing the textInput
 focusTextInput() {
  // textInput must be declared here so the ref can refer to it
 // Explicitly focus the text input using the raw DOM API
 // Note: we're accessing "current" to get the DOM node
 this.textInput.current.focus();
} 
  // Method that resets the set, through clearing everything out and making it default again
  clearSearch = () => {
    this.focusTextInput();
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm:'',
      hintText: '',
      loading: false,
      gifs: [],
      
    })
    )
    //Here we grab the input and then focus the cursor back into it

  }



  render() {
    // const { searchTerm, gif, gifs, index } = this.state;
    return(
      <div className="page">
        <Header 
          clearSearch = {this.clearSearch} 
          gifs={this.state.gifs} 
          focusTextInput = {this.focusTextInput}
        />
       
        
        <Search 
          // Items held in the state are passed down like this         
          gifs={this.state.gifs} 
          searchTerm={this.state.searchTerm} 
          // methods/functions that manipulate state are passed down like this
          handleKeyPress={this.handleKeyPress} 
          handleChange={this.handleChange} 
          ref={this.state.textInput}
        />
        {/* here we pass out userHint and all of our state using a spread operator */}
        <UserHint {...this.state} />
      </div>
    )
  };
}

export default App;
