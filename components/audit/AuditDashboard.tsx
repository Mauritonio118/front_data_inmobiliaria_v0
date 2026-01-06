
'use client';

import { AuditStats } from '@/lib/services/platformAuditService';

export function AuditDashboard({ stats }: { stats: AuditStats }) {
    const hasCriticalIssues = stats.slugAnalysis.missing > 0 || stats.domainAnalysis.missing > 0;
    const hasDuplicates = (stats.slugAnalysis.duplicates.length > 0) || (stats.domainAnalysis.duplicates.length > 0);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen text-gray-800 font-sans">

            {/* Header Section */}
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Database Health Audit
                    </h1>
                    <p className="text-gray-500 mt-1">Platform Data Quality Overview</p>
                </div>
                <div className="flex gap-4">
                    <div className={`px-4 py-2 rounded-lg font-medium border ${hasCriticalIssues ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                        Integrity: {hasCriticalIssues ? 'Critical Issues' : 'Healthy'}
                    </div>
                    <div className={`px-4 py-2 rounded-lg font-medium border ${hasDuplicates ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                        Duplicates: {hasDuplicates ? 'Found' : 'None'}
                    </div>
                </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <KpiCard
                    label="Total Documents"
                    value={stats.totalDocuments}
                    icon="📚"
                />
                <KpiCard
                    label="Missing Slugs"
                    value={stats.slugAnalysis.missing}
                    isAlarm={stats.slugAnalysis.missing > 0}
                    icon="⚠️"
                />
                <KpiCard
                    label="Duplicate Slugs"
                    value={stats.slugAnalysis.duplicates.reduce((acc, curr) => acc + curr.count, 0)}
                    isAlarm={stats.slugAnalysis.duplicates.length > 0}
                    icon="🔁"
                />
                <KpiCard
                    label="Missing Domains"
                    value={stats.domainAnalysis.missing}
                    isAlarm={stats.domainAnalysis.missing > 0}
                    icon="🌐"
                />
            </div>

            {/* Main Content Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Status Distribution */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Operational Status</h3>
                    <div className="space-y-3">
                        {stats.statusDistribution.map((status) => (
                            <div key={status.status || 'undefined'} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className={`w-3 h-3 rounded-full ${getStatusColor(status.status)}`}></span>
                                    <span className="capitalize text-gray-700 font-medium">{status.status || 'Missing / Undefined'}</span>
                                </div>
                                <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-full text-sm">{status.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Enrichment Stats */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Enrichment Quality</h3>
                    <div className="space-y-6 pt-4">
                        <ProgressBar
                            label="With Mobile Apps"
                            count={stats.enrichment.withMobileApps}
                            total={stats.totalDocuments}
                            color="bg-purple-500"
                        />
                        <ProgressBar
                            label="With Social Profiles"
                            count={stats.enrichment.withSocialProfiles}
                            total={stats.totalDocuments}
                            color="bg-pink-500"
                        />
                    </div>
                </div>
            </div>

            {/* Duplicates Detail Table - Only show if there are unwanted duplicates */}
            {(stats.slugAnalysis.duplicates.length > 0 || stats.domainAnalysis.duplicates.length > 0) && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
                    <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                        🚨 Requires Action: Duplicates Found
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        {stats.slugAnalysis.duplicates.length > 0 && (
                            <div>
                                <h4 className="font-medium text-gray-600 mb-2">Duplicate Slugs</h4>
                                <ul className="bg-red-50 rounded-lg divide-y divide-red-100 max-h-60 overflow-y-auto">
                                    {stats.slugAnalysis.duplicates.map((d, i) => (
                                        <li key={i} className="px-4 py-2 flex justify-between text-sm">
                                            <span className="font-mono text-red-700">{d.value || 'null'}</span>
                                            <span className="font-bold text-red-800">x{d.count}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {stats.domainAnalysis.duplicates.length > 0 && (
                            <div>
                                <h4 className="font-medium text-gray-600 mb-2">Duplicate Domains</h4>
                                <ul className="bg-orange-50 rounded-lg divide-y divide-orange-100 max-h-60 overflow-y-auto">
                                    {stats.domainAnalysis.duplicates.map((d, i) => (
                                        <li key={i} className="px-4 py-2 flex justify-between text-sm">
                                            <span className="font-mono text-orange-700">{d.value || 'null'}</span>
                                            <span className="font-bold text-orange-800">x{d.count}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper Components for Cleaner JSX
function KpiCard({ label, value, isAlarm, icon }: any) {
    return (
        <div className={`p-6 rounded-xl border ${isAlarm ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'} shadow-sm transition-all`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className={`text-sm font-medium uppercase tracking-wider ${isAlarm ? 'text-red-600' : 'text-gray-500'}`}>{label}</p>
                    <p className={`text-3xl font-bold mt-2 ${isAlarm ? 'text-red-700' : 'text-gray-900'}`}>{value}</p>
                </div>
                <span className="text-2xl opacity-80">{icon}</span>
            </div>
        </div>
    )
}

function ProgressBar({ label, count, total, color }: any) {
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    return (
        <div>
            <div className="flex justify-between mb-2 text-sm font-medium text-gray-700">
                <span>{label}</span>
                <span>{percentage}% ({count}/{total})</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                    className={`${color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    )
}

function getStatusColor(status: string | null) {
    switch (status) {
        case 'active': return 'bg-green-500';
        case 'inactive': return 'bg-red-500';
        case 'in_development': return 'bg-yellow-500';
        case 'uncertain': return 'bg-gray-400';
        default: return 'bg-gray-300';
    }
}
