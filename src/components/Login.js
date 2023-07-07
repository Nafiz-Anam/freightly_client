import React, { useEffect, useNavigate } from "react";
import firebase from "firebase/compat/app";
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";

//react firebase ui
import "firebase/compat/auth";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

const firebaseConfig = {
    apiKey: "AIzaSyDL94WDmgbpclkwY0oVh9TGjHQRvU8VlCc",
    authDomain: "freightly-admin.firebaseapp.com",
    databaseURL:
        "https://freightly-admin-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "freightly-admin",
    storageBucket: "freightly-admin.appspot.com",
    messagingSenderId: "897142706479",
    appId: "1:897142706479:web:1d99adaa3e5eae5b8a91da",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const ui = new firebaseui.auth.AuthUI(auth);
//set uuid in local storage to empty string
localStorage.setItem("uuid", "");

function FirebaseAuth() {
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                //redirect to dashboard
                alert("You are logged in");
                console.log(authResult);
                //what is localstorage vs session storage
                // https://stackoverflow.com/questions/19867599/what-is-the-difference-between-localstorage-sessionstorage-session-and-cookies
                localStorage.setItem("uuid", authResult.user.uid);
                //hide the firebase-auth-container
                document.getElementById(
                    "firebaseui-auth-container"
                ).style.display = "none";
                //show welcome message , create a new h2 element and append it
                var h2 = document.createElement("h2");

                //set the id to welcom
                h2.setAttribute("id", "welcome");

                h2.innerHTML = "Welcome, " + authResult.user.displayName;
                //append to id welcome_name
                document.getElementById("welcome_name").appendChild(h2);
                h2.style.textAlign = "center";

                //set the active setep variable of App.js to 1

                return false;
            },
            uiShown: function () {
                // The widget is rendered.
                // Hide the loader.
                //document.getElementById("loader").style.display = "none";
            },
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: "popup",
        signInSuccessUrl: "/step2",
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.

            {
                //google firebase auth
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            },
            //firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        tosUrl: "<your-tos-url>",
        // Privacy policy url.
        privacyPolicyUrl: "<your-privacy-policy-url>",
    };
    ui.start("#firebaseui-auth-container", uiConfig);

    return <div id="firebaseui-auth-container"></div>;
}

const App = () => {
    // Create and render the stock market graph
    // Generate dummy stock data

    return (
        <>
            <FirebaseAuth />
            <div id="welcome_name"></div>
        </>
    );
};

export default App;
