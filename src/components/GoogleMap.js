import React, { Component } from 'react'

class GoogleMap extends Component {
  render() {
    return (
      // Important! Always set the container height explicitly
      <div class="GoogleMaps--Container">
        <div class="GoogleMaps--Canvas">
          <iframe title="Google Maps" width="100%" height="500" id="GoogleMaps--Canvas" src="https://maps.google.com/maps?q=Earth%20and%20Fire%20Brewing%20Company&t=&z=14&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </div>
      </div>
    )
  }
}

export default GoogleMap
