import {Link}  from 'react-router-dom'

const HomePage = () => {
    return ( 
        <div>
            <header>
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand">DevPOS</Link>
                    </div>
                </nav>
            </header>

            <main></main>
        </div>
     );
}
 
export default HomePage;