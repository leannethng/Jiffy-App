import React, { Component } from 'react'
import closeIcon from '../images/close-icon.svg'

class Header extends Component {

  render(){
   const {clearSearch, gifs, focusTextInput} = this.props;
   console.log(focusTextInput)
    const hasResults = gifs.length > 0;
    console.log(hasResults)
    return(

      <div className="header grid">
        {/* if we have results show the clear button otherwise show the title */}
        {hasResults ? <button onClick={clearSearch}><img className='block mx-auto' src={closeIcon} alt="clear icon"/> </button> : <h1 className="title">Jiffy</h1>}
        
      </div>
    )
  }
};

export default Header