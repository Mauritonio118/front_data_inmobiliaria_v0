
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const client = await clientPromise;

        // We can list databases to verify the connection
        const adminDb = client.db('admin');
        const result = await adminDb.admin().listDatabases();

        const dbs = result.databases.map(db => ({
            name: db.name,
            sizeOnDisk: db.sizeOnDisk,
            empty: db.empty
        }));

        return NextResponse.json({
            status: 'success',
            message: 'Connected to MongoDB',
            target_db: process.env.DB_TARGET || 'local',
            databases: dbs
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: 'error', message: 'Failed to connect to MongoDB', error: String(e) }, { status: 500 });
    }
}
