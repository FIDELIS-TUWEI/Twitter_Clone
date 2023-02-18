import { useState } from "react";

const Create = ({handleSubmit}) => {
    const [item, setItem] = useState("")
    const [product, setProduct] = useState("")
    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="brand">Brand:</label>
                <input 
                    type="text" 
                    name="brand" 
                    required 
                    onChange={(e) => setItem(e.target.value)} 
                />
                <label htmlFor="category">Category:</label>
                <input 
                    type="text" 
                    name="category" 
                    required 
                    onChange={(e) => setProduct(e.target.value)}
                />

                <button type="submit">Add Item</button>
            </form>
        </div>
     );
}
 
export default Create;