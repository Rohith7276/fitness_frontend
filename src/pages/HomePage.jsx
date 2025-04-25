import { useChatStore } from "../store/useChatStore";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Book, BookA, BotMessageSquare, BrainCircuit, Earth, MoveLeft, WholeWord, Youtube } from 'lucide-react';

import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import PDFReader from "../components/PdfReader";
import UploadPDF from "../components/UploadFile";
import { useAuthStore } from "../store/useAuthStore";
import VideoStream from "../components/VideoStream";
import WebsiteViewer from "../components/WebsiteStream";
import YouTubePlayer from "../components/YouTubePlayer"

const HomePage = () => {
  const { selectedUser, streamMode, setStreamData, videoCall, setStreamYoutube, streamYoutube, endStream, streamStart, streamData, createStream } = useChatStore();
  const { authUser } = useAuthStore();
  const [videoId, setVideoId] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [startStreaming, setStartStreaming] = useState(false)
  const [startYoutubeStreaming, setstartYoutubeStreaming] = useState(false)
  const [startWebsiteStreaming, setStartWebsiteStreaming] = useState(false)
  const [pdfUrl, setPdfUrl] = useState("");

  // Function to handle uploaded file path
  const handleUpload = (data) => {
    setPdfUrl(data.fileUrl);
    // setStreamData(data) 
    console.log("Uploaded PDF Path:", data.fileUrl);

  };
  const handleStartStream = () => {
    setstartYoutubeStreaming(true)
    const streamDatas = {
      videoUrl: videoId,
      title,
      description: desc,
      groupId: selectedUser._id,
      recieverId: selectedUser._id
    }
    createStream(streamDatas)
    // createYoutubeStream()
  }
  useEffect(() => {
    setStartStreaming(false)
    setPdfUrl(streamData?.streamInfo?.pdfUrl)
    console.log("streamData", streamData)
    streamStart()
  }, [streamMode])

  // const createYoutubeStream = async () => { 
  //   try {
      
  //       const uploadData = {title, description:desc, videoUrl: videoId, groupId: selectedUser._id, recieverId: selectedUser._id } 
  //       createStream(uploadData)
  //       console.log('uploadData', uploadData) 
  //   } catch (err) {
  //       console.error(err);
  //       toast.error("File upload failed"); 
  //   }
// };/

  return (
    <div className="h-screen overflow-y-scroll bg-base-200">
      <div className="flex items-center gap-0.5 justify-center pt-20 px-4">
        <div className={`bg-base-100 rounded-l-lg shadow-lg ${streamMode ? "w-[35vw] h-[calc(100vh-6rem)]" : "max-w-7xl h-[calc(100vh-8rem)]"}`}>
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
        <div className={`bg-base-100 rounded-r-lg shadow-lg overflow-y-scroll ${streamMode ? "w-[63vw] h-[calc(100vh-6rem)]" : "hidden"}`}>

          {startStreaming ?

            streamYoutube ?
              <div className="h-full">
                <div className={` ${streamData.length == 0 ? "" : "hidden"}  p-4 space-y-4 flex flex-col mx-4 justify-center   h-[90%] `}>
                  <div className="flex justify-between my-4 mx-1 items-center">
                    <h1 className="text-xl font-bold flex">Stream Seamlessly using <span className="ml-2 text-base-300 invert ">RapidFit</span> <BotMessageSquare className="w-6 mr-2 ml-1 h-6 text-primary " />Streams</h1>

                  </div>
                  <input
                    type="text"
                    placeholder="Enter the URL of the video"
                    onChange={(e) => setVideoId(e.target.value)}
                    className="input input-bordered w-full"
                  />
                  <input
                    type="text"
                    placeholder="Enter the title of the video"
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered w-full"
                  />
                  <input
                    type="text"
                    placeholder="Enter the description of the video"
                    onChange={(e) => setDesc(e.target.value)}
                    className="input input-bordered w-full"
                  />
                  <button

                    onClick={() => handleStartStream()}
                    className="btn   btn-primary w-full"
                  >
                    Start Streaming
                  </button>
                </div>
                { (startYoutubeStreaming || streamData?.streamInfo?.type == "video") && 
                <YouTubePlayer videoId={videoId || streamData?.streamInfo?.videoUrl} />
                } 

               </div>
              : startWebsiteStreaming ? <WebsiteViewer /> :
                <div>

                  {streamData.length == 0 ? <UploadPDF onUpload={handleUpload} />
                    :
                    <div>

                      <h1>{streamData[0]?.streamInfo?.title}</h1>
                      <h1>{streamData[0]?.streamInfo?.desc}</h1>
                      <div rel="noopener noreferrer" >

                        <PDFReader pdfUrl={pdfUrl} />
                      </div>
                    </div>
                  }
                </div> :
            <div className="flex flex-col justify-center gap-[10vh]   h-full items-center  p-4">
              <h1 className="text-xl font-semibold">Select a source to stream</h1>
              <div className="flex h-[50vh] gap-11 ">
                <button
                  onClick={() => {
                    setStreamYoutube(true);
                    setStartStreaming(true);
                    setStartWebsiteStreaming(false);

                  }}
                  className="px-4 py-4 h-[40vh] flex-col justify-center items-center text-3xl w-[15vw] flex gap-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <Youtube className="size-[4rem]" />
                  YouTube
                </button>
                <button
                  onClick={() => {
                    setStreamYoutube(false);
                    setStartStreaming(true);
                    setStartWebsiteStreaming(false);

                  }}
                  className="px-4 py-2 flex-col items-center justify-center text-3xl flex gap-4 h-[40vh] w-[15vw] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Book className="size-[4rem]" /> PDF
                </button>
                <button
                  onClick={() => {
                    setStreamYoutube(false);
                    setStartWebsiteStreaming(true);
                    setStartStreaming(true);
                  }}
                  className="px-4 py-2 flex-col items-center justify-center text-3xl flex gap-4 h-[40vh] w-[15vw] bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  <Earth className="size-[4rem]" /> Website
                </button>
              </div>
            </div>

          }

        </div>
      </div>
    </div>
  );
};
export default HomePage;