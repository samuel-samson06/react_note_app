import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import CreateNote from "./pages/create/CreateNote"
import EditNote from "./pages/create/EditNote"
import Register from "./pages/login_register/Register"
import Login from "./pages/login_register/Login"
import Setting from "./pages/setting/Setting"
import Layout from "./pages/layout.jsx/Layout"
import Note from "./pages/note/Note"

function NotesApp() {

    
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>} />
                <Route path="/create" element={<CreateNote/>}/>
                <Route path="/edit" element={<EditNote/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/settings" element={<Setting/>}/>
                <Route path=":id" element={<Note/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default NotesApp


// Pages
//Home Create/Edit Setting Register Login