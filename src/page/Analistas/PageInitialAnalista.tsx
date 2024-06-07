import { useEffect, useState } from 'react'
import { Tab, TabGroup } from '@tremor/react'
import { DashboardInfogeneral } from './DashboardInfogeneral';
import { DashboardGeneral } from './DashboardGeneral';
import { DashBoardSalud } from './DashBoardSalud';
import { TitleFormText } from '../../components/TitleFormText';
import { useForm } from 'react-hook-form';
import { dataAnalitic } from '../../data/filter';
import { SelectAskFormHook } from '../../components/select/SelectAskFormHook';
import { diccionaryNH } from '../../data/maps';


interface MemberData {
  name_branding: string;
}

export const PageInitialAnalista = () => {
  const [selectedView, setSelectedView] = useState(1);
  const { register, formState: { errors }, control, watch } = useForm<MemberData>();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const nameBrandingValue = watch('name_branding');


    
    const handleSelect = (index:number): void => {
      setSelectedView(index + 1); // Ajuste para que coincida con el valor de Tab
      console.log(index);
    };

    useEffect(() => {
      const getData = async () => {
        setLoading(true);
        try {
          // Limpiar los resultados antes de cargar nuevos datos
          setResults([]);
          const data = await dataAnalitic(nameBrandingValue?.value); // Acceder de manera segura a nameBrandingValue
          setResults(data); // Almacenar los nuevos resultados en el estado
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); // Establecer loading a false al finalizar la carga
        }
      };
      if (nameBrandingValue!== null) {
        getData();
      }
    }, [nameBrandingValue]); // Dependencia de useEffect: nameBrandingValue


      const renderContent = () => {
        // Verificar si no hay datos disponibles para la opción seleccionada
        if (results.length === 0) {
          return <div className='text-center mb-10 text-red-500'>No hay datos disponibles para la opción seleccionada.</div>;
        }
        
        if (loading) {
          return <div className='flex justify-center text-lg mt-40'>Cargando......</div>;
        }
        switch (selectedView) {
            case 1:
                return <DashboardGeneral data={results}/>;
            case 2:
                return <DashboardInfogeneral data={results}/>; 
            case 3:
                return <DashBoardSalud data={results}/>;
            default:
                return null;
        }
    };

    return (
    <>
      <TitleFormText
          title='Panel '
          text='Analista'
      />
        <div className='px-4  md:px-10 mt-2 shadow pb-4 w-full'>

        <SelectAskFormHook
        context='Filtro por Barrio'
        errors={errors}
        name='name_branding'
        options={diccionaryNH}
        tamano='w-full mb-4 md:w-1/2'
        register={register}
        validations={control}/>
      

        <div className='bg-slate-50 w-full border overflow-auto '>
            <TabGroup selectedIndex={selectedView - 1} onChange={handleSelect} className='flex flex-row mb-4 p-2 '>
                    <Tab>Informacion General</Tab>
                    <Tab>Datos sociales</Tab>
                    <Tab>Datos de salud</Tab>
            </TabGroup>
            <div className=''>
              {renderContent()}
            </div>
        </div>
    </div>
    </>
  );
};

export default PageInitialAnalista;
