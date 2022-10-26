import { InversifyExpressServer } from 'inversify-express-utils';
import { injectable } from 'inversify';
import * as bodyParser from 'body-parser';
import { container } from '../../container';

// load everything needed to the Container

export interface IServer {
  start(): void;
}

@injectable()
export class Server {
  // @inject(TYPES.HTTPRouter) private _router: HTTPRouter;
  // @inject(TYPES.Logger) private _logger: Logger;

  start(): void {
    // start the server
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(
        bodyParser.urlencoded({
          extended: true
        })
      );
      app.use(bodyParser.json());
    });

    const serverInstance = server.build();
    serverInstance.listen(3000);
    console.log('listening on port 3000');
  }
}
