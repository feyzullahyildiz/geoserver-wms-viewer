import React from 'react';

export const Layer = (props) => {
    let layers
    if (props.data) {
        layers = props.data.info.layers.map((item, index) => {

            return <li key={index}>
                <a key={index} className={item.visible === true ? 'active' : ''}
                    onClick={(e) => props.onLayerClick(e, props.data, item)}>
                    {item.layerName.split(':')[1]}
                </a></li>
        })
    }
    return (
        <div>
            {layers}
        </div>
    )
}
