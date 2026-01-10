import React from 'react';
import Image from 'next/image';
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
    FaExternalLinkAlt,
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
        return <div className="p-8 text-center text-muted-foreground">No platform data available.</div>;
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
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"><FaCheckCircle /> Active</span>;
            case 'inactive':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"><FaTimesCircle /> Inactive</span>;
            case 'in_development':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20"><FaBuilding /> In Development</span>;
            default:
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border"><FaQuestionCircle /> {status || 'Unknown'}</span>;
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
        return <FaGlobe className="w-5 h-5 text-muted-foreground" />;
    };

    // Helper to get store icon
    const getStoreIcon = (store: 'google_play' | 'apple_store') => {
        if (store === 'google_play') return <FaGooglePlay className="w-5 h-5 text-green-600" />;
        if (store === 'apple_store') return <FaAppStore className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
        return <FaMobileAlt className="w-5 h-5 text-muted-foreground" />;
    };


    return (
        <div className="max-w-6xl mx-auto p-6 bg-card text-card-foreground shadow-lg rounded-xl my-8 border border-border">
            {/* Header Section */}
            <div className="border-b border-border pb-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted p-2 border border-border shrink-0">
                            <Image
                                src={`/images/platforms/${platform.slug}.png`}
                                alt={`${name} logo`}
                                fill
                                className="object-contain p-1"
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">{name || 'Unnamed Platform'}</h1>
                            {legal?.legalName && <p className="text-sm text-muted-foreground mt-1">{legal.legalName}</p>}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {getStatusBadge(operational?.status)}
                        {classifications?.productType?.map((type, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                {type}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-muted-foreground">
                    {primaryDomain && (
                        <a href={primaryDomain.startsWith('http') ? primaryDomain : `https://${primaryDomain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-primary transition-colors">
                            <FaGlobe /> Website <FaExternalLinkAlt className="w-3 h-3" />
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
                            <h2 className="text-xl font-semibold mb-3 text-foreground">About</h2>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{description}</p>
                        </section>
                    )}

                    {/* Classifications */}
                    {classifications && (
                        <section>
                            <h2 className="text-xl font-semibold mb-3 text-foreground">Classifications</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {classifications.businessModel && classifications.businessModel.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Business Model</h3>
                                        <div className="flex flex-wrap gap-1">
                                            {classifications.businessModel.map((item, i) => (
                                                <span key={i} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded border border-border">{item}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {classifications.assetFocus && classifications.assetFocus.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Asset Focus</h3>
                                        <div className="flex flex-wrap gap-1">
                                            {classifications.assetFocus.map((item, i) => (
                                                <span key={i} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded border border-border">{item}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {classifications.targetInvestors && classifications.targetInvestors.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Target Investors</h3>
                                        <div className="flex flex-wrap gap-1">
                                            {classifications.targetInvestors.map((item, i) => (
                                                <span key={i} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded border border-border">{item}</span>
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
                                <h2 className="text-xl font-semibold mb-3 text-foreground">Technology</h2>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center justify-between">
                                        <span>On-Chain:</span>
                                        <span className={tech.isOnChain ? "text-green-600 dark:text-green-400 font-medium" : "text-muted-foreground"}>
                                            {tech.isOnChain ? "Yes" : "No"}
                                        </span>
                                    </li>
                                    {tech.tokenStandards && tech.tokenStandards.length > 0 && (
                                        <li className="flex flex-col">
                                            <span className="mb-1">Token Standards:</span>
                                            <div className="flex flex-wrap gap-1">
                                                {tech.tokenStandards.map((t, i) => <span key={i} className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs border border-border">{t}</span>)}
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </section>
                        )}

                        {compliance && (
                            <section>
                                <h2 className="text-xl font-semibold mb-3 text-foreground">Compliance</h2>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center justify-between">
                                        <span>KYC Required:</span>
                                        <span className={compliance.kycRequired ? "text-green-600 dark:text-green-400 font-medium" : "text-muted-foreground"}>
                                            {compliance.kycRequired ? "Yes" : "No/Unknown"}
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>Accreditation:</span>
                                        <span className={compliance.accreditationRequired ? "text-orange-600 dark:text-orange-400 font-medium" : "text-muted-foreground"}>
                                            {compliance.accreditationRequired ? "Required" : "Not Required/Unknown"}
                                        </span>
                                    </li>
                                    {compliance.regulation?.regulators && compliance.regulation.regulators.length > 0 && (
                                        <li className="flex flex-col mt-2">
                                            <span className="mb-1">Regulators:</span>
                                            <div className="flex flex-wrap gap-1">
                                                {compliance.regulation.regulators.map((t, i) => <span key={i} className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded text-xs border border-blue-500/20">{t}</span>)}
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
                    <section className="bg-muted/30 p-5 rounded-lg border border-border">
                        <h3 className="text-lg font-semibold mb-4 text-foreground">Company</h3>
                        <div className="space-y-3 text-sm">
                            {geography?.hq && (
                                <div>
                                    <span className="block text-muted-foreground text-xs">Headquarters</span>
                                    <div className="text-foreground font-medium">{geography.hq.city ? `${geography.hq.city}, ` : ''}{geography.hq.country || 'N/A'}</div>
                                    {geography.hq.address && <div className="text-muted-foreground text-xs mt-1">{geography.hq.address}</div>}
                                </div>
                            )}
                            {legal && (
                                <div>
                                    <span className="block text-muted-foreground text-xs mt-3">Legal Entity</span>
                                    <div className="text-foreground">{legal.legalName || 'N/A'}</div>
                                    {legal.registrationNumber && <div className="text-muted-foreground text-xs">Reg: {legal.registrationNumber}</div>}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Connect / Mobile Apps */}
                    {(socialProfiles?.length || mobileApps?.length) ? (
                        <section className="bg-muted/30 p-5 rounded-lg border border-border">
                            <h3 className="text-lg font-semibold mb-4 text-foreground">Connect</h3>

                            {mobileApps && mobileApps.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Mobile Apps</h4>
                                    <div className="flex flex-col gap-2">
                                        {mobileApps.map((app, idx) => (
                                            <a
                                                key={idx}
                                                href={app.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-2 bg-card rounded-md border border-border hover:border-primary/50 hover:shadow-sm transition-all group"
                                            >
                                                {getStoreIcon(app.store!)}
                                                <span className="text-sm font-medium text-foreground group-hover:text-primary">
                                                    {app.store === 'google_play' ? 'Google Play' : app.store === 'apple_store' ? 'App Store' : 'Download App'}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {socialProfiles && socialProfiles.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Social Profiles</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {socialProfiles.map((social, idx) => (
                                            <a
                                                key={idx}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-card rounded-full border border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
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
