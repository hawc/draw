import { BetonObjects } from "~/interfaces/beton/objects";

// outer array is dimension, inner is the different designs for that dimension
const objects: BetonObjects = {
    basement: [
        [
            {
                file: 'basement240-01.obj',
                object: null,
            },
            {
                file: 'basement240-01.obj',
                object: null,
            },
        ],
        [
            {
                file: 'basement360-01.obj',
                object: null,
            },
            {
                file: 'basement360-01.obj',
                object: null,
            },
        ],
        [
            {
                file: 'basement480-01.obj',
                object: null,
            },
            {
                file: 'basement480-01.obj',
                object: null,
            },
        ],
        [

        ],
    ],
    rooms: [
        [
            {
                file: 'room240-01.obj',
                object: null,
            },
            {
                file: 'room240-02.obj',
                object: null,
            },
            {
                file: 'room240-03.obj',
                object: null,
            },
        ],
        [
            {
                file: 'room360-01.obj',
                object: null,
            },
            {
                file: 'room360-02.obj',
                object: null,
            },
        ],
        [
            {
                file: 'room360-01.obj',
                object: null,
            },
            {
                file: 'room360-01.obj',
                object: null,
            },
        ],
    ],
    roof: [
        [
            {
                file: 'roof240-01.obj',
                object: null,
            },
            {
                file: 'roof240-01.obj',
                object: null,
            },
        ],
        [
            {
                file: 'roof360-01.obj',
                object: null,
            },
            {
                file: 'roof360-01.obj',
                object: null,
            },
        ],
        [
            {
                file: 'roof360-01.obj',
                object: null,
            },
            {
                file: 'roof360-01.obj',
                object: null,
            },
        ],
    ],
};

export {
    objects,
};