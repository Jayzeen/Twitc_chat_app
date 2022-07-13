import React from 'react'
import ReactPlayer from 'react-player'

import video from '../assets/Earth.mp4'

const Video = () => {
  return (
    <div className="video-container">
      <ReactPlayer
        className="video_box"
        url={video}
        muted={true}
        controls={false}
        playing={true}
        loop={true}
        width={'100%'}
        height={'98%'}
      />
    </div>
  )
}

export default Video