import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, TvMinimalPlay, Send, X, Video } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const MessageInput = () => {

  const {
    selectedUser,
    streamMode,
    videoCall,
    setVideoCall,
    setStreamMode,
    streamData,
    streamSet, 
    getStreamAiMessage
  } = useChatStore();

  const [streamHover, setStreamHover] = useState(false)
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { getAiMessage } = useChatStore();
  const { authUser } = useAuthStore();
  const [aiMes, setAiMes] = useState("")

  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {

    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setText("")
  }, [selectedUser])


  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  useEffect(() => {
    if(streamData.length != 0 && streamMode){
      
    }
  }, [streamData, streamMode])
  

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      setText("");
      let x = imagePreview;
      let y = text.trim();
      setImagePreview(null)
      if (fileInputRef.current) fileInputRef.current.value = "";
      await sendMessage({
        text: y,
        image: x,
      });
      if (aiMes.trim() !== "") {
        if (streamData.length != 0 && streamMode ==false) {

          await getAiMessage({
            input: aiMes,
            user: authUser.fullName
          });
        }
        else {
          await getStreamAiMessage({
            input: aiMes,
            user: authUser.fullName, 
          });
        }
      }
      setAiMes("");


      // Clear form
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleInput = (e) => {
    let value = e.target.value
    if (value.includes("@rapid")) {
      let x = value.substring(value.indexOf("@rapid") + 6);
      e.target.style.color = "skyblue";
      e.target.style.fontWeight = "bold"

      setAiMes(x);
    }
    else { e.target.style.color = "inherit"; e.target.style.fontWeight = "normal" }
    setText(value);
  }

  const handleStream = () => {
    setStreamMode(!streamMode)
  }


  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img loading="blur"
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => handleInput(e)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

      

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle "
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;