import axios, {CanceledError} from 'axios'

export default axios.create({
    baseURL: "https://minecraft-api.vercel.app/api"
})

export {CanceledError}