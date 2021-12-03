/* React */
import React from 'react';

/* Styles */
import './grid-item.styles.scss';

/* SVG Icons */
import { ReactComponent as EnterExitIcon } from '../../assets/circle-xmark-solid.svg';
import { ReactComponent as InfoIcon } from '../../assets/circle-info-solid.svg';

const GridItem = ({ intersectionRef, handleReadMore, title, alt, image, readMore, i }) => {
    return (
        <div  className={`grid-item ${readMore ? 'open' : 'closed'}`}>
            <div className="grid-item-icon enter">
                <EnterExitIcon className='enter-icon' onClick={() => handleReadMore(i, readMore)}/>
            </div>
            <div className="grid-item-overlay">
                <div className="grid-item-top-row">
                    <div className="grid-item-icon exit">
                        <InfoIcon className='info-icon'/>
                    </div>
                    <div className="grid-item-icon exit">
                        <EnterExitIcon className='exit-icon' onClick={() => handleReadMore(i, readMore)}/>
                    </div>
                </div>
                <div className="grid-item-bottom-row">
                    <div className="grid-item-title"><span>{title}</span></div>
                </div>
            </div>
            {intersectionRef // If intersection reference prop exists, render image with intersectionRef reference (intersection target)
            ?
            <img ref={intersectionRef} className="image" alt={alt} src={image} />
            :
            <img className="image" alt={alt} src={image} />}
        </div>
    );
}

export default GridItem;