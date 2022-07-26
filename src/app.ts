import startApolloServer from "./server";
import { configEnv } from './config/index';

const { port } = configEnv;

async function main(): Promise<void> {
    const app = await startApolloServer();
    app.listen(
        port,
        () => console.log(`Server running on port ${port}`),
    );
    
};

main();