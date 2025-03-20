import {Sidebar} from "./Sidebar.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {RouterName} from "../routers/router.js";
import {BlogList} from "../pages/BlogList.jsx";
import {ManageBlog} from "../pages/ManageBlog.jsx";

export const AdminComponents = () => {
    return <div className="flex min-h-screen">
        <Sidebar/>
        <div className="flex-1 p-6 bg-gray-100">
            <Routes>
                <Route path={RouterName.BLOGS} element={<BlogList/>}/>
                <Route path={RouterName.BLOG_DETAILS} element={<ManageBlog/>}/>
                <Route path={RouterName.MANAGE_BLOG} element={<ManageBlog/>}/>
                <Route path={'/*'} element={<Navigate to={RouterName.BLOGS}/>}/>
            </Routes>
        </div>
    </div>
}