import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Landing from '../views/Landing/Landing.jsx'
import Detail from '../views/Detail/Detail.jsx'
import Home from '../views/Home/Home.jsx'
import Form from '../views/Form/Form.jsx'
import NotFound from '../views/NotFound/NotFound.jsx'

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/home' element={<Home />} />
            <Route path='/form' element={<Form />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router