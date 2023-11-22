import React from 'react';
import './chatBubble.css';
import { formatDistanceToNow, parseISO } from 'date-fns';

export default function ChatBubble({ own, message }) {
  const createdAt = parseISO(message.createdAt);
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <div className={own ? 'own bubble' : 'bubble'}>
      <div className="messageText">
        <p>{message.text}</p>
      </div>
      <div className="messageTime">{timeAgo}</div>
    </div>
  );
}





