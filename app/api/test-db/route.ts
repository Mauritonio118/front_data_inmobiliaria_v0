
import clientPromise from '@/lib/mongodb';
import { getPlatformsCount, getPlatformBySlug } from '@/lib/services/platformService';
import { NextResponse } from 'next/server';
/*
export async function GET() {
    try {
        const client = await clientPromise;

        // 1. Identify which DB defines the connection context
        const db = client.db();
        const currentDbName = db.databaseName;

        // 2. List collections in THIS specific DB
        const collectionsCursor = db.listCollections();
        const collections = await collectionsCursor.toArray();
        const collectionNames = collections.map(c => c.name);

        // 3. Try the specific service query
        let count = -1;
        try {
            count = await getPlatformsCount();
        } catch (e) {
            console.error("Count query failed", e);
        }

        return NextResponse.json({
            status: 'success',
            connection_info: {
                target_env: process.env.DB_TARGET,
                connected_to_db_name: currentDbName, // <--- CRITICAL: Check if this matches your expectation
            },
            data_check: {
                collections_found: collectionNames,
                platforms_collection_exists: collectionNames.includes('platforms'),
                platforms_count: count
            },
            message: collectionNames.includes('platforms')
                ? 'Everything looks good!'
                : 'WARNING: "platforms" collection not found in this DB. Check your connection string.'
        });

    } catch (e) {
        console.error(e);
        return NextResponse.json({
            status: 'error',
            message: 'Failed to connect/query',
            error: String(e)
        }, { status: 500 });
    }
}

*/

export async function GET() {
  const total = await getPlatformBySlug('fraccional');
  return NextResponse.json({ totalPlatforms: total });
}