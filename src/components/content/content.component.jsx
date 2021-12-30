/* React */
import React from 'react';

/* Styles */
import './content.styles.scss';

/* Components */
import ImageGrid from '../image-grid/image-grid.component';
import LoadingBar from '../loading-bar/loading-bar.component';
import ErrorBar from '../error-bar/error-bar.component';

const Content = ({ nasaData, handleReadMore, intersectionRef, loading, error }) => {
    return (
        <div className="content">
            <ImageGrid intersectionRef={intersectionRef} nasaData={nasaData} handleReadMore={handleReadMore}/>
            {loading && !error &&
                <LoadingBar />
            }
            {error &&
                <ErrorBar />
            }
        </div>
    )
}

export default Content;