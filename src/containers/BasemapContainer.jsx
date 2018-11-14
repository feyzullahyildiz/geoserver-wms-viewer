import React, { Component } from 'react'
import { BasemapComponent, BasemapItemComponent } from '../components/BasemapComponent';
import { connect } from 'react-redux'
import { changeBasemapOpacity, changeActiveBasemap } from '../redux/actions/action-basemaps'
class BasemapContainer extends Component {
    constructor() {
        super()
        this.onBasemapChange = this.onBasemapChange.bind(this)
        this.onOpacityChange = this.onOpacityChange.bind(this)
    }
    onBasemapChange(basemap) {

        this.props.changeactivebasemap(basemap)
    }
    onOpacityChange(basemap, opacity) {
        this.props.changebasemapopacity(basemap, opacity)
    }
    render() {
        const { basemaps } = this.props
        const activeBasemap = basemaps.find(b => b.visible)
        const basemapItems = basemaps.map((basemap, index) => {
            return <BasemapItemComponent
                key={index}
                onClick={() => this.onBasemapChange(basemap)}
                visible={basemap.visible}
            >
                {basemap.title}
            </BasemapItemComponent>
        })
        return (
            <BasemapComponent
                opacity={activeBasemap.opacity}
                onOpacityChange={(val) => this.onOpacityChange(activeBasemap, val)}>
                {basemapItems}
            </BasemapComponent>
        )
    }
}
const mapStateToProps = (state) => ({
    basemaps: state.basemaps
})
const mapDispatchToProps = (dispatch) => ({
    changebasemapopacity: (basemap, opacity) => dispatch(changeBasemapOpacity(basemap, opacity)),
    changeactivebasemap: (basemap) => dispatch(changeActiveBasemap(basemap)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BasemapContainer)