import React, { Component, Fragment } from 'react'
import { ModalComponent } from '../ModalComponent';

export class LayerModifyComponent extends Component {
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
            <button key={index} onClick={btn.onClick}>
                {btn.text}
            </button>
        ))
        return (
            <ModalComponent
                title={modalTitle}
                open={open}
                onClose={onClose}
                bottomContent={<Fragment>{_bottomContent}</Fragment>}
            >
                Url: <input type="url"
                    onChange={onUrlChange}
                    value={url}
                    placeholder="type geoserver wms url"
                />

                Name: <input type="text"
                    onChange={onLayerTitleChange}
                    value={layerTitle}
                    placeholder="Layer Name"
                />
                Nested/Inner Layers
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="add-layer-nested-layer-container">
                    <textarea
                        placeholder="we parse nested layers using comma ','"
                        onChange={onNestedLayersTextChange}
                        value={nestedLayersText}>
                    </textarea>
                    <div>
                        <ul>
                            {layersArray.map((ll, index) => {
                                return <li key={index}>
                                    {ll}
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </ModalComponent>
        )
    }
}
