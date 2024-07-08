import { Contracts } from "./components/ui/Contracts"
import Projects from "./components/ui/Projects"
import Dashboard from "./components/ui/Total-Spending"

function App() {
  return (
    <div>
    <Dashboard />
    <Contracts />
    <Projects columns={[]} data={[]} />
    </div>
  )
}

export default App
