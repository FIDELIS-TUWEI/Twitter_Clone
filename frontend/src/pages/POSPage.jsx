import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout"
import axios from 'axios'

const POSPage = () => {

    // useState
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // function to fetch products
    const fetchProducts = async() => {
        try {
            setIsLoading(true);
            const result = await axios.get("products");
            setProducts(await result.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    // get data from backend
    useEffect(() => {
        fetchProducts();
    }, []);

    // useEffect for products
    useEffect(() => {
        console.log(products)
    }, [products])

    return ( 
        <MainLayout>
            <div className="row">
                <div className="col-lg-8">
                    { isLoading ? 'Loading' : <div className="row">
                        {products.map((product, key) => {
                            <div key={key} className="col-lg-4">
                                <div className="border">
                                    <p>{product.name}</p>
                                    <img src={product.image} className="img-fluid" alt={product.name} />
                                    <p>${product.price}</p>
                                </div>
                            </div>
                        })}
                    </div>}
                    
                </div>
            </div>
        </MainLayout>
     );
}
 
export default POSPage;