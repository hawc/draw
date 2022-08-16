interface BetonObject {
    file: string,
    object: any,
}

interface BetonObjects {
    [key: string]: BetonObject[][];
}

type ObjectType = 'basement' | 'roof' | 'room';

export {
    BetonObjects,
    ObjectType,
};