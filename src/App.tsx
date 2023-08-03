import './App.css'
import { Routes, Route} from "react-router-dom";

function Index() : JSX.Element{
  return <h1>Index page</h1>
}

function Contact() : JSX.Element{
  return <h1>Contact page</h1>
}


function App() {

  return (
    <>
      <h1>Hola</h1>
      {/* <Index />
      <Contact /> */}
      <Routes>
        <Route path="/index" element={<Index />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
