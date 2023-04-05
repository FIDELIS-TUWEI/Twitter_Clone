import {Link}  from 'react-router-dom'
import MainLayout from '../layouts/MainLayout';

const HomePage = () => {
    return ( 
        <MainLayout>
            <div className="bg-light pt-5 mt-4 rounded-3">
                <h1>Welcome to the simple POS for small business</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nobis!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                <Link to='/pos' className='btn btn-primary'>Click here to sell products</Link>
            </div>
        </MainLayout>
     );
}
 
export default HomePage;