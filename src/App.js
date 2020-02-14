import React, {Component} from 'react'
import Header from './components/Header'
import Search from './components/Search'
// import in image
import loader from './images/loader.svg'

const UserHint = ({loading, hintText}) => (
  <div className='user-hint'>
    {/* Check if we have a loading state and render out either the spinner image or hint text. This is a ternary operator  */}
    {loading ? <img className='block mx-auto' src={loader}/> : hintText}
  </div>
)

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      // default state, can't be updated
      searchTerm:'',
      hintText: 'Hit enter to search',
    };
    this.searchGiphy = this.searchGiphy.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
   

  }

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
    };
   
   handleKeyPress = event => {
    const {value} = event.target;
    console.log(value);
    if (value.length > 2 && event.key === 'Enter'){
      // console.log(`Search for ${value}`);
      // here we call the search giphy function using the search term
      this.props.searchGiphy(value);
      
    }
    // console.log(event.key);
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
      
      
      this.setState((prevState, props) => ({
        ...prevState,
        // gets the first result and puts it in the state
        gif: data[0],
      }))


    } catch (error){}
  };

  // With create react app , we can write methods inside component as arrow functions instead of using constructor and bind


  render() {
   
    return(
      <div className="page">
        <Header />
        <Search searchGiphy={ this.searchGiphy.bind()}{...this.props}/>
        {/* here we pass out userHint and all of our state using a spread operator */}
        <UserHint {...this.props}/>
      </div>
    )
  };
}

export default App;
