import { useState } from "react";

const Form = ({addItem, setNewProduct, setNewCategory}) => {

    return ( 
        <div>
            <form onSubmit={addItem}>
                <input 
                type="text"
                placeholder='New Product'
                onChange={(e) => setNewProduct(e.target.value)}
                />

                <input 
                type="text"
                placeholder='New Category'
                onChange={(e) => setNewCategory(e.target.value)}
                />

                <button type='submit'>Add New</button>
            </form>
        </div>
     );
}
 
export default Form;