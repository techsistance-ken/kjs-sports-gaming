<script>
    import SignIn from "../../../components/auth/sign_in.svelte";
    import { Link } from "carbon-components-svelte";
    import { signInWithEmailAndPassword } from "firebase/auth";
    import { auth, userDoc } from "../../../firebase";
    import { goto } from "$app/navigation";
    import { setDoc } from "firebase/firestore/lite";
    let error;
    async function signIn(event) {
        try {
            let user = await signInWithEmailAndPassword(auth, event.detail.email, event.detail.password)
            await setDoc(userDoc(auth.currentUser.uid), { username: user.user.displayName, email: user.user.email })
            await goto("/admin")
        } catch (error) {
            console.log("error signin in", error.message)
          error = error.message
        }
    }
</script>
<div>
    <div class="header">
        <h4>Login</h4>
    </div>
    <div class="signin-form">
        <SignIn />
        <div>Already have an account? <Link href="/auth/register">Sign Up</Link></div>
    </div>
</div>
<style>
     .header {
         width: 100vw;
         padding: 2em 0;
         min-height: 20vh;
         display: flex;
         justify-content: center;
         align-items: center;
         background-color: #E5F0FF;
     }
     .header h4 {
         color: black;
         font-weight: 600;
         font-size: 3rem;
     }
     .signin-form {
         min-height: 80vh;
         display: grid;
         place-items: center;
     }
</style>