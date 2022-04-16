import { Manager } from 'socket.io-client'
import { SERVER_ADDRESS } from '@/config/index'

const manager = new Manager(SERVER_ADDRESS)

// export const robotSocket = manager.socket('/robot')
export default manager
