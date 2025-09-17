import axios from 'axios';

export const fetchData = async (url, params) => {
    try {
        const response = await axios(url, {
            params
        });

        return {
            data: response.data
        }
    } catch (error) {
        console.log('Fetching Error', error);
    }
}