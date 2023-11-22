import "./chat.css"
import { useEffect, useState } from "react"
import axios from "axios"
import Topbar from "../../components/topbar/Topbar"
import SideMenu from "../../components/sideMenu/SideMenu"
import ChatBubble from "../../components/chatBubble/ChatBubble"
import Conversation from "../../components/conversation/Conversation"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"


export default function Chat() {
    const [conversationsArr, setConversationsArr] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { user } = useContext(AuthContext);

    // to get all the conversations the current user has with other users
    useEffect(() => {
        const getConversations = async () => {
            const res = await axios.get("http://localhost:8800/api/conversations/" + user._id);
            try {
                setConversationsArr(res.data);
            } catch (error) {
                console.error("Error fetching conversations", error);
            }
        };
        getConversations();
    }, [user._id]);

    // to get the messages in the current conversation the user selected
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/messages/" + currentConversation?._id);
                setMessages(res.data);
            } catch (error) {
                console.error("Error fetching messages", error);
            }
        };
        getMessages();
    }, [currentConversation]);


    const handleChatSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentConversation._id,
        };

        try {
            const res = await axios.post("http://localhost:8800/api/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    return (
        <>
            <Topbar />
            <div className="messenger">
                <SideMenu />
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentConversation ?
                            (<>
                                <div className="chatBubbles">
                                    {messages.map((m) => (
                                        <ChatBubble key={m._id}
                                        message={m} own={m.sender === user._id} />
                                    ))}
                                </div>
                                <div className="chatInput">
                                    <textarea
                                        className="chatInputField"
                                        placeholder="Write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <button className="chatSubmitButton" onClick={handleChatSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>)
                            :
                            (<span className="noConversationText">
                                Open a conversation to start a chat.
                            </span>
                            )}
                    </div>
                </div>

                <div className="chatContactsBar">
                    <input placeholder="Search for contacts" className="chatContactsInput" />
                    {conversationsArr.map((c) => (
                        <div onClick={() => setCurrentConversation(c)}>
                            <Conversation key={c._id} conversation={c} currentUser={user} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
