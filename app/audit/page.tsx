
import { AuditDashboard } from '@/components/audit/AuditDashboard';
import { getPlatformAuditStats } from '@/lib/services/platformAuditService';

// Force dynamic rendering to ensure we always get fresh DB data
export const dynamic = 'force-dynamic';

export default async function AuditPage() {
    const stats = await getPlatformAuditStats();

    return <AuditDashboard stats={stats} />;
}
