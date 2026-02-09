import { HugeiconsIcon } from '@hugeicons/react';
import { Github01Icon, InstagramIcon, Linkedin01Icon, TiktokIcon } from '@hugeicons/core-free-icons';
import WrapperLayout from './wrapperLayout';

export default function Footer() {
    return (
        <div>
            <footer className="bg-zinc-800 dark:border-t darl:border text-zinc-200 py-12">
                <WrapperLayout>
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                            <div className="md:col-span-2">
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">R</span>
                                    </div>
                                    <span className="font-bold text-xl text-white">RoisDev</span>
                                </div>
                                <p className="text-zinc-400 mb-4 max-w-md">
                                    Full-stack developer yang berfokus pada pembuatan solusi digital inovatif dengan teknologi terkini.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="h-10 w-10 rounded-full bg-zinc-400 flex items-center justify-center hover:bg-blue-600 transition-colors">
                                        <HugeiconsIcon
                                            icon={Github01Icon}
                                            size={24}
                                            color="currentColor"
                                            strokeWidth={1.5}
                                        />
                                    </a>
                                    <a href="#" className="h-10 w-10 rounded-full bg-zinc-400 flex items-center justify-center hover:bg-blue-600 transition-colors">
                                        <HugeiconsIcon
                                            icon={Linkedin01Icon}
                                            size={24}
                                            color="currentColor"
                                            strokeWidth={1.5}
                                        />
                                    </a>
                                    <a href="#" className="h-10 w-10 rounded-full bg-zinc-400 flex items-center justify-center hover:bg-blue-600 transition-colors">
                                        <HugeiconsIcon
                                            icon={TiktokIcon}
                                            size={24}
                                            color="currentColor"
                                            strokeWidth={1.5}
                                        />
                                    </a>
                                    <a href="#" className="h-10 w-10 rounded-full bg-zinc-400 flex items-center justify-center hover:bg-blue-600 transition-colors">
                                        <HugeiconsIcon
                                            icon={InstagramIcon}
                                            size={24}
                                            color="currentColor"
                                            strokeWidth={1.5}
                                        />
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white mb-4">Tautan Cepat</h3>
                                <ul className="space-y-2">
                                    <li><a href="#home" className="text-zinc-400 hover:text-white transition-colors">Home</a></li>
                                    <li><a href="#services" className="text-zinc-400 hover:text-white transition-colors">Layanan</a></li>
                                    <li><a href="#projects" className="text-zinc-400 hover:text-white transition-colors">Proyek</a></li>
                                    <li><a href="#articles" className="text-zinc-400 hover:text-white transition-colors">Artikel</a></li>
                                    <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">Tentang</a></li>
                                </ul>
                            </div>


                            <div>
                                <h3 className="font-semibold text-white mb-4">Kontak</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center space-x-3">
                                        <i className="fas fa-envelope text-blue-500"></i>
                                        <span className="text-zinc-400">id.roismohammed@gmail.com</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <i className="fas fa-map-marker-alt text-red-500"></i>
                                        <span className="text-zinc-400">Jawa Timur, Indonesia</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center">
                            <div className="text-zinc-400 text-sm mb-4 md:mb-0">
                                © {new Date().getFullYear()} RoisDev. All rights reserved.
                            </div>
                            <div className="flex space-x-6 text-sm">
                                <a href="#" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</a>
                                <a href="#" className="text-zinc-400 hover:text-white transition-colors">Terms of Service</a>
                                <a href="#" className="text-zinc-400 hover:text-white transition-colors">Cookie Policy</a>
                            </div>
                        </div>
                    </div>
                </WrapperLayout>
            </footer>
        </div>
    )
}
