import {useState} from 'react'
import Props from './Props'

const State = () => {
    const greet = "Welcome"
    const skill = "Learning react is fun"

  const [name, setName] = useState('Fidelis')

  const handleClick = () => {
    setName('Josh')
  }

  const [blogs, setBlogs] = useState([
    {id: 1, title: 'Learning to code', author: 'Fidelis'},
    {id: 2, title: 'Programming concepts', author: 'Kent'},
    {id: 3, title: 'Benefits of programming', author: 'Fidelis'}
  ]);

  const handleDelete = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);
  }

    return (
        <div>
            <p>{greet} {name}</p>
            <p>{skill}</p>
            <button onClick={handleClick}>Click me</button>

            <Props blogs={blogs} title="All blogs" handleDelete={handleDelete} />
            <Props blogs={blogs.filter((blog) => blog.author === 'Fidelis')} title="All blogs" handleDelete={handleDelete} />

        </div>
    )
}

export default State;