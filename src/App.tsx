import './App.css'
import './css/shapes.css'
import Game from './components/mainGame/Game'
import { SceneProvider } from './contexts/SceneContext'
import { ItemsProvider } from './contexts/ItemsContext'
import { compose } from './contexts/Provider'
import { AllItemsProvider } from './contexts/AllItemsContext';
import { ActiveItemProvider } from './contexts/ActiveItemContext'

const providersList = [
  SceneProvider, 
  ItemsProvider,
  AllItemsProvider,
  ActiveItemProvider
]

const AppProvider: React.FC<{ children: React.ReactNode }> = compose(providersList);

function App() {

  return (
    <>
      <AppProvider>
        <Game />
      </AppProvider>
    </>
  )
}

export default App
