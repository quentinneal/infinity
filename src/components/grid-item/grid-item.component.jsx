/* React */
import React, {useState} from 'react';

/* Styles */
import './grid-item.styles.scss';

/* SVG Icons */
import { ReactComponent as EnterExitIcon } from '../../assets/circle-xmark-solid.svg';
import { ReactComponent as InfoIcon } from '../../assets/circle-info-solid.svg';

const GridItem = ({ intersectionRef, handleReadMore, title, alt, image, description, readMore, i }) => {

    const [showDescription, setShowDescription] = useState(false); // Image description

    const handleDescription = (e) => {
        setShowDescription(prevDescription => !prevDescription);
    }

    return (
        <div  className={`grid-item ${readMore ? 'open' : 'closed'}`}>
            {intersectionRef // If intersection reference prop exists, render image with intersectionRef reference (intersection target)
            ?
            <img ref={intersectionRef} className="image" alt={alt} src={image} />
            :
            <img className="image" alt={alt} src={image} />}
            <div className="grid-item-icon enter">
                <EnterExitIcon className='enter-icon' onClick={() => handleReadMore(i, readMore)}/>
            </div>
            <div className="grid-item-overlay">
                <div className="grid-item-top-row">
                    <div className="grid-item-icon exit">
                        <InfoIcon className='info-icon' onClick={handleDescription}/>
                    </div>
                    <div className="grid-item-icon exit">
                        <EnterExitIcon className='exit-icon' onClick={() => handleReadMore(i, readMore)}/>
                    </div>
                </div>
                <div className="grid-item-bottom-row">
                    <div className="grid-item-title"><span>{title}</span></div>
                </div>
            </div>
            
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
        </div>
    );
}

export default GridItem;