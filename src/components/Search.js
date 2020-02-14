import React, {Component} from 'react'



class Search extends Component {





  // When we have 2 or more characters in our search box and once enter has been pressed return gifs


  render(){
    const { searchTerm, gif } = this.props;

    return(
      <div className="search grid">
      {/* Stack of gif images */}
      {/* Only renders when we have a gif in the state  */}
      {gif && (
        <video
          className='grid-item video'
          autoPlay
          loop
          src={gif.images.original.mp4}
          />
       )}
      {/* Input field */}
      <input
        className="input grid-item"
        placeholder="Type Something"
        // run a function
        onChange={this.props.handleChange}
        // Grabbing info about what key is pressed, we are interested in enter
        onKeyPress={this.props.handleKeyPress}
        // Using the value in the state
        value={searchTerm}
        />
    </div>
    )
  }
}

export default Search;