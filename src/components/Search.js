import React, {Component} from 'react'

class Search extends Component {

   handleKeyPress = event => {
    
  }
   handleChange = event => {
    //const value = event.target.value
    const {value} = event.target;
  }
  render(){
    return(
      <div className="search grid">
        <input
          className="input grid-item"
          placeholder="Type Something"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          />
      </div>
    )
  }
}

export default Search;