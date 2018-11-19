import React, { Component } from 'react'

import SettingsIcon from '@material-ui/icons/Settings'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

class _MapSettingsComponent extends Component {
  render() {
    const { classes, onMapPositionSet } = this.props
    return (
      <div className="map-settings-component">
        <div className="map-settings-visible-manager">
          <Button variant="fab" color="primary" mini>
            <SettingsIcon fontSize="small" />
          </Button>
        </div>
        <div className="map-settings-content">
          <Card>
            <CardContent>
              <Button onClick={onMapPositionSet} className={classes.button} variant="contained" color="primary">Set current map position to default</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}
const styles = theme => ({
  button: {
    display: 'block',
    // fontSize: '.5rem'
  }
})
const MapSettingsComponent = withStyles(styles)(_MapSettingsComponent)
export { MapSettingsComponent }
