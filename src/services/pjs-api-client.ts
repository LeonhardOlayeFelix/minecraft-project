import axios, {CanceledError} from 'axios'

export default axios.create({
    baseURL: "https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data"
})

export {CanceledError}