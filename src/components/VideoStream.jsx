import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import TextToSpeech from "./AudioRecorder"
import { useChatStore } from '../store/useChatStore';
// Removed unused imports

const VideoStream = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [localId, setLocalId] = useState('');
  // Removed unused state variables
  const [status, setStatus] = useState('Waiting to connect...'); // Retained as it is used in the code
  const [statusColor, setStatusColor] = useState('#fcf8e3'); // Retained as it is used in the code
  const [callActive, setCallActive] = useState(false); // Retained as it is used in the code
  const { setVideoId, peerId, getVideoId } = useChatStore()
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);
  const {selectedUser} = useChatStore()
  const currentCallRef = useRef(null); 

  const init = async () => {
    try {

      // Get local video stream
      const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      localVideoRef.current.srcObject = localStream;
      localStreamRef.current = localStream;

      // Create peer
      const peer = new Peer();
      peerRef.current = peer;

      // On peer open
      peer.on('open', (id) => {
        setLocalId(id);
        setVideoId(id)
        setStatus('Ready to connect');
        getVideoId();

      });

      // Handle incoming calls
      peer.on('call', (call) => {
        setStatus('Incoming call...');

        call.answer(localStreamRef.current);
        handleCall(call);
      });

      // Handle errors
      peer.on('error', (err) => {
        console.error('PeerJS error:', err);
        setStatus(`Error: ${err.type}`);
      });
    } catch (err) {
      console.error('Failed to get local stream', err);
      setStatus('Error accessing camera/microphone');
      setStatusColor('#f2dede');
    }
  };
  useEffect(() => {

    init();

    return () => {
      // Cleanup resources on component unmount
      if (peerRef.current) {
        peerRef.current.destroy();
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); 
  
  

  useEffect(() => {
    if (peerId != "" && peerRef.current) {
      startCall(peerId)
      console.log('calling peerid', peerId)


    }
  }, [peerId, peerRef.current])


  const handleCall = (call) => {
    currentCallRef.current = call;
    setCallActive(true);

    setStatus('Connected');
    setStatusColor('#dff0d8');

    console.log('Handling call:', call);
    // Handle stream from remote peer
    call.on('stream', (remoteStream) => {
      remoteVideoRef.current.srcObject = remoteStream;
    });

    // Handle call end
    call.on('close', endCall);
    call.on('error', (err) => {
      console.error('Call error:', err);
      endCall();
    });
  };

  const endCall = () => {
    if (currentCallRef.current) {
      currentCallRef.current.close();
      currentCallRef.current = null;
    }

    remoteVideoRef.current.srcObject = null;
    setCallActive(false);

    setStatus('Call ended');
    setStatusColor('#fcf8e3');
  };

  const startCall = (id) => {
    setStatus('Connecting...');
    console.log("calling")
    if (!id.trim()) {
      alert('Please enter a remote peer ID');
      return;
    }
    console.log("calling here", id)

    setStatusColor('#fcf8e3');

    const call = peerRef.current.call(id, localStreamRef.current);

    handleCall(call);
  };

  // Removed unused function

  return (
    <div className="container w-full h-full flex  items-center justify-start bg-base-200 p-4">

      {/* <div
        className="bg-base-content text-primary-content w-fit m-auto"
        style={{  padding: '10px', borderRadius: '4px', textAlign: 'center' }}
      >
        {status}
      </div> */}

      <div className='flex justify-start mt-[-6rem] ml-[-1rem] flex-col   h-[10vh] items-center  gap-11'>
        <div className='scale-[30%] mx-[-6vw]  h-[10vh] flex justify-center items-center  '>

          <TextToSpeech />
        </div>
       
      </div>
      <div className="video-container items-center" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div className="video-item flex items-center justify-center" style={{ margin: '10px', position: 'relative' }}>
        
          <video ref={localVideoRef} className='h-[40vh] border-2  w-[25vw] border-base-content' autoPlay muted playsInline style={{  borderRadius: '8px' }} />
          <div className="user-label gap-2 flex" style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '5px 10px', borderRadius: '4px' }}>
            You  
          </div>
        </div>
       <div className="video-item" style={{ margin: '10px', position: 'relative' }}>
          <video ref={remoteVideoRef}  className='h-[40vh] border-2  w-[25vw] border-base-content' autoPlay playsInline style={{  borderRadius: '8px' }} />
          <div className="user-label" style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '5px 10px', borderRadius: '4px' }}>
            {selectedUser.fullName}
          </div>
        </div> 

      </div>


      {/* <div>
        <p>Your ID: <span>{localId}</span></p>
        <button onClick={copyIdToClipboard} style={{ margin: '10px', padding: '12px 24px', borderRadius: '50px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>
          Copy ID
        </button>
      </div> */}

      <div>
        {/* <input
          type="text"
          value={remoteId}
          onChange={(e) => setRemoteId(e.target.value)}
          placeholder="Enter remote user ID"
          style={{ padding: '12px', margin: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', width: '300px' }}
        />
         <button
          onClick={startCall}
          disabled={callActive}
          style={{ margin: '10px', padding: '12px 24px', borderRadius: '50px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Start Call
        </button>
        <button
          onClick={endCall}
          disabled={!callActive}
          style={{ margin: '10px', padding: '12px 24px', borderRadius: '50px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          End Call
        </button>   */}

      </div>
    </div>
  );
};

export default VideoStream;
