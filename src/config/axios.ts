import axios from  "axios";

const axiosInstance = axios.create(
    {
        baseURL: process.env.REACT_APP_API_URL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
    }
);

axios.interceptors.request.use(async(config) => {
    console.log("Solicitud enviada:", config);
    return config;
});

axiosInstance.interceptors.response.use(
    (response) =>
        new Promise((resolve, reject) => {
            resolve(response)
        }),
    (error) => new Promise((resolve, reject) => {
        reject(error)
    }),
)

export default axiosInstance;