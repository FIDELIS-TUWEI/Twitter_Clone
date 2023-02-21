import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

const Login = () => {
    // useState
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = ("");

    // useNavigate
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        // create user
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // signed in
                const user = userCredential.user;
                navigate("home");
            })
            .catch((error) => {
                setError(true);
            });
    };

    return ( 
        <>
            <div className='login'>
                <form className="login__form" onSubmit={handleSubmit}>
                    <label htmlFor="login">Login</label>
                    <input
                        type='text'
                        placeholder='Enter email address'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type='password'
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>

                    <h3>User Logged in:</h3>
                    <button>Logout</button>
                    {/* Error message to display */}
                    {error && <span>Wrong email or password!</span>}
                </form>
            </div>
        </>
     );
}
 
export default Login;