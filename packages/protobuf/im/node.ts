import path from 'path'
import Impb from './impb'
const pb = path.resolve(__dirname, 'proto', 'im.proto')

export default new Impb(pb)
