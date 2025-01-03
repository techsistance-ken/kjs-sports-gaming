import { writable } from "svelte/store";
import { onAuthStateChanged, GoogleAuthProvider, getAuth, signOut,signInWithPopup } from "firebase/auth";
const createAuthStore = () => {
    const { subscribe, set, update } = writable({isLoggedIn: false, user: null, firebaseControlled: true});
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
    });

    const auth = getAuth();


    onAuthStateChanged(auth, user => {
        set({
            isLoggedIn: user !== null,
            user,
            firebaseControlled: true,
        });

    })

    return {
		subscribe,
        logout: () =>  signOut(auth).then(() => {
            console.log("SignOut Successful")
            // Sign-out successful.
            }).catch((error) => {
            console.log("SignOut Failed")
            // An error happened.
            }),
        login: () => signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("12user",user)

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
        })

	};

}

export const authState = createAuthStore();