/* import firebase from './Firebase'
import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  updateDoc
} from 'firebase/firestore' */
import Products from './pages/Products'

function App() {
/*   // useState
const [data, setData] = useState([])
const [newProduct, setNewProduct] = useState("")
const [newCategory, setNewCategory] = useState("")


  // Init services
const db = getFirestore()

//collectionref
const colRef = collection(db, "jumia_products")


useEffect(() => {
  // realtime data collection
  onSnapshot(colRef, (snapshot) => {
    let item = []
    snapshot.docs.forEach((doc) => {
        item.push({...doc.data(), id: doc.id})
    })
    console.log(item)
    setData(item)
  })
}, [])


// Add Item
const addItem = () => {
  
  addDoc(colRef, {name: newProduct, category: newCategory});
}

// Update Item
const updateItem = (id, price) => {
  const itemDoc = doc(db, "jumia_products", id)
  const newUpdate = {price: price + 1}
  updateDoc(itemDoc, newUpdate)
}

// Delete item
const deleteItem = (id) => {

  const itemDoc = doc(db, "jumia_products", id)
  deleteDoc(itemDoc)
} */
  
  return (
    <div className="App">
      {/* <form onSubmit={addItem}>
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

      {
        data.map((items) => (
          <div key={items.id}>
            <h2>{items.name}</h2>
            <p>{items.category}</p>
            <img src={items.image_url} alt={items.name}/>
            <p>Ksh. {items.price}/=</p>

            <button onClick={() => {
              updateItem(items.id, items.price)
            }}>Update Item Price</button>

            <button
              onClick={() => {deleteItem(items.id)}}
            >Delete Item</button>
          </div>
        ))
      } */}

      <Products />
    </div>
  );
}

export default App;
