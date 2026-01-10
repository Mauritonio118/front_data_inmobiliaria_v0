
import { MongoClient } from 'mongodb';

// Define the shape of our global objects extensions
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const dbTarget = process.env.DB_TARGET || 'local';
let uri: string | undefined;
let configError: Error | undefined;

// Determine URI and check for configuration errors without throwing immediately
if (dbTarget === 'online') {
    if (!process.env.MONGODB_URI_ONLINE) {
        configError = new Error('Please add your Mongo URI to .env with MONGODB_URI_ONLINE');
    } else {
        uri = process.env.MONGODB_URI_ONLINE;
    }
} else {
    // Default to local if DB_TARGET is missing or 'local'
    if (!process.env.MONGODB_URI_LOCAL) {
        // Only error if we are genuinely trying to use local DB and it's missing.
        // In unexpected production envs, this prevents an immediate crash on import.
        configError = new Error('Please add your Mongo URI to .env with MONGODB_URI_LOCAL');
    } else {
        uri = process.env.MONGODB_URI_LOCAL;
    }
}

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (configError || !uri) {
    // Return a rejected promise so the error can be caught when 'await clientPromise' is called
    // rather than crashing the entire application on module import.
    clientPromise = Promise.reject(configError || new Error('MongoDB URI is undefined'));
} else {
    if (process.env.NODE_ENV === 'development') {
        // In development mode, use a global variable so that the value
        // is preserved across module reloads caused by HMR (Hot Module Replacement).
        if (!global._mongoClientPromise) {
            client = new MongoClient(uri, options);
            global._mongoClientPromise = client.connect();
        }
        clientPromise = global._mongoClientPromise;
    } else {
        // In production mode, it's best to not use a global variable.
        client = new MongoClient(uri, options);
        clientPromise = client.connect();
    }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
