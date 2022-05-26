import 'module-alias/register';
import app from "./app";

import config from "./config";
import { logger } from "./middleware";

const server = app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port} - env: ${process.env.NODE_ENV}`);
    console.log(`Server listening on port ${config.port} - env: ${process.env.NODE_ENV}`);
    logger.info(`DB name ${config.DB_NAME}`);
});

//global["io"] = inItSocket(server);