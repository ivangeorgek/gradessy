import { useState, useEffect } from "react";
import axios from "axios";
import "./conversation.css";

// This function displays a conversation between the current user and another user.
export default function Conversation({ conversation, currentUser }) {
  // This state stores the user data for the friend involved in the conversation.
  const [user, setUser] = useState(null);

  // Fetch the user data for the friend involved in the conversation.
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get the friend's ID from the conversation object.
        const friendId = getFriendId(conversation, currentUser._id);
        console.log(friendId);

        // Make an API call to get the friend's user data.
        const response = await axios.get(`http://localhost:8800/api/users/userid/${friendId}`);

        // Update the state with the friend's user data.
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [currentUser, conversation]);

  // This function returns the friend's ID from the conversation object.
  function getFriendId(conversation, currentUserId) {
    return conversation.members.find((member) => member !== currentUserId);
  }

  return (
    <div className="conversation">
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}

