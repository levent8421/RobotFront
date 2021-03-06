import {request} from './request';

export const postAngleAndSpeed = data => {
    return request({
        url: '/api/basic/_speed-and-angle',
        method: 'post',
        data: data,
    });
};

export const startOrStop = state => {
    return request({
        url: '/api/basic/_start-stop',
        method: 'post',
        data: {
            state,
        },
    });
};

export const runAllDirTest = (speed, stepDelay) => {
    return request({
        url: '/api/basic/_all-dir-test',
        method: 'post',
        data: {
            speed: speed,
            stepDelay: stepDelay,
        }
    });
};