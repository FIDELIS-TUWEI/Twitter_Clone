import {Link}  from 'react-router-dom'

const HomePage = () => {
    return ( 
        <div>
            <header>
                <nav className="navbar navbar-light bg-primary">
                    <div className="container">
                        <Link to="/" className="navbar-brand">DevPOS</Link>
                    </div>
                </nav>
            </header>

            <main>
                <div className="container mt-3">
                    <div className="bg-light pt-5 mt-4 rounded-3">
                        <h1>Welcome to the simple POS for small business</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nobis!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                        <Link to='/pos' className='btn btn-primary'>Click here to sell products</Link>
                    </div>
                </div>
            </main>
        </div>
     );
}
 
export default HomePage;