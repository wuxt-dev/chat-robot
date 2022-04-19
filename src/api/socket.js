import { io } from 'socket.io-client'
import { SERVER_ADDRESS } from '@/config/index'

// export const manager = new Manager(SERVER_ADDRESS)
export const socket = io(SERVER_ADDRESS)

// export const robotSocket = manager.socket('/robot')
