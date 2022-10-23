
const configs = [
    {
        // base 1, ground 0.5, rooms 5, roof 1
        name: 'entrance low 240',
        elements: {
            basement: [['door240-01.obj'], ['door240-02.obj'], ['door240-03.obj'], ['door240-04.obj']],
            ground: [['spacer-half240-01.obj']], // when there's a ground level we need to render 1 room less
            rooms: [['room240-01.obj'], ['room240-02.obj']],
            roof: [['roof240-01.obj'], ['roof240-02.obj'], ['roof240-03.obj']],
        },
    },
    {
        // base 0.5, ground 1, rooms 5, roof 1
        name: 'entrance high 240',
        elements: {
            basement: [['basement240-01.obj']],
            ground: [['door240-01.obj'], ['door240-03.obj'], ['door240-04.obj']],
            rooms: [['room240-01.obj'], ['room240-02.obj']],
            roof: [['roof240-01.obj'], ['roof240-02.obj'], ['roof240-03.obj']],
        },
    },
    {
        // base 0.5, ground 0, rooms 6, roof 1
        name: 'living 240',
        elements: {
            basement: [['basement240-01.obj']],
            ground: [],
            rooms: [['room240-01.obj'], ['room240-02.obj']],
            roof: [['roof240-01.obj'], ['roof240-02.obj'], ['roof240-03.obj']],
        },
    },
    {
        // base 0.5, ground 0, rooms 6, roof 1
        name: 'living 360',
        elements: {
            basement: [['basement360-01.obj']],
            ground: [],
            rooms: [['room360-01.obj'], ['room360-02.obj']],
            roof: [['roof360-01.obj'], ['roof360-02.obj'], ['roof360-03.obj']],
        },
    },
    {
        name: 'living 600',
        elements: {
            basement: [['basement300-01.obj', 'basement300-01.obj']],
            ground: [],
            rooms: [['room600-01.obj'], ['room600-02.obj'], ['room600-03.obj'], ['room240-01.obj', 'room360-01.obj']],
            roof: [['roof300-01.obj', 'roof300-01.obj'], ['roof300-01.obj', 'roof300-02.obj'], ['roof300-02.obj', 'roof300-01.obj']],
        },
    },
];

/*
const elementConfig = {
    240: [
        {
            type: 'entrance',
            configs: [
                {
                    name: 'low',
                    elements: {
                        basement: [['door240-01.obj'], ['door240-02.obj']],
                        ground: ['half240-01.obj'],
                        rooms: [['room240-01.obj'], ['room240-02.obj']],
                        roof: [['roof240-01.obj'],['roof240-02.obj'],['roof240-03.obj']],
                    },
                },
                {
                    name: 'high',
                    elements: {
                        basement: [['basement240-01.obj'],['basement240-02.obj']],
                        ground: ['door240-01.obj'],
                        rooms: [['room240-01.obj'], ['room240-02.obj']],
                        roof: [['roof240-01.obj'],['roof240-02.obj'],['roof240-03.obj']],
                    },
                },
            ],
        },
        {
            type: 'living',
            configs: [
                {
                    name: 'living',
                    elements: {
                        basement: [['basement240-01.obj'],['basement240-02.obj']],
                        ground: [],
                        rooms: [['room240-01.obj'], ['room240-02.obj']],
                        roof: [['roof240-01.obj'],['roof240-02.obj'],['roof240-03.obj']],
                    },
                },
            ],
        },
    ],
    360: [
        {
            type: 'living',
            configs: [
                {
                    name: 'living',
                    elements: {
                        basement: [['basement360-01.obj'],['basement360-02.obj']],
                        ground: [],
                        rooms: [['room360-01.obj'], ['room360-02.obj']],
                        roof: [['roof360-01.obj'],['roof360-02.obj'],['roof360-03.obj']],
                    },
                },
            ],
        },
    ],
    600: [

    ],
}
*/

export {
    configs,
};
