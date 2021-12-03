/* React */
import React from 'react';

/* Styles */
import './image-grid.styles.scss';

/* Components */
import GridItem from '../grid-item/grid-item.component';

const ImageGrid = ({ nasaData, handleReadMore, intersectionRef }) => {

    return (
        <div className="image-grid">
            {nasaData.map(({data, links, readMore}, i) => (
                nasaData.length === i + 1 // If array length is equal to last index call GridItem with intersectionRef prop
                ?
                    <GridItem 
                        intersectionRef={intersectionRef} 
                        key={data[0].nasa_id} 
                        handleReadMore={handleReadMore} 
                        title={data[0].title} 
                        alt={data[0].title} 
                        image={links[0].href} 
                        readMore={readMore} 
                        i={i} 
                    />
                :
                    <GridItem 
                        key={data[0].nasa_id} 
                        handleReadMore={handleReadMore} 
                        title={data[0].title} 
                        alt={data[0].title} 
                        image={links[0].href} 
                        readMore={readMore} 
                        i={i} 
                    />
            ))}
        </div>
    )
}

export default ImageGrid;