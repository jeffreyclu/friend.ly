import React from 'react';
import { render } from 'react-dom';
import ChatroomContainer from './components/ChatroomContainer.jsx';

import styles from './scss/chatroom.scss';

render(<ChatroomContainer />, document.getElementById('chatroomroot'));
