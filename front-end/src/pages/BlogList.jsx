import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {RouterName} from "../routers/router.js";
import {useDeleteBlog, useGetBlogs} from "../api/mutations.js";

export const BlogList = () => {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([
        {id: 1, title: "First Blog", content: "This is the first blog post.", date: "2025-03-20"},
        {id: 2, title: "Second Blog", content: "Another interesting blog post.", date: "2025-03-18"},
        {id: 3, title: "Third Blog", content: "Yet another blog post.", date: "2025-03-15"},
    ]);

    const {mutate, isPending, isSuccess, data} = useGetBlogs()
    const {mutate: deleteBlog, isPending: pendingDelete, isSuccess: successDelete} = useDeleteBlog()
    const handleEdit = (id) => {
        navigate(RouterName.BLOG_DETAILS.replace(':id', id));
    };

    const handleDelete = async (id) => {
        deleteBlog(id)
    };

    useEffect(() => {
        mutate()
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setBlogs(data)
        }

    }, [isSuccess])
    useEffect(() => {
        if (successDelete) {
            mutate()
        }
    }, [successDelete])

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Blog List</h2>
                <button onClick={() => {
                    navigate(RouterName.MANAGE_BLOG)
                }} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add Blog
                </button>
            </div>
            {!isPending ? <div className="bg-white p-4 rounded-lg shadow-lg">
                {blogs.length ? <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 text-left">Title</th>
                        <th className="p-3 text-left">Content</th>
                        <th className="p-3 text-left">Created Date</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id} className="border-b hover:bg-gray-100">
                            <td className="p-3">{blog.title}</td>
                            <td className="p-3">{blog.content}</td>
                            <td className="p-3">{blog.date}</td>
                            <td className="p-3 flex space-x-2">
                                <button
                                    onClick={() => handleEdit(blog.id)}
                                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table> : <p >Blog list was empty</p>}
            </div> : <p>loading...</p>}
        </div>
    );
}