import React, {Component} from 'react'
import loader from '../images/loader.svg'


class UserHint extends Component {
  render(){
    const { loading, hintText} = this.props;
    return(
      
        <div className='user-hint'>
          {/* Check if we have a loading state and render out either the spinner image or hint text. This is a ternary operator  */}
          {loading ? <img className='block mx-auto' src={loader} alt="loading spinner"/> : hintText}
        </div>
    

    )
  }}

  export default UserHint;