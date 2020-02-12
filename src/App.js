import React, {Component} from 'react'
import Header from './components/Header'
// import Search from './components/Search'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      // default state, can't be updated
      searchTerm:''
    }
  }
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
        searchTerm: value
      }));
      
      if (value.length > 2){
        console.log('This is a valid search term');
        return true;
      }
    };
   
   handleKeyPress = event => {
    const {value} = event.target;
    console.log(value);
    if (value.length > 2 && event.key === 'Enter'){
      console.log(`Search for ${value}`);
      
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
      <h1>{searchTerm}</h1>
      </div>
    )
  };
}

export default App;
