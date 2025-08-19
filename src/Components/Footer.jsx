import { Icon } from "@iconify/react";
import React from "react";

function Footer() {
    return (
        <footer className="text-neutral px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2 text-2xl font-bold text-secondary mb-4">
                        <Icon icon="devicon:tailwindcss" width="30" height="30" />
                        <span>Smart Study</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-4">
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
                    <h4 className="text-lg font-semibold text-neutral mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-neutral">Products</a></li>
                        <li><a href="#" className="hover:text-neutral">Contacts</a></li>
                        <li><a href="#" className="hover:text-neutral">About</a></li>
                        <li><a href="#" className="hover:text-neutral">Experience</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h5 className="text-lg font-semibold text-neutral mb-4">Get in Touch</h5>
                    <div className="space-y-4 text-sm">
                        <div className="flex gap-3">
                            <Icon icon="material-symbols:mail-outline" width="22" className="text-blue-400" />
                            <div>
                                <p>hello@dailydish.com</p>
                                <p>support@dailydish.com</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Icon icon="ic:baseline-phone" width="22" className="text-green-400" />
                            <div>
                                <p>+1 (555) 123-456</p>
                                <p>Mon–Fri 9AM–6PM</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Icon icon="mdi:location" width="22" className="text-red-400" />
                            <div>
                                <p>123 Culinary Street</p>
                                <p>Food City, FC 12345</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Links 2 */}
                <div>
                    <h4 className="text-lg font-semibold text-neutral mb-4">Explore</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-neutral">Careers</a></li>
                        <li><a href="#" className="hover:text-neutral">Blog</a></li>
                        <li><a href="#" className="hover:text-neutral">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-neutral">Terms of Service</a></li>
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
