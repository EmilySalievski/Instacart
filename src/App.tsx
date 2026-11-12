import Login from './components/Login'
import Homepage from './components/Homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login/" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
