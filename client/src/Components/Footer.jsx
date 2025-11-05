import React from "react";
import {
    Twitter,
    Facebook,
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin
} from "lucide-react";

function Footer() {
    return (
        <footer className="text- bg-base md:text-md xl:text-xl bg-light text-primary px-8 py-12 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2 text-2xl lg:text-3xl font-bold text-primary mb-4">
                        <span>Smart Study</span>
                    </div>
                    <p className="leading-relaxed mb-4 max-w-md">
                        The easiest app to revise concepts, break down complexity, and learn
                        faster.
                    </p>
                    <div className="flex gap-4">
                        <Twitter fill='#2b7fff' className="h-5 w-5 text-blue-500 hover:scale-125 transition-transform cursor-pointer" />
                        <Facebook fill="#155dfc" className="h-5 w-5 text-blue-600 hover:scale-125 transition-transform cursor-pointer" />
                        <Instagram className="h-5 w-5 text-pink-500 hover:scale-125 transition-transform cursor-pointer" />
                        <Youtube className="h-5 w-5 text-red-500 hover:scale-125 transition-transform cursor-pointer" />
                    </div>
                </div>

                {/* Quick Links 1 */}
                <div>
                    <h4 className="text-lg lg:text-2xl font-semibold text-primary mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-muted transition-colors duration-200">Products</a></li>
                        <li><a href="#" className="hover:text-muted transition-colors duration-200">Contacts</a></li>
                        <li><a href="#" className="hover:text-muted transition-colors duration-200">About</a></li>
                        <li><a href="#" className="hover:text-muted transition-colors duration-200">Experience</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h5 className="text-lg lg:text-2xl font-semibold text-primary mb-4">Get in Touch</h5>
                    <div className="space-y-4 text-sm">
                        <div className="flex gap-3">
                            <Mail className="h-5 w-5 text-blue-400" />
                            <div>
                                <p>akibo7394@gmail.com</p>
                                <p>support@smartstudy.com</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Phone className="h-5 w-5 text-green-400" />
                            <div>
                                <p>+91 6205573166</p>
                                <p>Mon–Fri 7AM–9PM</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <MapPin className="h-5 w-5 text-red-400" />
                            <div>
                                <p>Jamshedpur - 831002</p>
                                <p>Jharkhand, India</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Links 2 */}
                <div>
                    <h4 className="text-lg lg:text-2xl font-semibold text-primary mb-4">Explore</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-primary">Careers</a></li>
                        <li><a href="#" className="hover:text-primary">Blog</a></li>
                        <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
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
