/* React */
import React, {useState} from 'react';

/* Styles */
import './grid-item.styles.scss';

/* SVG Icons */
import { ReactComponent as EnterExitIcon } from '../../assets/circle-xmark-solid.svg';
import { ReactComponent as InfoIcon } from '../../assets/circle-info-solid.svg';

import Info from '../info/info.component';

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
            <Info
                title={title} 
                alt={alt}
                image={image}
                description={description}
                handleDescription={handleDescription}
                showDescription={showDescription}
            />
            
        </div>
    );
}

export default GridItem;