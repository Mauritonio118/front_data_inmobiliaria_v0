import React from 'react';
import { Platform } from '@/types/platform';
import {
    FaGlobe,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaTelegram,
    FaDiscord,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaBuilding,
    FaCheckCircle,
    FaTimesCircle,
    FaQuestionCircle,
    FaGooglePlay,
    FaAppStore,
    FaMobileAlt
} from 'react-icons/fa';

interface PlatformDetailsProps {
    platform: Platform;
}

export default function PlatformDetails({ platform }: PlatformDetailsProps) {
    if (!platform) {
        return <div className="p-8 text-center text-gray-500">No platform data available.</div>;
    }

    const {
        name,
        legal,
        primaryDomain,
        description,
        operational,
        classifications,
        geography,
        compliance,
        tech,
        socialProfiles,
        mobileApps,
        foundedAt,
        dataSources
    } = platform;

    // Helper to format date
    const formatDate = (date: string | Date | undefined) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString();
    };

    // Helper to get status icon/color
    const getStatusBadge = (status: string | undefined) => {
        switch (status) {
            case 'active':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><FaCheckCircle /> Active</span>;
            case 'inactive':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><FaTimesCircle /> Inactive</span>;
            case 'in_development':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><FaBuilding /> In Development</span>;
            default:
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"><FaQuestionCircle /> {status || 'Unknown'}</span>;
        }
    };

    // Helper to get social icon
    const getSocialIcon = (network: string) => {
        const lower = network.toLowerCase();
        if (lower.includes('linkedin')) return <FaLinkedin className="w-5 h-5 text-[#0077b5]" />;
        if (lower.includes('twitter') || lower.includes('x.com')) return <FaTwitter className="w-5 h-5 text-black" />;
        if (lower.includes('facebook')) return <FaFacebook className="w-5 h-5 text-[#1877f2]" />;
        if (lower.includes('instagram')) return <FaInstagram className="w-5 h-5 text-[#e4405f]" />;
        if (lower.includes('youtube')) return <FaYoutube className="w-5 h-5 text-[#ff0000]" />;
        if (lower.includes('telegram')) return <FaTelegram className="w-5 h-5 text-[#0088cc]" />;
        if (lower.includes('discord')) return <FaDiscord className="w-5 h-5 text-[#5865F2]" />;
        return <FaGlobe className="w-5 h-5 text-gray-600" />;
    };

    // Helper to get store icon
    const getStoreIcon = (store: 'google_play' | 'apple_store') => {
        if (store === 'google_play') return <FaGooglePlay className="w-5 h-5 text-green-600" />;
        if (store === 'apple_store') return <FaAppStore className="w-5 h-5 text-blue-600" />;
        return <FaMobileAlt className="w-5 h-5 text-gray-600" />;
    };


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl my-8">
            {/* Header Section */}
            <div className="border-b pb-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{name || 'Unnamed Platform'}</h1>
                        {legal?.legalName && <p className="text-sm text-gray-500 mt-1">{legal.legalName}</p>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {getStatusBadge(operational?.status)}
                        {classifications?.productType?.map((type, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {type}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-gray-600">
                    {primaryDomain && (
                        <a href={primaryDomain.startsWith('http') ? primaryDomain : `https://${primaryDomain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                            <FaGlobe /> Website
                        </a>
                    )}
                    {foundedAt && (
                        <span className="flex items-center gap-2">
                            <FaBuilding /> Founded: {formatDate(foundedAt)}
                        </span>
                    )}
                    {geography?.hq?.country && (
                        <span className="flex items-center gap-2">
                            <FaMapMarkerAlt /> {geography.hq.city ? `${geography.hq.city}, ` : ''}{geography.hq.country}
                        </span>
                    )}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - Main Info */}
                <div className="md:col-span-2 space-y-8">
                    {/* Description */}
                    {description && (
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-gray-800">About</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{description}</p>
                        </section>
                    )}

                    {/* Classifications */}
                    {classifications && (
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-gray-800">Classifications</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {classifications.businessModel && classifications.businessModel.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Business Model</h3>
                                        <div className="flex flex-wrap gap-1">
                                            {classifications.businessModel.map((item, i) => (
                                                <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">{item}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {classifications.assetFocus && classifications.assetFocus.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Asset Focus</h3>
                                        <div className="flex flex-wrap gap-1">
                                            {classifications.assetFocus.map((item, i) => (
                                                <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">{item}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {classifications.targetInvestors && classifications.targetInvestors.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Target Investors</h3>
                                        <div className="flex flex-wrap gap-1">
                                            {classifications.targetInvestors.map((item, i) => (
                                                <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">{item}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Tech & Compliance */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {tech && (
                            <section>
                                <h2 className="text-xl font-semibold mb-3 text-gray-800">Technology</h2>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center justify-between">
                                        <span>On-Chain:</span>
                                        <span className={tech.isOnChain ? "text-green-600 font-medium" : "text-gray-500"}>
                                            {tech.isOnChain ? "Yes" : "No"}
                                        </span>
                                    </li>
                                    {tech.tokenStandards && tech.tokenStandards.length > 0 && (
                                        <li className="flex flex-col">
                                            <span className="mb-1">Token Standards:</span>
                                            <div className="flex flex-wrap gap-1">
                                                {tech.tokenStandards.map((t, i) => <span key={i} className="bg-gray-100 px-2 py-0.5 rounded text-xs">{t}</span>)}
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </section>
                        )}

                        {compliance && (
                            <section>
                                <h2 className="text-xl font-semibold mb-3 text-gray-800">Compliance</h2>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center justify-between">
                                        <span>KYC Required:</span>
                                        <span className={compliance.kycRequired ? "text-green-600 font-medium" : "text-gray-500"}>
                                            {compliance.kycRequired ? "Yes" : "No/Unknown"}
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>Accreditation:</span>
                                        <span className={compliance.accreditationRequired ? "text-orange-600 font-medium" : "text-gray-500"}>
                                            {compliance.accreditationRequired ? "Required" : "Not Required/Unknown"}
                                        </span>
                                    </li>
                                    {compliance.regulation?.regulators && compliance.regulation.regulators.length > 0 && (
                                        <li className="flex flex-col mt-2">
                                            <span className="mb-1">Regulators:</span>
                                            <div className="flex flex-wrap gap-1">
                                                {compliance.regulation.regulators.map((t, i) => <span key={i} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{t}</span>)}
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </section>
                        )}
                    </div>
                </div>

                {/* Right Column - Contact & Side Info */}
                <div className="space-y-8">
                    {/* Company Info */}
                    <section className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Company</h3>
                        <div className="space-y-3 text-sm">
                            {geography?.hq && (
                                <div>
                                    <span className="block text-gray-500 text-xs">Headquarters</span>
                                    <div className="text-gray-700 font-medium">{geography.hq.city ? `${geography.hq.city}, ` : ''}{geography.hq.country || 'N/A'}</div>
                                    {geography.hq.address && <div className="text-gray-500 text-xs mt-1">{geography.hq.address}</div>}
                                </div>
                            )}
                            {legal && (
                                <div>
                                    <span className="block text-gray-500 text-xs mt-3">Legal Entity</span>
                                    <div className="text-gray-700">{legal.legalName || 'N/A'}</div>
                                    {legal.registrationNumber && <div className="text-gray-500 text-xs">Reg: {legal.registrationNumber}</div>}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Connect / Mobile Apps */}
                    {(socialProfiles?.length || mobileApps?.length) ? (
                        <section className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Connect</h3>

                            {mobileApps && mobileApps.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Mobile Apps</h4>
                                    <div className="flex flex-col gap-2">
                                        {mobileApps.map((app, idx) => (
                                            <a
                                                key={idx}
                                                href={app.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-2 bg-white rounded-md border border-gray-200 hover:border-blue-400 hover:shadow-sm transition-all group"
                                            >
                                                {getStoreIcon(app.store!)}
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                                                    {app.store === 'google_play' ? 'Google Play' : app.store === 'apple_store' ? 'App Store' : 'Download App'}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {socialProfiles && socialProfiles.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Social Profiles</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {socialProfiles.map((social, idx) => (
                                            <a
                                                key={idx}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-white rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                                                title={social.platform}
                                            >
                                                {getSocialIcon(social.platform || 'web')}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
