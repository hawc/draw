import { BetonObjects } from "~/interfaces/beton/objects";

// outer array is dimension, inner is the different designs for that dimension
const objects: BetonObjects = {
    basement: [
        [
            {
                file: 'basement360-01.obj',
                object: null,
            },
            {
                file: 'basement360-01.obj', // duplicate
                object: null,
            },
        ],
        [
            {
                file: 'basement480-01.obj',
                object: null,
            },
            {
                file: 'basement480-01.obj', // duplicate
                object: null,
            },
        ],
        [

        ],
    ],
    rooms: [
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
                file: 'room480-01.obj',
                object: null,
            },
            {
                file: 'room480-01.obj', // duplicate
                object: null,
            },
        ],
        [
            {
                file: 'room600-01.obj',
                object: null,
            },
            {
                file: 'room600-02.obj',
                object: null,
            },
        ],
    ],
    roof: [
        [
            {
                file: 'roof360-01.obj',
                object: null,
            },
            {
                file: 'roof360-01.obj', // duplicate
                object: null,
            },
        ],
        [
            {
                file: 'roof360-01.obj', // duplicate
                object: null,
            },
            {
                file: 'roof360-01.obj', // duplicate
                object: null,
            },
        ],
        [

        ],
    ],
};

export {
    objects,
};