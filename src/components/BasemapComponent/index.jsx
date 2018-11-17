import React, { Component } from 'react'
import './style.css'
import Button from '@material-ui/core/Button'
import LayersIcon from '@material-ui/icons/Layers'
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Slider from '@material-ui/lab/Slider'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
export class BasemapComponent extends Component {
    render() {
        const { opacity, onOpacityChange, children } = this.props
        return (
            <div className="basemap-component">
                <div className="visible-manager">
                    <Button variant="fab" color="primary" mini>
                        <LayersIcon />
                    </Button>
                </div>
                <div className="basemap-content">
                    <Card>
                        <CardContent>
                            <List component="nav">
                                {children}
                            </List >
                            <br />
                        </CardContent>
                        <CardContent>

                            <Slider style={{ padding: '0.5rem 0' }} onChange={onOpacityChange}
                                value={opacity}
                                min={0} max={1} step={0.1}
                            />
                        </CardContent>
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
            // <div className="basemap-item">
            //     <button className={visible ? 'active' : ''} onClick={onClick}>{children}</button>
            // </div>
            <ListItem  button selected={visible} onClick={onClick}>
                <ListItemText primary={children} />
            </ListItem>
        )
    }
}
