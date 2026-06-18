import { Toaster } from "react-hot-toast"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./components/Home"
import UrlTable from "./components/UrlTable"

const App = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <Toaster />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Home />
          <UrlTable />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
