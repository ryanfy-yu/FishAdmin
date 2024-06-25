import axiosExt from '@/scripts/axiosExt'


const httpRequest = {
    /**
     * methods: 请求
     * @param url 请求地址 
     * @param params 请求参数
     */
    get(url: string, params: object) {
        const config = {
            method: 'get',
            url: url,
            params: params
        }
        return axiosExt(config)
    },
    post(url: string, data: object) {
        const config = {
            method: 'post',
            url: url,
            data: data
        }
        return axiosExt(config)
    },
    delete(url: string, data: object) {
        const config = {
            method: 'post',
            url: url,
            data: data
        }
        return axiosExt(config)
    },
}
//导出
export default httpRequest