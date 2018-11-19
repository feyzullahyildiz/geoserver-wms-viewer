import React, { Component } from 'react'
import { MapSettingsComponent } from '../components/MapSettingsComponent';
import { connect } from 'react-redux'
import { mapPosition } from '../rxjs/subjects'
class _MapSettingsContainer extends Component {
  constructor(){
    super()
    this.onMapPositionSet = this.onMapPositionSet.bind(this)
  }
  onMapPositionSet(){
    mapPosition.next()
  }
  render() {
    return (
        <MapSettingsComponent onMapPositionSet={this.onMapPositionSet}/>
    )
  }
}

const mapStateToProps = (state) => ({

})

const MapSettingsContainer = connect(mapStateToProps)(_MapSettingsContainer)
export { MapSettingsContainer }
