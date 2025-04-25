import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";
const YouTubePlayer = ({ videoId, userId }) => {
  const playerRef = useRef(null);
  const [pausedTime, setPausedTime] = useState(0);
  const [startVideo, setStartVideo] = useState(false)
  const { setPdfScroll, pdfCheck, pdfScrollTop, setStreamData, setStartStreaming, endStream, streamData,setVideoPause, videoPause, selectedUser } = useChatStore()
  const { authUser } = useAuthStore()
const [followStream, setFollowStream] = useState(false)

  useEffect(() => {
    console.log("pdfScrollTop", pdfScrollTop)
    if(playerRef.current && startVideo ){
      setPdfScroll(playerRef.current?.seekTo(pdfScrollTop))
    }       
  }, [pdfScrollTop])
  
  useEffect(() => { 
    console.log("videoPause", videoPause)
    if(playerRef.current && startVideo && videoPause ){
      playerRef.current.pauseVideo()
    }
    setVideoPause(false)
  }, [videoPause])
  


  useEffect(() => {
    console.log(videoId)
    const loadYouTubeAPI = () => {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    };

    if (!window.YT) {
      loadYouTubeAPI();
    } else {
      createPlayer();
    }

    window.onYouTubeIframeAPIReady = createPlayer;

    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  useEffect(() => {           
    console.log("pdf check")
    if(playerRef.current && startVideo){
      setPdfScroll(playerRef.current.getCurrentTime())
    }
       
}, [pdfCheck]);

const handleClick = ()=>{
  if(playerRef.current && startVideo){
    console.log(playerRef.current.getCurrentTime())
  }
}

  const createPlayer = () => {
    console.log(videoId)
    const url = new URL(videoId);
    const videoIdParam = url.searchParams.get("v");
    console.log(videoIdParam)
    playerRef.current = new window.YT.Player("player", {
      videoId: videoIdParam,
      events: {
        onStateChange: onPlayerStateChange, 
      },
    });
  };

  const onPlayerStateChange = async(event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setStartVideo(true)
      // if (playerRef.current) {
        //   console.log(playerRef.current.getCurrentTime());
        // }
      //   const time = playerRef.current.getCurrentTime();
      
      // alert(time)
      // setPausedTime(time);
      // savePauseTime(time);
    }
    else if (event.data === window.YT.PlayerState.PAUSED && streamData?.senderInfo?._id === authUser._id) {
      await axiosInstance.get(
        `/auth/user/stream-control/${selectedUser._id}/999998/${streamData._id}`
      );
    }
 

  };

  const savePauseTime = async (time) => {
    try {
      //   await axios.post("http://localhost:5000/save-pause-time", {
      //     userId,
      //     videoId,
      //     pausedTime: time,
      //   });
      // alert("Paused time saved:" + time);
      
    } catch (error) {
      console.error("Error saving pause time:", error);
    }
  };

  return (
    <div>
      <h2 className="flex justify-center items-center my-1"> Video streaming by <span className="ml-2 mr-1"><img className="size-6 object-cover rounded-full" src={streamData?.senderInfo?.profilePic} alt="profile" /></span> <span>{streamData?.senderInfo?.fullName}</span></h2>

         tggg<div id="player" className="w-[36rem] m-auto h[20rem] overflow-hidden"></div>

      <div className="w-full max-w-4xl h-[75vh] border border-gray-300 rounded-lg overflow-hidden shadow-md">
      <button onClick={handleClick}>click</button>
        {streamData?.senderInfo?.fullName !== authUser?.fullName && (
          <button
            className="bg-base-content text-base-300 p-2 px-3 rounded-md"
            onClick={async () => {
             if(followStream == false) await axiosInstance.get(
                `/auth/user/stream-control/${selectedUser._id}/999999/${streamData._id}`
              );
              setFollowStream(!followStream)
            }}
          >
            {followStream ? "Unfollow Stream" : "Follow Stream"}
          </button> 
        )}
        {streamData?.senderInfo?.fullName !== authUser?.fullName && (
          <button
            className="bg-base-content text-base-300 p-2 px-3 rounded-md"
            onClick={async () => {
             await axiosInstance.get(
                `/auth/user/stream-control/${selectedUser._id}/999999/${streamData._id}`
              ); 
            }}
          >
           seek
          </button> 
        )}
        {streamData?.senderInfo?.fullName === authUser?.fullName && (
          <button
            className="bg-base-content text-base-300 p-2 px-3 rounded-md"
            onClick={() => {
              setStartStreaming(false);
              setStreamData([]);
              endStream();
            }}
          >
            End Stream
          </button>
        )}
      </div>
    </div>
  );
};

export default YouTubePlayer;
