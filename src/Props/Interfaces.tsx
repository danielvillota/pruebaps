import { Menu } from "../data/MenuFamily";

export interface Contact {
    telephone: string | null;
    email: string | null;
}

export interface NamePerson {
    name: string;
    second_name: string | null;
    last_name: string;
    id: number;
    second_last_name: string | null;
}

export interface InCharge {
    id: number;
    present_person: number;
    name_person: NamePerson;
    contact: Contact;
    role: number;
}

export interface InfoGeneralData {
    id: number;
    type_register?: any;
    name_branding?: any;
    departament: any;
    municipality: any;
    pollster: any;
    address?: any;
    creation_date: any;
    id_primary_provider?: any;
    longitud?: number,
    latitud?: number,
    home_location?: any,
    estratum: any,


}


export interface Family {
    id: number;
    info_general: InfoGeneralData;
    family_type: number;
    total_members: number;
    in_charge: InCharge[];
}

export interface LivingPlaceData {
    access_to_home?: any;
    bedrooms?: any;
    description?:any;
    economic_activity?: any;
    floor_material?: any;
    other_floor_material?:any;
    food_source?: any;
    other_food_source?:any;
    info_general?: any;
    over_population?: any;
    roof_material?: any;
    other_roof_material?:any;
    transmitting_vectors?: any;
    type_living_place?: any;
    wall_material?: any;
    other_places_around?:any;
    places_around?:any;
    other_wall_material?:any;
    animals?: any;
    other_animals?:any;
    irrigation_scenarios?:any;
    vectors_description?:any;
}

export interface SanationData {
    water_supply?: any;
    other_water_supply?: any;
    disposal_system?: any;
    other_disposal_system?: any;
    residual_water?: any;
    other_residual_water?: any;
    solid_waste?: any;
    other_Solid_waste?: any;
    hygiene?: any;
    food_hygiene?: any;
    kitchen_toilet?: any;
    handwashing?: any;
    hygiene_element?: any;
    brushed?: any;
  }
  
  export interface FamilyData {
    family_type?:any,
    description?:any,
    imagen?:any,
    family_graphic?:any,
    apgar?: any,
    carer?: any,
    zarit?: any,
    ecomapa?:any,
    info_general?: any,
    observation?:any
  }

  export interface ContexFamilyData {
        younger?: any,
        pregnant?: any,
        senior?: any,
        victim?: any,
        source_food?: any,
        descripcion_source?: any,
        healthy_habits?: any,
        socioemotional?: any,
        environment_care?: any,
        healthy_relationships?: any,
        health_support?: any,
        senior_protection?: any,
        family_welfare?: any,
        scl_conservation?: any,
        recognition_rights?: any,
        disable?: any,
        patient?: any,
        infected_person?: any,
        event_noted?: any,
        vulneravility?: any,
        risk_psychosocial?: any,
        antecedent_salud?: any,
     
  }

  export interface WalfarData {
    tenure?: any;
    time_residence?: any;
    permanence?: any;
    lgtbi?: any;
    life_style?: any;
    alternative_health?: any;
    family: any;

}


export interface memberData {
    present_person?:any,
    id_document?:any,
    type_register?:any,
    consent?:any,
    name?:any,
    second_name?:any,
    last_name?:any,
    second_last_name?:any,
    email?:any,
    telephone?:any,
    type_id?:any,
    date_birth?:any,
    sex?:any,
    role?:any,
    weight?:any,
    size?:any,
    level_education?:any,
    affiliation_regime?:any,
    eps?:any,
    etnia?:any,
    indigena?:any,
    family?:any,
}

export interface memberInfoData {
    present_person?: any;
    group_demographic?:any;
    disability?: any;
    chronic_condition?: number;
    care_scheme?: number;
    pending_interventions?: any;
    health_promotion?: any;
    sport?: any;
    breastfeeding?: any;
    breastfeeding_months?: any;
    under_five_years?: any;
    weight_for_height?: any;
    brachial_perimeter?: any;
    physical_signs_of_malnutrition?: any;
    disease_description?: any;
    acute_disease_treatment?: any;
    reason_for_no_attention?: any;
    presented_disease?:any;
    medical_care?: any;
    canalization?:any
}

export interface MenuGeneric {
    data:Menu[],
    padId:any,
}


export interface dataPad {
    InfoGeneralId : string,
    family : string
}