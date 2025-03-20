import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {BASE_URL} from "../routers/router.js";

export const useRegistration = () => {
    return useMutation({
        mutationFn: async (formData) => {
            const result = await axios.post(`${BASE_URL}/register`, formData)
            return result.data
        }
    })
}

export const useLogin = () => {
    return useMutation({
        mutationFn: async (formData) => {
            const result = await axios.post(`${BASE_URL}/login`, formData)
            return result.data
        }
    })
}

export const useGetBlogs = () => {
    return useMutation({
        mutationFn: async () => {
            const result = await axios.get(`${BASE_URL}/blogs`)
            return result.data
        }
    })
}

export const useDeleteBlog = () => {
    return useMutation({
        mutationFn: async (id) => {
            const result = await axios.delete(`${BASE_URL}/blog/${id}`)
            return result.data
        }
    })
}

export const useUpdateBlog = () => {
    return useMutation({
        mutationFn: async ({data, id}) => {
            const result = await axios.put(`${BASE_URL}/blog/${id}`, data)
            return result.data
        }
    })
}
export const useGetBlogById = () => {
    return useMutation({
        mutationFn: async (id) => {
            const result = await axios.get(`${BASE_URL}/blog/${id}`)
            return result.data
        }
    })
}


export const useAddBlog = () => {
    return useMutation({
        mutationFn: async (formData) => {
            const result = await axios.post(`${BASE_URL}/blogs`, formData)
            return result.data
        }
    })
}
