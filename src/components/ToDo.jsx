import { useState, useEffect } from "react";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";


const ToDo = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    
    const fetchPost = async () => {
        await getDocs(collection(db, "todos"))
        .then((querySnapshot) => {
            const newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id}))

            setTodos(newData)
            console.log(todos, newData)
        })
    }

    useEffect(() => {
        fetchPost();
    }, []);

    const addToDo = async (e) => {
        e.preventDefault();

        try{
            const docRef = await addDoc(collection(db, "todos"), {
                todo: todo,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch(e) {
            console.error("Error adding document: ", e)
        }

    }

    return (
        <section>
            <div className="todo">
                <h1 className="header">ToDo-App</h1>
            </div>

            <div>
                <input type="text" placeholder="what do you have to do today?" onChange={(e) => setTodo(e.target.value)} />
            </div>

            <div className="btn-container">
                <button type="submit" onClick={addToDo}>Submit</button>
            </div>

            <div className="todo-content">
                {
                    todos?.map((todo, i) => {
                       return ( <p key={i}>
                            {todo.todo}
                        </p>
                       )
                    })
                }
            </div>
        </section>
    );
}
 
export default ToDo;