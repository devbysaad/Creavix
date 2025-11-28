import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, AlertCircle } from 'lucide-react';

const PrivacyPolicy = () => {
    const sections = [
        {
            icon: Eye,
            title: 'Information We Collect',
            content: [
                'Account Information: When you create an account, we collect your name, email address, and authentication credentials.',
                'Usage Data: We collect information about how you interact with our services, including generated content, tool usage, and feature preferences.',
                'Device Information: We may collect device type, operating system, browser type, and IP address for security and optimization purposes.',
                'Payment Information: If you subscribe to premium plans, payment processing is handled securely by third-party providers. We do not store credit card details.'
            ]
        },
        {
            icon: Database,
            title: 'How We Use Your Information',
            content: [
                'Service Delivery: To provide, maintain, and improve our AI-powered content creation tools.',
                'Personalization: To customize your experience and provide relevant content recommendations.',
                'Communication: To send you service updates, security alerts, and promotional materials (you can opt-out anytime).',
                'Analytics: To understand usage patterns and improve our platform performance.',
                'Security: To detect, prevent, and address technical issues and fraudulent activity.'
            ]
        },
        {
            icon: Lock,
            title: 'Data Security',
            content: [
                'We implement industry-standard security measures to protect your personal information.',
                'All data transmission is encrypted using SSL/TLS protocols.',
                'We regularly update our security practices and conduct vulnerability assessments.',
                'Access to personal data is restricted to authorized personnel only.',
                'We maintain secure backups to prevent data loss.'
            ]
        },
        {
            icon: UserCheck,
            title: 'Your Rights',
            content: [
                'Access: You can request a copy of your personal data at any time.',
                'Correction: You can update or correct your personal information through your account settings.',
                'Deletion: You can request deletion of your account and associated data.',
                'Portability: You can request your data in a machine-readable format.',
                'Opt-Out: You can unsubscribe from marketing communications at any time.'
            ]
        },
        {
            icon: Shield,
            title: 'Data Sharing',
            content: [
                'We DO NOT sell your personal information to third parties.',
                'We may share data with trusted service providers who assist in operating our platform (e.g., cloud hosting, analytics).',
                'We may disclose information if required by law or to protect our rights and safety.',
                'Aggregated, anonymized data may be used for research and improvement purposes.'
            ]
        },
        {
            icon: AlertCircle,
            title: 'Cookies and Tracking',
            content: [
                'We use cookies and similar technologies to enhance user experience and analyze usage patterns.',
                'Essential cookies are required for basic functionality.',
                'Analytics cookies help us understand how users interact with our platform.',
                'You can control cookie preferences through your browser settings.'
            ]
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-8 py-20 bg-white min-h-screen">
            <div className="border-4 border-black p-10 shadow-[12px_12px_0_0_#000000] bg-white">
                <h1 className="text-5xl font-mono font-black mb-6 uppercase tracking-wider">Privacy Policy</h1>
                <p className="text-sm font-mono font-bold uppercase tracking-wide text-black/60 mb-12 pb-6 border-b-4 border-black">
                    Last Updated: November 29, 2025
                </p>

                {/* Introduction */}
                <div className="mb-12 border-4 border-black p-8 bg-white shadow-[6px_6px_0_0_#000000]">
                    <p className="text-black font-mono text-lg leading-relaxed uppercase tracking-wide mb-4">
                        At Creavix AI, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our AI-powered content creation platform.
                    </p>
                    <p className="text-black font-mono text-lg leading-relaxed uppercase tracking-wide">
                        By using Creavix AI, you agree to the practices described in this policy. Please read this document carefully.
                    </p>
                </div>

                {/* Sections */}
                {sections.map((section, index) => (
                    <div key={index} className="mb-8 border-4 border-black p-8 bg-white shadow-[6px_6px_0_0_#000000]">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-600 border-4 border-black">
                                <section.icon className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-mono font-black uppercase tracking-wider">{section.title}</h2>
                        </div>
                        <ul className="space-y-4">
                            {section.content.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex gap-4">
                                    <div className="w-3 h-3 bg-black border-2 border-black mt-2 flex-shrink-0"></div>
                                    <p className="text-black font-mono leading-relaxed uppercase tracking-wide flex-1">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Children's Privacy */}
                <div className="mb-8 border-4 border-black p-8 bg-white shadow-[6px_6px_0_0_#000000]">
                    <h2 className="text-2xl font-mono font-black uppercase tracking-wider mb-6 border-b-2 border-black pb-4">Children's Privacy</h2>
                    <p className="text-black font-mono leading-relaxed uppercase tracking-wide">
                        Creavix AI is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                    </p>
                </div>

                {/* Changes to Policy */}
                <div className="mb-8 border-4 border-black p-8 bg-white shadow-[6px_6px_0_0_#000000]">
                    <h2 className="text-2xl font-mono font-black uppercase tracking-wider mb-6 border-b-2 border-black pb-4">Changes to This Policy</h2>
                    <p className="text-black font-mono leading-relaxed uppercase tracking-wide">
                        We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our platform or sending you an email. Your continued use of Creavix AI after changes are posted constitutes acceptance of the updated policy.
                    </p>
                </div>

                {/* Contact Information */}
                <div className="border-4 border-blue-600 p-8 bg-white shadow-[6px_6px_0_0_#000000]">
                    <h2 className="text-2xl font-mono font-black uppercase tracking-wider mb-6">Contact Us</h2>
                    <p className="text-black font-mono leading-relaxed uppercase tracking-wide mb-6">
                        If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-4 border-2 border-black">
                            <div className="font-mono font-black text-blue-600 uppercase">Email:</div>
                            <a href="mailto:dev.bysaad@gmail.com" className="font-mono font-bold uppercase tracking-wide text-black hover:text-blue-600 transition-colors">
                                dev.bysaad@gmail.com
                            </a>
                        </div>
                        <div className="flex items-center gap-3 p-4 border-2 border-black">
                            <div className="font-mono font-black text-blue-600 uppercase">Phone:</div>
                            <a href="tel:03335959829" className="font-mono font-bold uppercase tracking-wide text-black hover:text-blue-600 transition-colors">
                                03335959829
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
