const SignUp = () => {
    return ( 
        <>
            <div className="signup__page">
                <form>
                    <label htmlFor="signup">Sign Up</label>
                    <input 
                        type="text" 
                        placeholder="Enter email"
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="text"
                        placeholder="Enter password"
                        required
                    />

                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
     );
}
 
export default SignUp;