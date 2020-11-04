import {httpRequest} from '../util/httpUtils';


export const request = config => {
    return new Promise((resolve, reject) => {
        httpRequest(config).then(res => {
            const {status, data} = res;
            if (status !== 200) {
                reject(res);
                return;
            }
            if (data.code !== 200) {
                reject(res);
                return;
            }
            resolve(data.data);
        }).catch(err => {
            console.error('Error on http:', err)
            reject(err);
        });
    });
};
