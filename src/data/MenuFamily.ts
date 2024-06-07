import vivienda from '../assets/svg/vivenda.svg'
import bienestar from '../assets/svg/bienestar.svg'
import saneamiento from '../assets/svg/saneamiento.svg'
import contextoFamiliar from '../assets/svg/contextoFamiliar.svg'
import infoGeneral from '../assets/svg/infoGeneral.svg'
import familia from '../assets/svg/familia.svg'

export interface Menu {
    id:number;
    title:string;
    icon:string;
    link:string;
    alterpad?:any
}

const Context:Menu ={
    id:3,
    title:'Cont. Familiar',
    icon:contextoFamiliar,
    link:'/familyContext/',
    alterpad:true

}

const Walfare:Menu ={
    id:1,
    title:'Bienestar',
    icon:bienestar,
    link:'/walfare/',
    alterpad:true
}


const FamliyContext:Menu ={
    id:2,
    title:'Familia',
    icon:familia,
    link:'/family/',
    alterpad:true
}
const Sanation :Menu ={
    id:4,
    title:'Saneamiento',
    icon:vivienda,
    link:'/sanation/'
 
}

const LivingPlace:Menu ={
    id:5,
    title:'Habitabilidad',
    icon: saneamiento,
    link:'/livingPlace/',
    alterpad:true
}


const Family:Menu ={
    id:6,
    title:'Info General',
    icon:infoGeneral,
    link:'/infoGeneral/'
}


export const MenuFamily: Menu[] = [Context, Walfare, FamliyContext, Sanation, LivingPlace, Family];

    




