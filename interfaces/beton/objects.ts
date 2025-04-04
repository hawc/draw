interface BetonObject {
  file: string;
  object: any;
}

interface BetonObjects {
  [key: string]: BetonObject[][];
}

type RowType = 'basement' | 'roof' | 'rooms';
type ObjectType = null | 0 | 1 | 2 | 3 | 4 | 5;

export { BetonObjects, RowType, ObjectType };
