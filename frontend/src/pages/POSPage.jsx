import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout"
import axios from 'axios'

const POSPage = () => {

    // useState
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);

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

    // add product to cart function
    const addProductToCart = async(product) => {
        // check if adding product exist
        let findProductInCart = await cart.find(i=> {
            return i.id === product.id
        });

        if(findProductInCart) {
            //
        }else {
            let addingProduct = {
                ...product,
                'quantity': 1,
                'totalAmount': product.price,
            }
            setCart([...cart, addingProduct]);
        }
    }

    // get data from backend
    useEffect(() => {
        fetchProducts();
    }, []);

    return ( 
        <MainLayout>
            <div className="row">
                <div className="col-lg-8">
                    { isLoading ? 'Loading' : <div className="row">
                        {products.map((product, key) => 
                            <div key={key} className="col-lg-4">
                                <div className="border" onClick={() => addProductToCart(product)}>
                                    <p>{product.name}</p>
                                    <img src={product.image} className="img-fluid" alt={product.name} />
                                    <p>${product.price}</p>
                                </div>
                            </div>
                        )}
                    </div>}
                    
                </div>
            </div>
        </MainLayout>
     );
}
 
export default POSPage;