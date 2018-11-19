import React, { Component } from 'react';
// import CheckboxComponent from '../CheckboxComponent'
import PropTypes from 'prop-types'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch'
import Slider from '@material-ui/lab/Slider'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import ClearIcon from '@material-ui/icons/Clear'

class LayerManagerComponent extends Component {
    render() {
        const { title, visible, opacity, onVisibleChanged, onOpacityChanged, children, isEdit, onEditLayer, onDeleteLayer } = this.props

        return (
            <div className={`layer ${isEdit ? 'edit' : ''}`}>


                <div className="layer-main-container">
                    <div className="left">
                        <IconButton onClick={onEditLayer} color="primary">
                            <EditIcon fontSize="small"/>
                        </IconButton>
                        <IconButton onClick={onDeleteLayer} color="secondary">
                            <ClearIcon fontSize="small"/>
                        </IconButton>
                    </div>
                    <div className="right">
                        <FormControlLabel
                            labelPlacement="start"
                            control={
                                <Switch color="primary" checked={visible} onChange={(e, v) => onVisibleChanged(v)} />
                            }
                            label={title}
                        />
                        <Slider style={{ padding: '0.8rem 0', margin: '.4rem' }} onChange={(_, e) => onOpacityChanged(e)}
                            value={opacity}
                            min={0} max={1} step={0.1}
                        />
                    </div>
                </div>


                <div className="nested-layers">
                <FormGroup>
                    {
                        children.map((ll, index) => {
                            // return <CheckboxComponent
                            //     onChange={ll.onToggled}
                            //     checked={ll.visible}
                            //     key={ll.key + index}
                            //     size="small"
                            // >
                            //     {ll.layerName}
                            // </CheckboxComponent>
                            return <FormControlLabel
                            key={ll.key + index}
                                labelPlacement="start"
                                control={
                                    <Switch checked={ll.visible} onChange={(e, v) => ll.onToggled(v)} />
                                }
                                label={ll.layerName}
                            />
                        })
                    }
                    </FormGroup>
                </div>
            </div>
        );
    }
}
// LayerManagerComponent.defaultProps = {
//     isEdit: ''
// }
LayerManagerComponent.propTypes = {
    isEdit: PropTypes.bool,
    onEditLayer: PropTypes.func,
    onDeleteLayer: PropTypes.func
}
export default LayerManagerComponent;