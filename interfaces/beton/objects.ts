import type Group from 'three';

interface BetonObject {
    file: string,
    object: any,
}

interface BetonObjects {
    [key: string]: BetonObject[][];
}

type RowType = 'basement' | 'roof' | 'room';
type ObjectType = null | 0 | 1 | 2 | 3 | 4 | 5;
type ObjectStore = (Group | null)[];

export {
    BetonObjects,
    RowType,
    ObjectType,
    ObjectStore,
};