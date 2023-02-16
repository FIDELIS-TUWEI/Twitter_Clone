import { useState } from "react";

const Props = ({blogs, title, handleDelete}) => {
   
    return (
        <div>
            <h2>{title}</h2>
            {
                blogs.map((blog) => (
                    <div key={blog.id} className="blog__preview">
                        <p>{blog.title}</p>
                        <small>{blog.author}</small>

                        <button onClick={() => handleDelete(blog.id)}>delete blog</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Props;