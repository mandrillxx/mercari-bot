import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MercariService } from './mercari.service';

@WebSocketGateway({
  cors: { origin: 'http://localhost:5173', credentials: true },
})
export class MercariGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly mercariService: MercariService) {}

  afterInit(server: Server) {
    this.mercariService.socket = server;
  }
}
