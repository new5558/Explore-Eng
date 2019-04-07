import React, { Component } from 'react';
import firebase from './firebase';

const UserInfoContext = React.createContext();

class UserInfoProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            isLogin: null,
        }
    }

    addUserInfo = (user) => {
        console.log(user, 'userInfo')
        this.setState({
            userInfo: user,
            isLogin: true,
        })
    }

    logout = () => {
        
    }

    deleteUserContext = () => {
        this.setState({ userInfo: {}, isLogin: false })
    }

    render() {
        return (
            <UserInfoContext.Provider value={{
                addUserInfo: this.addUserInfo,
                userInfo: this.state.userInfo,
                isLogin: this.state.isLogin,
                logout: this.logout,
            }}>
                {this.props.children}
            </UserInfoContext.Provider>
        );
    }
}

const UserInfoConsumer = UserInfoContext.Consumer;

export default UserInfoProvider;
export { UserInfoConsumer };