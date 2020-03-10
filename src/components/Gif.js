import React, {Component} from 'react'

class Gif extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false
    }
  }
  render(){
    const {loaded} = this.state;
    const {images} = this.props;
    
    return (
      <video
      // when we have the loaded state as true we add a loaded class
        className={`grid-item video ${loaded ? 'loaded': ''}`}
        autoPlay
        loop
        src={images.original.mp4}
        // when the video loads we set the loaded state ot be true
        onLoadedData={() => this.setState({loaded: true})}
      />
    )}
}

export default Gif;