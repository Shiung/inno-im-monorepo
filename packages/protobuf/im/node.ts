import path from 'path'
import Impb from './impb'
const pb = path.resolve(__dirname, 'im-pb/im-chat', 'im.proto')

export default new Impb(pb)
