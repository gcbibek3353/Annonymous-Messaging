import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavigatorElem from './NavigatorElem'
import Home from './Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NavigatorElem />} />
        <Route path='/:id' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

