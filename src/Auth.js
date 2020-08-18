import React, { useState, useEffect } from 'react';
import './Auth.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import { auth } from './firebase';

function getModalStyle() {
const top = 50;
const left = 50;

return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
};
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Auth() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
  
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if(authUser){
                console.log(authUser);
                setUser(authUser);
            } else {
                setUser(null)
            }
        })
    }, [] );
    
    const signUp = (event) => {
        event.preventDefault();
  
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            return authUser.user.updateProfile({
                displayName: username
            })
        })
        .catch((error) => alert(error.message));
        setOpen(false);
    }
  
    const signIn = (event) => {
        event.preventDefault();
  
        auth.signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error.message));
        setOpenSignIn(false);
    }

    return (
        <div className="auth">
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="signup">
                    <Input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" onClick={(signUp)}>Sign Up</Button>
                    </form>
                </div>
            </Modal>

            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="signin">
                    <Input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" onClick={(signIn)}>Login</Button>
                    </form>
                </div>
            </Modal>

            {user ? (
                <div className="login_container">
                    <h4>Hi, {user.displayName}</h4>
                    <Button onClick={() => auth.signOut()}>Logout</Button>
                </div>
            ) : (
                <div className="login_container">
                    <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                    <Button onClick={() => setOpen(true)}>Sign Up</Button>
                </div>
            )}
        </div>
    )
}

export default Auth;
