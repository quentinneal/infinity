/* React */
import React from 'react';

/* Styles */
import './content.styles.scss';

/* Components */
import ImageGrid from '../image-grid/image-grid.component';

const Content = ({ nasaData, handleReadMore, intersectionRef }) => {
    return (
        <div className="content">
            <ImageGrid intersectionRef={intersectionRef} nasaData={nasaData} handleReadMore={handleReadMore}/>
        </div>
    )
}

export default Content;