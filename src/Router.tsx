import React from 'react'
import { Route, Routes } from 'react-router-dom';


const LaziLogin = React.lazy(() => import('./page/Login'));
const LaziPageInitial = React.lazy(() => import('./page/Encuestadores/PageInitial'));
const LaziHeader = React.lazy(() => import('./page/MenuEncuestador'));
const LaziHeaderDos = React.lazy(() => import('./layouts/Header'));
const LaziFooter = React.lazy(() => import('./layouts/Footer'));
const LaziPanelFamily = React.lazy(() => import('./page/Encuestadores/PanelFamily'));
const LaziDetallePanelFamily = React.lazy(() => import('./page/Analistas/DetallePanelFamily'));
const LaziDetallePanelFamiliyList = React.lazy(() => import('./page/Analistas/PanelFamiliyList'));
const LazyInfoGeneral = React.lazy(() => import('./forms/AddForms/InfoGeneral'));
const LazyLivingPlace = React.lazy(() => import('./forms/AddForms/LivingPlace'));
const LazyRegister = React.lazy(() => import('./page/register/Register'));
const LazyPollster = React.lazy(() => import('./forms/AddForms/Pollster'));
const LazyFamily = React.lazy(() => import('./forms/AddForms/Family'));
const LazyFamilyContext = React.lazy(() => import('./forms/AddForms/FamilyContext'));
const LazyMember = React.lazy(() => import('./forms/AddForms/Member'));
const LazyAtributeMember = React.lazy(() => import('./forms/AddForms/AtributeMember'));
const LazyWelfare = React.lazy(() => import('./forms/AddForms/Welfare'));
const LazySanation = React.lazy(() => import('./forms/AddForms/Sanation'));
const LazyFilterFamily = React.lazy(() => import('./page/Analistas/PageInitialAnalista'));
const LazyMemberEdit = React.lazy(() => import('./forms/EditForms/MemberEdit'));
const LazyAtributesEdit = React.lazy(() => import('./forms/EditForms/EditAtributesMember'));
const LazyInfoGeneralEdit = React.lazy(() => import('./forms/EditForms/EditInfoGeneral'));
const LazyLivingPlaceEdit = React.lazy(() => import('./forms/EditForms/EditLivingPlace'));
const LazySanationsEdit = React.lazy(() => import('./forms/EditForms/EditSanations'));
const LazyFamilyEdit = React.lazy(() => import('./forms/EditForms/EditFamily'));
const LazyFamilyContextEdit = React.lazy(() => import('./forms/EditForms/EditFamilyContext'));
const LazyWalfareEdit = React.lazy(() => import('./forms/EditForms/WalfareEdit'));
const LazyNewFields = React.lazy(() => import('./forms/AddForms/NewFiles'));
const LazyEditUser = React.lazy(() => import('./page/EditUser'));
const LazyPanelAdmin = React.lazy(() => import('./page/admin/PanelAdmin'));
const LazyRecovery = React.lazy(() => import('./page/register/Recovery'));
const LazyRecoveryPassword = React.lazy(() => import('./page/register/RecoveryPassword'));

export const MyRouter = () => {
  return (
    <div>
      <Routes>


        <Route path="/login" element={
          <React.Suspense fallback='Loading...'>
            <LaziLogin />
          </React.Suspense>} />

        <Route path="/recovery" element={
          <React.Suspense fallback='Loading...'>
            <LazyRecovery />
          </React.Suspense>} />

        <Route path="/recoveryPassword/" element={
          <React.Suspense fallback='Loading...'>
            <LazyRecoveryPassword />
          </React.Suspense>} />

        <Route
          path="/register/user"
          element={
            <React.Suspense fallback="Loading...">
              <LazyRegister />
            </React.Suspense>
          }
        />


        <Route path="/encuestador" element={
          <React.Suspense fallback='Loading...'>
            <LaziHeaderDos />
            <LaziPageInitial />
            <LaziFooter />
          </React.Suspense>} />


        <Route path="/panelFamily/:id" element={
          <React.Suspense fallback='Loading...'>
            <LaziHeaderDos />
            <LaziPanelFamily />
            <LaziFooter />
          </React.Suspense>} />

        <Route path="/detallePanelFamily/:id" element={
          <React.Suspense fallback='Loading...'>
            <LaziHeaderDos />
            <LaziDetallePanelFamily />
            <LaziFooter />
          </React.Suspense>} />


        <Route path="/Family/:ask/:value" element={
          <React.Suspense fallback='Loading...'>
            <LaziHeaderDos />
            <LaziDetallePanelFamiliyList />
            <LaziFooter />
          </React.Suspense>} />

        <Route
          path="/register/pollster"
          element={
            <React.Suspense fallback="Loading...">
              <LazyPollster />
            </React.Suspense>
          }
        />





        {/*Configuracion de Rutas de Formularios de Ingreso de Datos*/}

        <Route path="/register/infoGeneral" element={
          <React.Suspense fallback='Loading...'>
            <LaziHeaderDos />
            <LazyInfoGeneral />
            <LaziFooter />
          </React.Suspense>} />

        <Route path="/register/livingPlace" element={
          <React.Suspense fallback='Loading...'>
            <LaziHeaderDos />
            <LazyLivingPlace />
            <LaziFooter />
          </React.Suspense>} />

        <Route
          path="/register/family"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyFamily />
              <LaziFooter />
            </React.Suspense>
          }
        />
        <Route
          path="/register/familyContext"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyFamilyContext />
              <LaziFooter />
            </React.Suspense>
          }
        />
        <Route
          path="admin"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyPanelAdmin />
              <LaziFooter />
            </React.Suspense>
          }
        />
        <Route
          path="/register/member/:id"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyMember />
              <LaziFooter />
            </React.Suspense>
          }
        />
        <Route
          path="/register/atributeMember/:id"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyAtributeMember />
              <LaziFooter />
            </React.Suspense>
          }
        />
        <Route
          path="/register/welfare"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyWelfare />
              <LaziFooter />
            </React.Suspense>
          }
        />
        <Route
          path="/register/infoGeneral"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyInfoGeneral />
              <LaziFooter />
            </React.Suspense>
          }
        />
        <Route
          path="/register/sanation"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazySanation />
              <LaziFooter />
            </React.Suspense>
          }
        />

        <Route
          path="analista"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyFilterFamily />
              <LaziFooter />
            </React.Suspense>
          }
        />

        <Route
          path="/member/:id"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyMemberEdit />
              <LaziFooter />
            </React.Suspense>
          }
        />

        <Route
          path="/atributeMember/:id"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyAtributesEdit />
              <LaziFooter />
            </React.Suspense>
          }
        />

        <Route
          path="/infoGeneral/:id"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyInfoGeneralEdit />
              <LaziFooter />
            </React.Suspense>
          }
        />



        <Route
          path="/livingPlace/:id"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyLivingPlaceEdit />
              <LaziFooter />
            </React.Suspense>
          }
        />

        <Route
          path="/sanation/:id"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazySanationsEdit />
              <LaziFooter />
            </React.Suspense>
          }
        />

        <Route
          path="/family/:id"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyFamilyEdit />
              <LaziFooter />
            </React.Suspense>
          }
        />


        <Route
          path="/editUser"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyEditUser />
              <LaziFooter />
            </React.Suspense>
          }
        />

        <Route
          path="/familyContext/:id"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyFamilyContextEdit />
              <LaziFooter />
            </React.Suspense>
          }
        />

        <Route
          path="/walfare/:id"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyWalfareEdit />
              <LaziFooter />
            </React.Suspense>
          }
        />

        <Route
          path="/newFile"
          element={
            <React.Suspense fallback="Loading...">
              <LaziHeaderDos />
              <LazyNewFields />
              <LaziFooter />
            </React.Suspense>
          }
        />
        <Route path='/' element={
          <React.Suspense fallback='Loading...'>
            <LaziHeader />
            <LaziFooter />
          </React.Suspense>}>
        </Route>
      </Routes>
    </div >
  )
}






