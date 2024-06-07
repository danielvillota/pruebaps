import { useMemo } from 'react';
import { Family } from '../Props/Interfaces';
import { onSubmitDelete } from './api';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const dataResponsable = useMemo(() => (family: Family) => {
    if (family.in_charge.length > 0) {
      const responsable = family.in_charge[0];
      return `${responsable.name_person.name} ${responsable.name_person.last_name}`;
    } else {
      return 'No hay responsable';
    }
  }, []);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const dataResponsableContact = useMemo(() => (family: Family) => {
    if (family.in_charge.length > 0) {
      const responsable = family.in_charge[0];
      return responsable.contact.telephone;
    } else {
      return 'No hay responsable';
    }
  }, []);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeleteFamily = (familyId: number) => {
    onSubmitDelete(familyId)
      .then(() => {
        // Eliminar la familia del estado
        setFamilyData(prevState =>
          prevState.filter(family => family.id !== familyId)
        );
        console.log('Familia eliminada con éxito');
      })
      .catch(error => {
        console.error('Error al eliminar la familia:', error);
      });
  };

function setFamilyData(arg0: (prevState: any) => any) {
    throw new Error('Function not implemented.');
}
