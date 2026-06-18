import { Toaster } from "react-hot-toast"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./components/Home"
import UrlTable from "./components/UrlTable"

const App = () => {
  return (
    <>
    <Toaster/>
    <Header/>
    <Home/>
    <UrlTable/>
    <Footer/>
    </>
  )
}

export default App