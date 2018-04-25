import React from 'react';
import VideosList from '../../../widgets/VideoList/videosList';

const VideosMain = () => {
    return(
        <VideosList
            type="card"
            title={false}
            loadmore={true}
            start={0}
            amount={3}
        />
    )
}

export default VideosMain;
