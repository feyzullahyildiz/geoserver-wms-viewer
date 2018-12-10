import React, { Component } from 'react'
import './style.css'
import Button from '@material-ui/core/Button'
import MapIcon from '@material-ui/icons/Map'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Slider from '@material-ui/lab/Slider'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'

export class BasemapComponent extends Component {
    render() {
        const { opacity, onOpacityChange, children } = this.props
        return (
            <div className="basemap-component">
                <div className="basemap-visible-manager">
                    <Button variant="fab" color="primary" mini>
                        <MapIcon />
                    </Button>
                </div>
                <div className="basemap-content">
                    <Card>
                        <CardContent style={{ padding: '8px' }}>
                            <List>
                                {children}
                            </List>
                        </CardContent>
                        <div style={{ padding: '8px' }}>
                            <Slider style={{ padding: '0.8rem 0' }} onChange={onOpacityChange}
                                value={opacity}
                                min={0} max={1} step={0.1}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}
export class BasemapItemComponent extends Component {
    render() {
        const { visible, onClick, children } = this.props

        return (
            <ListItem style={{ padding: '8px', whiteSpace: 'nowrap' }} button selected={visible} onClick={onClick}>
                {children}
            </ListItem>
        )
    }
}
