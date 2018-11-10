import React, { Component } from 'react'
import './style.css'
export class ModalComponent extends Component {
    render() {
        const { open, children, onClose, title, bottomContent } = this.props
        return (

            <div className={`modal-backdrop ${open ? 'open' : ''}`}>

                <div className="modal-container">
                    <header className="modal-header">
                        <span className="modal-title">{title}</span>
                        <span className="modal-close" onClick={onClose}>&times;</span>
                    </header>

                    <div className="modal-body">
                        {children}
                    </div>

                    <footer className="modal-footer">
                        {bottomContent}
                    </footer>
                </div>

            </div>
        )
    }
}
