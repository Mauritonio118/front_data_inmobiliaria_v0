
import { getPlatformAuditStats } from '@/lib/services/platformAuditService';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const stats = await getPlatformAuditStats();

        return NextResponse.json({
            status: 'success',
            data: stats,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return NextResponse.json(
            { status: 'error', message: 'Failed to generate audit report' },
            { status: 500 }
        );
    }
}
