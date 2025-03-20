import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAddBlog, useGetBlogById, useUpdateBlog} from "../api/mutations.js";
import {toast} from "react-toastify";
import {RouterName} from "../routers/router.js";

export const ManageBlog = () => {
    const {id} = useParams()
    const {mutate, isPending, isError, isSuccess} = useAddBlog()
    const {mutate: getById, isError: errorGetById, isSuccess: successById, data} = useGetBlogById()
    const {mutate: updateBlog, isError: errorUpdateBlog, isSuccess: successUpdateBlog} = useUpdateBlog()

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    })
    const [errors, setErrors] = useState({
        title: '',
        content: ''
    })

    useEffect(() => {
        if (id) {
            getById(id)
        }
    }, [id]);

    useEffect(() => {
        if (errorGetById) {
            navigate(RouterName.BLOGS)
        }
        if (successById) {
            setFormData({
                title: data.title,
                content: data.content,
            })
        }
    }, [errorGetById,
        successById])


    const handleCreateBlog = () => {
        mutate(formData)
    }

    const handleEditBlog = () => {
        updateBlog({data: formData, id: data.id})
    }


    useEffect(() => {
        if (errorUpdateBlog) {
            toast.error('Something went wrong')
        }
        if (successUpdateBlog) {
            navigate(RouterName.BLOGS)
        }
    }, [successUpdateBlog, errorUpdateBlog,
        successById])
    const validate = () => {
        let isValidate = true
        const error = {
            title: '',
            content: '',
        }
        if (!formData.title.trim().length) {
            isValidate = false
            error.title = 'Field is required'
        }
        if (!formData.content.trim().length) {
            isValidate = false
            error.content = 'Field is required'
        }

        setErrors(error)
        return isValidate
    }

    const handleClick = async () => {
        if (validate()) {
            if (id) {
                handleEditBlog()
            } else {
                handleCreateBlog()
            }
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        if (isError) {
            toast.error('Something went wrong')
        }
        if (isSuccess) {
            navigate(RouterName.BLOGS)
        }
    }, [isPending, isError, isSuccess]);


    return (
        <div className=" flex items-center justify-center">
            <div className="bg-white p-6  w-full">
                <h2 className="text-xl font-bold mb-4">{id ? "Edit Blog" : "Add Blog"}</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        value={formData.title}
                        name={'title'}
                        className="w-full p-2 border rounded-lg"
                    />
                    {errors.title ? <p className={'text-red-600'}>{errors.title}</p> : null}

                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Content</label>
                    <textarea
                        onChange={handleChange}
                        value={formData.content}
                        name={'content'}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                    {errors.content ? <p className={'text-red-600'}>{errors.content}</p> : null}
                </div>
                <div className="flex justify-end space-x-2">
                    <button onClick={handleClick}
                            className="p-2 bg-blue-500 text-white rounded-lg">{id ? "Update" : "Add"}</button>
                </div>
            </div>
        </div>
    );
}