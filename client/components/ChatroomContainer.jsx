import React, { Component } from 'react';
import NavbarLoggedIn from './NavbarLoggedIn.jsx';

class ChatroomContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return(
            <div>
                <NavbarLoggedIn />
                <h3>Chatroom</h3>
            </div>
        );
    };
};

export default ChatroomContainer;