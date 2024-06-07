
import { UserProvider } from './Props/UserProvider';
import { MyRouter } from './Router';




function App() {


  return (
    <>

      <UserProvider>
        <div className="w-screen h-screen bg-cover bg-center overflow-auto absolute">
        <MyRouter/>
        </div>
        
        </UserProvider>

    </>
  )
}

export default App
