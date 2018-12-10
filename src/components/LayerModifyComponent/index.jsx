import React, { Component, Fragment } from 'react'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class _LayerModifyComponent extends Component {
    render() {
        const {
            modalTitle,
            layerTitle,
            onLayerTitleChange,
            bottomComponent,
            url,
            onUrlChange,
            onClose,
            open,
            onNestedLayersTextChange,
            nestedLayersText,
            layersArray,
        } = this.props
        const _bottomContent = bottomComponent.map((btn, index) => (
            <Button key={index} color="primary" onClick={btn.onClick}>
                {btn.text}
            </Button>
        ))
        return (
            <Dialog
                open={open}
                onClose={onClose}
                scroll='body'
            >
                <DialogTitle>{modalTitle}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="URL"
                        style={{ margin: 8 }}
                        placeholder="http://localhost:8080/geoserver/datas/wms"
                        helperText="Geoserver wms url"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={url}
                        onChange={onUrlChange}
                    />
                    <TextField
                        label="Name"
                        style={{ margin: 8 }}
                        placeholder="My Workspace"
                        fullWidth
                        helperText="Workspace Name"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={layerTitle}
                        onChange={onLayerTitleChange}
                    />
                    <TextField
                        label="NestedLayers"
                        placeholder="myworkspace:pois, myworkspace:lines, myworkspace:polygons"
                        multiline
                        fullWidth
                        style={{ margin: 8 }}
                        margin="normal"
                        value={nestedLayersText}
                        onChange={onNestedLayersTextChange}
                    />
                    <List style={{ margin: 8, maxHeight: 360, overflowY: 'auto' }} dense={true}>
                        {layersArray.map((item, index) => (
                            <Fragment key={index}>
                                <ListItem key={index}>
                                    <ListItemText
                                        key={index}
                                        primary={item}
                                    />
                                </ListItem>
                                <Divider />
                            </Fragment>
                        ))}
                    </List>
                    <DialogActions>
                        {_bottomContent}
                        <Button color="secondary" onClick={onClose}>
                            CLOSE
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

const LayerModifyComponent = _LayerModifyComponent
export { LayerModifyComponent }