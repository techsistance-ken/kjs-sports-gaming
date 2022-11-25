<script>
    import SignUp from "../../../components/auth/sign_up.svelte";
    import { Link } from "carbon-components-svelte";
    import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import { auth, userDoc } from '../../../firebase';
    import { setDoc } from 'firebase/firestore/lite';
    let errors;
    async function signUp(event) {
        console.log("Event Ken")
            try {
                let user = await createUserWithEmailAndPassword(
                    auth,
                    event.detail.email,
                    event.detail.password
                );
                await updateProfile(user.user, { displayName: event.detail.username });
                await setDoc(userDoc(auth.currentUser.uid), {
                    username: user.user.displayName,
                    email: user.user.email
                });
                await goto('/admin');
            } catch (e) {
                console.log('error from creating user', e);
                errors = [e]
            }
        }
</script>
<svelte:head>
    <title>Register</title>
</svelte:head>
<div>
    <div class="header">
        <h4>Sign Up</h4>
    </div>
    <div class="form-container">
        {#if errors}
            {#each errors as error, i (i)}
                <div class="notification-block">
                    <p>{error}</p>
                </div>
            {/each}
        {/if}
        <SignUp on:signup={signUp} />
        <div>Already have an account? <Link href="/auth/login">Sign In</Link></div>
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
     .form-container {
         min-height: 80vh;
         display: grid;
         place-items: center;
     }
</style>