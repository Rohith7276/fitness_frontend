import { useEffect, useRef, useState } from "react";  
import { formatMessageTime } from "../lib/utils";
import {  TvMinimalPlay, X, Video } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => { 
  const { onlineUsers } = useAuthStore();
  const [streamHover, setStreamHover] = useState(false)
  const { sendMessage, setSelectedUser, setStreamData } = useChatStore(); 
  const {
    selectedUser,
    streamMode,
    videoCall,
    setVideoCall,
    setStreamMode,
    streamData,
    setStreamYoutube, 
    setStartStreaming,
  } = useChatStore();
  const handleStream = () => {
    setStreamMode(!streamMode) 
    setStartStreaming(false)
    setStreamYoutube(false)
    console.log("HI")
  }
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img loading="blur"src={selectedUser.name?selectedUser.profilePic || "/group.png": selectedUser.profilePic || "/avatar.png"} alt={selectedUser?.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName || selectedUser.name}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex justify-between gap-8 mr-2 items-center">

        <button className={`  btn btn-circle  ${videoCall  ? "text-red-500" : "text-zinc-400"} `} onClick={()=> setVideoCall(!videoCall)} >
              <Video/>

          </button>

          {/* //video stream */}
          <button className={` streamIcon btn btn-circle  ${streamData.length != 0 ? "text-red-500" : "text-zinc-400"} `} onClick={handleStream} type="button"  >
            {streamData.length != 0 && <div className=" p-1 z-10 bg-base-content max-w-74 rounded-md  absolute mt-[22vh] max-h-30 streamInfo text-base-200">
              <div className="p-2  ">

                <div className="flex gap-1 items-center justify-center flex-col w-full">

                  <h1 className="text-base-50 font-bold text-xl">{streamData?.streamInfo?.title}</h1>
                  <h1>{streamData?.streamInfo?.description}</h1>
                </div>
                <div className="flex gap-2 items-center justify-center ">

                  <h1>Created by  </h1>
                  <img className="size-6 object-cover rounded-full" src={streamData?.senderInfo?.profilePic} alt="profile" />
                  <h1> {streamData?.senderInfo?.fullName}</h1>
                  <h1>
                    {"on " + new Date(streamData?.createdAt).toDateString() + " at " + formatMessageTime(new Date(streamData?.createdAt))}

                  </h1>
                </div>

              </div>
            </div>}
            <TvMinimalPlay />
          </button>
        {/* Close button */}
        <button onClick={() => {setSelectedUser(null); setStreamData([])}}>
          <X />
        </button>
        </div>

      </div>
    </div>
  );
};
export default ChatHeader;