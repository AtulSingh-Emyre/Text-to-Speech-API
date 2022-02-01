/* eslint-disable @typescript-eslint/no-var-requires */
import { Server } from './server';
import { config } from 'dotenv';
config();
const server = new Server().app;
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`server is running ${port}`);
});
