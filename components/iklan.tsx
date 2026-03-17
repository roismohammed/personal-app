"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import iklan from "@/public/assets/images/iklan.png";

const AD_SEEN_KEY = "personal-app:iklan-seen";

export default function Iklan() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasSeenAd = localStorage.getItem(AD_SEEN_KEY);
        if (!hasSeenAd) {
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem(AD_SEEN_KEY, "1");
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4">
            <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Tutup iklan"
                    className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                >
                    <X size={18} />
                </button>

                <Image
                    src={iklan}
                    alt="Iklan promosi"
                    priority
                    className="h-auto w-full"
                />
            </div>
        </div>
    );
}