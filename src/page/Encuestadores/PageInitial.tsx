import { useEffect, useState } from "react";
import { ButtonNavegate } from "../../components/button/ButtonNavegate";
import { DonutGraph, DonutGraphprops } from "../../components/dash/DonutGraph";
import { TableGeneral } from "../../components/infoComponets/TableGeneral";
import { CardList } from "../../components/infoComponets/CardList";
import { useUserContext } from "../../Props/UserProvider";
import { API_URL, get, } from "../../data/api";
import { TitleFormText } from "../../components/TitleFormText";
import { Family } from "../../Props/Interfaces";
import { useNavigate } from "react-router-dom";


export const MOBILE_BREAKPOINT: number = 760;
const PageInitial = () => {
  const user = useUserContext();
  const [familyData, setFamilyData] = useState<Family[]>([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [infoData, setInfoData] = useState<DonutGraphprops[]>([]);
  const [name, setName] = useState(user.pollster.pollster.name);
  const [items, setItems] = useState<DonutGraphprops[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState<boolean>(true)
  const ITEMS_PER_PAGE = 4;
  const pollsterid = user.pollster.pollster.id
  const navigate = useNavigate();

  useEffect(() => {
    const getFamily = async () => {
      try {
        const data = await get(`${API_URL}family/${pollsterid}/pollster/`)
        const analitic = await get(`${API_URL}info_general/${pollsterid}/donut/`)
        setInfoData(analitic);
        setFamilyData(data);
        setItems(data.splice(0,ITEMS_PER_PAGE));
      } catch (e) {
        console.log(e)
      }
      finally {
        setLoading(false)
      }
    }
    getFamily();


    setName(name[0].toUpperCase() + name.slice(1).toLowerCase())
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const nextHandler = () => {
    const totalData = familyData.length;
    const nextPage = page + 1;
    const firstIndex = nextPage * ITEMS_PER_PAGE;
    if (firstIndex >= totalData) return;
    const nextPageItems = familyData.slice(firstIndex, firstIndex + ITEMS_PER_PAGE);
    setItems(nextPageItems);
    setPage(nextPage);
  }

  const prevHandler = () => {
    const prevPage = page - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * ITEMS_PER_PAGE;
    const prevPageItems = familyData.slice(firstIndex, firstIndex + ITEMS_PER_PAGE);
    setItems(prevPageItems);
    setPage(prevPage);
  }

  const agreeConditions = () => {
    if (window.confirm('Con el diligenciamiento del presente formulario autorizo libre y expresamente a la Secretaría de Salud de Pasto para que realice el tratamiento de los datos personales registrados y recolectados, de igual manera manifiesto que he sido informado sobre la finalidad de la recolección de la misma, con el propósito de implementar el modelo predictivo, preventivo y resolutivo basado en Atención Primaria en Salud, dando cumplimiento a la privacidad y protección de datos dispuesto en la Ley 1581 de 2012, el Decreto 1377 de 2013 y la circular externa 008 de 2020 de la Super intendencia de registro y comercio. RECUERDE QUE SI NO REALIZA EL FOMULAIO EN SUTOTALIDAD NO SE GUARDARA LA INFORMACION')) {
      navigate("/register/infoGeneral");
  }
  } 
     
  return (
    <>
      {loading && (
        <div>
          cargando......
        </div>
      )}
      <div className="flex flex-col items-center bg-transparent justify-start w-full h-max p-4 md:p-2  ">
        <div className="flex flex-col bg-white w-full h-max px-2  rounded-lg ">
          <div className="w-full pb-4 md:pl-4">
            <TitleFormText
              title={`Bienvenido ${name}`}
              text='Panel Encuestador'
            />
          </div>

          <div className="flex justify-center md:mt-4">
            <DonutGraph dataref={infoData}></DonutGraph>
          </div>

          <div className=" basis-1/3 mb-4">
            <ButtonNavegate
              msg="Nuevo Hogar"
              msgTwo="Ver Novedades"

              prev="/newFile"
              fun={agreeConditions}
            />
          </div>
          <div className="bg-white w-full p-4 mt-6 rounded-lg">
            {width < MOBILE_BREAKPOINT ? (
              <CardList data={items} next={nextHandler} prev={prevHandler} page={page + 1}></CardList>
            ) : (
              <TableGeneral data={items} next={nextHandler} prev={prevHandler} page={page + 1}  ></TableGeneral>
            )}
          </div>
        </div>

      </div>
    </>

  );
};


export default PageInitial;