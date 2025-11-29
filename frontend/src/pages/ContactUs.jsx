import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Twitter, Github, Send } from 'lucide-react';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    const contactInfo = [
        {
            icon: Phone,
            label: 'Phone',
            value: '03335959829',
            href: 'tel:03335959829'
        },
        {
            icon: Mail,
            label: 'Email',
            value: 'dev.bysaad@gmail.com',
            href: 'mailto:dev.bysaad@gmail.com'
        }
    ];

    const socialLinks = [
        {
            icon: Linkedin,
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/muhammad-saad-972185381/',
            color: 'bg-blue-600'
        },
        {
            icon: Twitter,
            label: 'Twitter/X',
            href: 'https://x.com/maisaadhon',
            color: 'bg-black'
        },
        {
            icon: Github,
            label: 'GitHub',
            href: 'https://github.com/devbysaad/',
            color: 'bg-black'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-8 py-20 bg-white min-h-screen">
            <div className="border-4 border-black p-10 shadow-[12px_12px_0_0_#000000] bg-white">
                <h1 className="text-5xl font-mono text-black mb-12 uppercase tracking-wider border-b-4 border-black pb-6">Contact Us</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="border-4 border-black p-8 bg-white shadow-[6px_6px_0_0_#000000]">
                        <h2 className="text-2xl font-mono font-black mb-6 uppercase tracking-wider border-b-2 border-black pb-4">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="JOHN DOE"
                                    className="w-full border-4 border-black rounded-none px-6 py-4 font-mono font-bold uppercase tracking-wide focus:outline-none focus:border-blue-600 bg-white text-black placeholder-black/40"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="JOHN@EXAMPLE.COM"
                                    className="w-full border-4 border-black rounded-none px-6 py-4 font-mono font-bold uppercase tracking-wide focus:outline-none focus:border-blue-600 bg-white text-black placeholder-black/40"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="TELL US HOW WE CAN HELP..."
                                    className="w-full border-4 border-black rounded-none px-6 py-4 font-mono font-bold uppercase tracking-wide focus:outline-none focus:border-blue-600 bg-white text-black placeholder-black/40"
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white px-8 py-4 rounded-none border-4 border-black hover:bg-blue-600 hover:border-blue-600 transition-all duration-200 shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 font-mono font-black uppercase tracking-widest flex items-center justify-center gap-3"
                            >
                                <Send className="w-5 h-5" />
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        {/* Contact Details */}
                        <div className="border-4 border-black p-8 bg-white shadow-[6px_6px_0_0_#000000]">
                            <h2 className="text-2xl font-mono font-black mb-6 uppercase tracking-wider border-b-2 border-black pb-4">Get In Touch</h2>
                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className="flex items-center gap-4 p-4 border-2 border-black hover:border-blue-600 transition-colors group"
                                    >
                                        <div className="p-3 bg-black border-2 border-black group-hover:bg-blue-600 transition-colors">
                                            <item.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-mono font-bold uppercase tracking-widest text-black/60">{item.label}</p>
                                            <p className="text-lg font-mono font-black uppercase tracking-wide text-black">{item.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="border-4 border-black p-8 bg-white shadow-[6px_6px_0_0_#000000]">
                            <h2 className="text-2xl font-mono font-black mb-6 uppercase tracking-wider border-b-2 border-black pb-4">Follow Us</h2>
                            <div className="space-y-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 border-2 border-black hover:border-blue-600 transition-all hover:shadow-[4px_4px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 duration-200"
                                    >
                                        <div className={`p-3 ${social.color} border-2 border-black`}>
                                            <social.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="text-lg font-mono font-black uppercase tracking-wide text-black">{social.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
