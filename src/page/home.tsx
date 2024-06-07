import { Outlet } from 'react-router-dom'

export const home = () => {
  return (
    <div>
        <main>
            <Outlet /> {/* Esto se renderizará en base a las rutas anidadas */}
        </main>
    </div>
  )
}
export default home
