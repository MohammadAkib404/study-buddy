import { Icon } from "@iconify/react";
import React from "react";

function Footer() {
    return (
        <footer className="text-sm md:text-md xl:text-xl bg-bg-muted text-text-primary px-8 py-12 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2 text-2xl lg:text-3xl font-bold text-text-primary mb-4">
                        <Icon icon="devicon:tailwindcss" width="30" height="30" />
                        <span>Smart Study</span>
                    </div>
                    <p className="leading-relaxed mb-4 max-w-md">
                        The easiest app to revise concepts, break down complexity, and learn
                        faster.
                    </p>
                    <div className="flex gap-4">
                        <Icon icon="mdi:twitter" width="22" className="text-blue-600 hover:scale-120 transition-all cursor-pointer" />
                        <Icon icon="mdi:facebook" width="22" className="text-blue-500 hover:scale-120 transition-all cursor-pointer" />
                        <Icon icon="mdi:instagram" width="22" className="text-pink-500 hover:scale-120 transition-all cursor-pointer" />
                        <Icon icon="mdi:youtube" width="22" className="text-red-500 hover:scale-120 transition-all cursor-pointer" />
                    </div>
                </div>

                {/* Quick Links 1 */}
                <div>
                    <h4 className="text-lg lg:text-2xl font-semibold text-text-primary mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-text-secondary transition-colors duration-200">Products</a></li>
                        <li><a href="#" className="hover:text-text-secondary transition-colors duration-200">Contacts</a></li>
                        <li><a href="#" className="hover:text-text-secondary transition-colors duration-200">About</a></li>
                        <li><a href="#" className="hover:text-text-secondary transition-colors duration-200">Experience</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h5 className="text-lg lg:text-2xl font-semibold text-text-primary mb-4">Get in Touch</h5>
                    <div className="space-y-4 text-sm">
                        <div className="flex gap-3">
                            <Icon icon="material-symbols:mail-outline" width="22" className="text-blue-400" />
                            <div>
                                <p>akibo7394@gmail.com</p>
                                <p>support@smartstudy.com</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Icon icon="ic:baseline-phone" width="22" className="text-green-400" />
                            <div>
                                <p>+91 6205573166</p>
                                <p>Mon–Fri 7AM–9PM</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Icon icon="mdi:location" width="22" className="text-red-400" />
                            <div>
                                <p>Jamshedpur - 831002</p>
                                <p>Jharkand, India</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Links 2 */}
                <div>
                    <h4 className="text-lg lg:text-2xl font-semibold text-text-primary mb-4">Explore</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-text-primary">Careers</a></li>
                        <li><a href="#" className="hover:text-text-primary">Blog</a></li>
                        <li><a href="#" className="hover:text-text-primary">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-text-primary">Terms of Service</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Smart Study. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
