import './App.css'
import { routes } from './routes/routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>

          <Routes>
            {routes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Routes>

      </BrowserRouter>
    </>
  )
}

export default App

