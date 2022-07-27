import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(4001)
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss;

  private logger = new Logger('AppGateway');

  handleConnection(client) {
    this.logger.log('Novo cliente conectado');
    client.emit('connection', 'Conectado com sucesso no servidor');
  }

  handleDisconnect() {
    this.logger.log('Cliente disconectado');
  }
}
