import React from 'react';
import { Sparkles, Target, Users, Zap } from 'lucide-react';

const AboutUs = () => {
    return (
        <div className="max-w-6xl mx-auto px-8 py-20 bg-white min-h-screen">
            <div className="border-4 border-black p-10 shadow-[12px_12px_0_0_#000000] bg-white">
                <h1 className="text-5xl font-mono text-black mb-12 uppercase tracking-wider border-b-4 border-black pb-6">About Creavix AI</h1>

                {/* Mission Section */}
                <div className="mb-12 border-4 border-black p-8 bg-white shadow-[6px_6px_0_0_#000000]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-600 border-4 border-black">
                            <Target className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-mono font-black uppercase tracking-wider">Our Mission</h2>
                    </div>
                    <p className="text-black font-mono text-lg leading-relaxed uppercase tracking-wide">
                        Creavix AI is dedicated to democratizing artificial intelligence and making advanced content creation tools accessible to everyone. We believe in empowering creators, businesses, and individuals with cutting-edge AI technology that streamlines workflows and unleashes creativity.
                    </p>
                </div>

                {/* What We Do */}
                <div className="mb-12 border-4 border-black p-8 bg-white shadow-[6px_6px_0_0_#000000]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-black border-4 border-black">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-mono font-black uppercase tracking-wider">What We Do</h2>
                    </div>
                    <p className="text-black font-mono text-lg leading-relaxed uppercase tracking-wide mb-6">
                        Our platform provides a comprehensive suite of AI-powered tools designed to transform the way you create content:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            'AI Article Writing',
                            'Image Generation',
                            'Background Removal',
                            'Object Removal',
                            'Blog Title Generation',
                            'Resume Review'
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 p-4 border-2 border-black bg-white">
                                <div className="w-3 h-3 bg-blue-600 border-2 border-black"></div>
                                <span className="font-mono font-bold uppercase tracking-wide text-black">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Our Values */}
                <div className="mb-12 border-4 border-black p-8 bg-white shadow-[6px_6px_0_0_#000000]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-600 border-4 border-black">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-mono font-black uppercase tracking-wider">Our Values</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="border-l-4 border-blue-600 pl-6 py-2">
                            <h3 className="font-mono font-black text-xl uppercase tracking-wide text-black mb-2">Innovation</h3>
                            <p className="font-mono text-black uppercase tracking-wide">We constantly push the boundaries of what's possible with AI technology.</p>
                        </div>
                        <div className="border-l-4 border-black pl-6 py-2">
                            <h3 className="font-mono font-black text-xl uppercase tracking-wide text-black mb-2">Accessibility</h3>
                            <p className="font-mono text-black uppercase tracking-wide">Powerful AI tools should be available to everyone, not just enterprises.</p>
                        </div>
                        <div className="border-l-4 border-blue-600 pl-6 py-2">
                            <h3 className="font-mono font-black text-xl uppercase tracking-wide text-black mb-2">Quality</h3>
                            <p className="font-mono text-black uppercase tracking-wide">We never compromise on the quality of our AI-generated outputs.</p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="border-4 border-black p-8 bg-white shadow-[6px_6px_0_0_#000000]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-black border-4 border-black">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-mono font-black uppercase tracking-wider">Our Team</h2>
                    </div>
                    <p className="text-black font-mono text-lg leading-relaxed uppercase tracking-wide">
                        Creavix AI is built by a passionate team of developers, designers, and AI enthusiasts committed to creating tools that make a real difference in people's creative workflows. We're constantly learning, iterating, and improving to serve you better.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
