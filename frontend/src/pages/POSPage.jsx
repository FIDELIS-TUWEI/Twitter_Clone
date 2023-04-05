import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout"
import axios from 'axios'

const POSPage = () => {

    // useState
    const [products, setProducts] = useState([])

    // function to fetch products
    const fetchProducts = async() => {
        try {
            const result = await axios.get("products");
            setProducts(await result.data);
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
            POS content
        </MainLayout>
     );
}
 
export default POSPage;