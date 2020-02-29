import React, {Component} from 'react'
import Gif from './Gif'



class Search extends Component {

  render(){
    const { searchTerm, gifs } = this.props;
    return(
        <div className="search grid">
          {/* Stack of gif images */}
          {/* here we loop over our array of gif images fromt he state and create multiple videos from it */}
         
          {gifs.map((gif,i) =>
          //  spread out all of our properties onto the gif component                                                                   
            <Gif key={i}{...gif}/>
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