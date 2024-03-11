<script>
    import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { Button } from "carbon-components-svelte"; 
    import {authState} from '../../store/user.js';
    import { prop } from "ramda"

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
    });

    const auth = getAuth();

    const googleSignIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            console.log(user)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    const googleSignOut = () => {
        signOut(auth).then(() => {
            console.log("SignOut Successful")
            // Sign-out successful.
            }).catch((error) => {
            console.log("SignOut Failed")
            // An error happened.
            });
    }
</script>

<h2>Login</h2>

<Button on:click={() => googleSignIn()}>Login With Goole</Button>
<Button on:click={() => googleSignOut()}>Logout With Goole</Button>

{prop("email",$authState.user)}
