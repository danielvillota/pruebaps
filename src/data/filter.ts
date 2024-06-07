import { BarChartprops } from "../components/dash/DonutGraphSport";
import { API_URL, get } from "./api";


export async function dataAnalitic(stratum: number) {
    const data = await get(`${API_URL}info_general/analitic/?name_branding=${stratum}`)// Cambiar Numero por barrio a filtrar
    const dataString = JSON.stringify(data);
    localStorage.setItem('data', dataString)
    return [sumFamilies(data), stratumClasification(data),
    sexPersons(data), regimenPersons(data), etniaPersons(data), sportsPersons(data),
    vulnerabilityFamily(data), victimsFamily(data), antecedentFamily(data),
    habitsFamily(data), welfareFamily(data), disabilityPersons(data)
    ]
}

function sumFamilies(data: [unknown]) {
    const sumFamilies = data.reduce((acc, item) => acc + item.num_families, 0);
    return sumFamilies;
}




function stratumClasification(data: any[]): BarChartprops[] {
    const counts: BarChartprops[] = data.reduce((acc: BarChartprops[], item) => {
        switch (item.estratum) {
            case 1:
                acc[0].total += 1;
                break;
            case 2:
                acc[1].total += 1;
                break;
            case 3:
                acc[2].total += 1;
                break;
            case 4:
                acc[3].total += 1;
                break;
            case 5:
                acc[4].total += 1;
                break;
            case 6:
                acc[5].total += 1;
                break;
            default:
                break;
        }
        return acc;
    }, [
        { name: 'Estrato 1', total: 0, id: 1 },
        { name: 'Estrato 2', total: 0, id: 2 },
        { name: 'Estrato 3', total: 0, id: 3 },
        { name: 'Estrato 4', total: 0, id: 4 },
        { name: 'Estrato 5', total: 0, id: 5 },
        { name: 'Estrato 6', total: 0, id: 6 },
    ]);
    return counts;
}


function sexPersons(data: any[]): BarChartprops[] {
    const counts: BarChartprops[] = data.reduce((acc: BarChartprops[], item) => {
        item.family.forEach(family => {
            family.in_charge.forEach(person => {
                switch (person.sex) {
                    case 1:
                        acc[0].total += 1;
                        break;
                    case 2:
                        acc[1].total += 1;
                        break;
                    case 3:
                        acc[2].total += 1;
                        break;
                    default:
                        break;
                }
            });
        });
        return acc;
    }, [
        { name: 'hombre', total: 0 ,id:1},
        { name: 'mujer', total: 0 ,id:2},
        { name: 'indeterminado', total: 0,id:3 },
    ]);

    return counts;
}




function regimenPersons(data: any[]): BarChartprops[] {
    const counts: BarChartprops[] = data.reduce((acc: BarChartprops[], item) => {
        item.family.forEach(family => {
            family.in_charge.forEach(person => {
                switch (person.affiliation_regime) {
                    case 1:
                        acc[0].total += 1;
                        break;
                    case 2:
                        acc[1].total += 1;
                        break;
                    case 3:
                        acc[2].total += 1;
                        break;
                    case 4:
                        acc[3].total += 1;
                        break;
                    case 5:
                        acc[4].total += 1;
                        break;
                    default:
                        break;
                }
            });
        });
        return acc;
    }, [
        { name: 'Subsidiado', total: 0,id:1 },
        { name: 'Contributivo', total: 0 ,id:2},
        { name: 'Especial', total: 0,id:3 },
        { name: 'Excepcion', total: 0 ,id:4},
        { name: 'NoAfiliado', total: 0 ,id:5},
    ]);

    return counts;
}



function sportsPersons(data: any[]): BarChartprops[] {
    const counts: BarChartprops[] = data.reduce((acc: BarChartprops[], item) => {
        item.family.forEach((family) => {
            family.in_charge.forEach((person) => {
                switch (person.member_atributes.sport) {
                    case 1:
                        acc[0].total += 1; // Incrementar el total de 'si' en la primera posición del array
                        break;
                    case 2:
                        acc[1].total += 1; // Incrementar el total de 'no' en la segunda posición del array
                        break;
                    default:
                        break;
                }
            });
        });
        return acc;
    }, [
        { name: 'si', total: 0, id: 1 },
        { name: 'no', total: 0, id: 2 },
    ]);

    return counts;
}

function disabilityPersons(data: any[]): BarChartprops[] {
    const counts: BarChartprops[] = [
        { name: 'Fisica', total: 0, id: 1 },
        { name: 'Auditiva', total: 0, id: 2 },
        { name: 'Visual', total: 0 , id: 3},
        { name: 'Sordoceguera', total: 0 , id: 4},
        { name: 'Intelectual', total: 0 , id: 5},
        { name: 'Psicosocial', total: 0 , id: 6},
        { name: 'Multiple', total: 0 , id: 7},
        { name: 'Otra', total: 0 , id: 8},
        { name: 'Ninguna', total: 0 , id: 9},
    ];

    const reducedCounts = data.reduce((acc: BarChartprops[], item) => {
        item.family.forEach(family => {
            family.in_charge.forEach(person => {
                person.member_atributes.disability.forEach(disability => {
                    switch (disability) {
                        case 1:
                            acc[0].total++;
                            break;
                        case 2:
                            acc[1].total++;
                            break;
                        case 3:
                            acc[2].total++;
                            break;
                        case 4:
                            acc[3].total++;
                            break;
                        case 5:
                            acc[4].total++;
                            break;
                        case 6:
                            acc[5].total++;
                            break;
                        case 7:
                            acc[6].total++;
                            break;
                        case 8:
                            acc[7].total++;
                            break;
                        case 9:
                            acc[8].total++;
                            break;
                        default:
                            break;
                    }
                });
            });
        });
        return acc;
    }, counts);

    return reducedCounts;
}


function etniaPersons(data: any[]): BarChartprops[] {
    const counts: BarChartprops[] = data.reduce((acc: BarChartprops[], item) => {
        item.family.forEach(family => {
            family.in_charge.forEach(person => {
                switch (person.etnia) {
                    case 1:
                        acc[0].total += 1;
                        break;
                    case 2:
                        acc[1].total += 1;
                        break;
                    case 3:
                        acc[2].total += 1;
                        break;
                    case 4:
                        acc[3].total += 1;
                        break;
                    case 5:
                        acc[4].total += 1;
                        break;
                    case 6:
                        acc[5].total += 1;
                        break;
                    case 7:
                        acc[6].total += 1;
                        break;
                    default:
                        break;
                }
            });
        });
        return acc;
    }, [
        { name: 'Indigena', total: 0, id: 1  },
        { name: 'RomGitano', total: 0, id: 2  },
        { name: 'Raizal', total: 0 , id: 3 },
        { name: 'PalenquerodeSanBasilio', total: 0 , id: 4 },
        { name: 'NegroMulatoAfro', total: 0 , id: 5 },
        { name: 'Ninguna', total: 0, id: 6  },
        { name: 'otro', total: 0, id: 7},
    ]);

    return counts;
}


function vulnerabilityFamily(data: any[]): BarChartprops[] {
    const counts: BarChartprops[] = data.reduce((acc: BarChartprops[], item) => {
        item.family.forEach(family => {
            switch (family.family_context.vulneravility) {
                case 1:
                    acc[0].total += 1; // Incrementa el total de 'si'
                    break;
                case 2:
                    acc[1].total += 1; // Incrementa el total de 'no'
                    break;
                default:
                    break;
            }
        });
        return acc;
    }, [
        { name: 'si', total: 0, id: 1 },
        { name: 'no', total: 0 , id: 2},
    ]);

    return counts;
}



function victimsFamily(data: any[]): BarChartprops[] {
    const counts: BarChartprops[] = data.reduce((acc: BarChartprops[], item) => {
        item.family.forEach(family => {
            switch (family.family_context.victim) {
                case 1:
                    acc[0].total += 1; // Incrementa el total de 'si'
                    break;
                case 2:
                    acc[1].total += 1; // Incrementa el total de 'no'
                    break;
                default:
                    break;
            }
        });
        return acc;
    }, [
        { name: 'si', total: 0, id: 1 },
        { name: 'no', total: 0 , id: 2},
    ]);

    return counts;
}


function antecedentFamily(data: any[]): BarChartprops[] {
    const counts: BarChartprops[] = data.reduce((acc: BarChartprops[], item) => {
        item.family.forEach((family) => {
            switch (family.family_context.antecedent_salud) {
                case 1:
                    acc[0].total += 1; // Incrementar el total de 'si'
                    break;
                case 2:
                    acc[1].total += 1; // Incrementar el total de 'no'
                    break;
                default:
                    break;
            }
        });
        return acc;
    }, [
        { name: 'si', total: 0, id: 1 },
        { name: 'no', total: 0 , id: 2},
    ]);

    return counts;
}

function habitsFamily(data: any[]): BarChartprops[] {
    const counts: BarChartprops[] = data.reduce((acc: BarChartprops[], item) => {
        item.family.forEach((family) => {
            switch (family.family_context.healthy_habits) {
                case 1:
                    acc[0].total += 1; // Incrementar el total de 'si'
                    break;
                case 2:
                    acc[1].total += 1; // Incrementar el total de 'no'
                    break;
                default:
                    break;
            }
        });
        return acc;
    }, [
        { name: 'si', total: 0, id: 1 },
        { name: 'no', total: 0 , id: 2},
    ]);

    return counts;
}

function welfareFamily(data: any[]): BarChartprops[] {
    const counts: BarChartprops[] = data.reduce((acc: BarChartprops[], item) => {
        item.family.forEach((family) => {
            switch (family.family_context.family_welfare) {
                case 1:
                    acc[0].total += 1; // Incrementar el total de 'si'
                    break;
                case 2:
                    acc[1].total += 1; // Incrementar el total de 'no'
                    break;
                default:
                    break;
            }
        });
        return acc;
    }, [
        { name: 'si', total: 0, id: 1 },
        { name: 'no', total: 0 , id: 2},
    ]);

    return counts;
}


export async function DateTable(ask: any, value: any) {
    const data = localStorage.getItem('data');
    if (data) {
        try {
            const jsonData = JSON.parse(data);

            // Función recursiva para buscar en objetos anidados
            const deepSearch = (obj: any, key: string, targetValue: any): boolean => {
                if (typeof obj === 'object' && obj !== null) {
                    if (obj.hasOwnProperty(key) && obj[key] === targetValue) {
                        return true;
                    } else {
                        for (const prop in obj) {
                            if (obj.hasOwnProperty(prop) && deepSearch(obj[prop], key, targetValue)) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            };

            // Filtrar los elementos que cumplen con la condición
            const filteredData = jsonData.filter((item: any) => deepSearch(item, ask, value));

            console.log(filteredData);
            return filteredData;
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return [];
        }
    } else {
        console.warn('No data found in localStorage');
        return [];
    }
}


export function getDiccionary(typeNumber: number,diccionary:unknown): string {
    return diccionary[typeNumber] || 'Tipo desconocido';
  }

  export function getMemberResponsable(familyMembers:[unknown]) {
    return familyMembers.find(member => member.present_person === 1);
  }

  export function getLabelByValue(value: number,diccionary:unknown) {
    const entry = diccionary.find(item => item.value === value);
    return entry ? entry.label : 'Valor no encontrado';
  }