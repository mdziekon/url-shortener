import { LoggingPort } from '../ports/Logging';
import { PersistencePort } from '../ports/Persistence';

export interface CoreContext {
  components: {
    persistence: PersistencePort;
    logging: LoggingPort;
  };
}
