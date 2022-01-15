/* React */
import React from 'react';

/* Styles */
import './info.styles.scss';

/* SVG Icons */
import { ReactComponent as EnterExitIcon } from '../../assets/circle-xmark-solid.svg';

const Info = ({title, alt, image, description, handleDescription, showDescription}) => {
    return (
        <div className={`details-background ${showDescription ? 'open-details' : 'close-details'}`} onClick={handleDescription}>
            <div className="details-container">
                <div className="image-container" onClick={(e) => e.stopPropagation()}><img className="image-box" alt={alt} src={image} /></div>
                <div className="description-container" onClick={(e) => e.stopPropagation()}>
                    <div className="description-header">
                        <div className="description-title">{title}</div>
                        <div className="grid-item-icon exit">
                            <EnterExitIcon className='exit-icon' onClick={handleDescription}/>
                        </div>
                    </div>
                    <div className="description-text-container">
                    <div className="description-text">{description}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info;