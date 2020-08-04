import request from 'axios';

export default ()=>{
    return request.create({
        baseURL: process.env.baseUrl
    })
}
