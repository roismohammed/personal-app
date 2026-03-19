import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WrapperLayout from '@/components/wrapperLayout';
import { GridPattern } from '@/components/ui/grid-pattern';
import { VideoDemo } from '@/components/video-demo';
import { cn } from '@/lib/utils';
import {
    ArrowRight,
    BookOpen,
    CalendarDays,
    CircleCheckBig,
    Layers3,
    PlayCircle,
    Sparkles,
    Zap,
} from 'lucide-react';

type PremiumBenefit = {
    title: string;
    desc: string;
};

type CurriculumSection = {
    title: string;
    items: string[];
};

type ToolItem = {
    name: string;
    icon: string;
};

type EbookRow = {
    id: string;
    slug: string | null;
    title: string | null;
    description: string | null;
    content: string | null;
    cover: string | null;
    image: string | null;
    category: string | null;
    category_badge: string | null;
    benefits: unknown;
    premium_benefits: unknown;
    curriculum: unknown;
    tools: unknown;
    created_at: string | null;
};

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const revalidate = 300;

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function parseBenefits(value: unknown): string[] {
    if (isStringArray(value) && value.length > 0) {
        return value.filter(Boolean);
    }

    return [
        'Materi runtut dari basic sampai praktik',
        'Studi kasus yang langsung bisa diterapkan',
        'Cocok untuk belajar mandiri dan bertahap',
    ];
}

function parsePremiumBenefits(value: unknown): PremiumBenefit[] {
    if (Array.isArray(value)) {
        const parsed = value
            .map((item) => {
                if (typeof item !== 'object' || item === null) return null;
                const raw = item as { title?: unknown; desc?: unknown };

                return {
                    title: typeof raw.title === 'string' ? raw.title : '',
                    desc: typeof raw.desc === 'string' ? raw.desc : '',
                };
            })
            .filter((item): item is PremiumBenefit => Boolean(item?.title || item?.desc));

        if (parsed.length > 0) return parsed;
    }

    return [
        {
            title: 'Up to Date',
            desc: 'Materi disesuaikan dengan pendekatan pengembangan web modern.',
        },
        {
            title: 'Project Oriented',
            desc: 'Setiap pembahasan fokus pada implementasi nyata, bukan teori saja.',
        },
        {
            title: 'Belajar Fleksibel',
            desc: 'Akses materi kapan saja sesuai ritme belajar Anda sendiri.',
        },
    ];
}

function parseCurriculum(value: unknown): CurriculumSection[] {
    if (Array.isArray(value)) {
        const parsed = value
            .map((section) => {
                if (typeof section !== 'object' || section === null) return null;
                const raw = section as { title?: unknown; items?: unknown };

                return {
                    title: typeof raw.title === 'string' ? raw.title : '',
                    items: isStringArray(raw.items) ? raw.items.filter(Boolean) : [],
                };
            })
            .filter((item): item is CurriculumSection => Boolean(item?.title || item?.items.length));

        if (parsed.length > 0) return parsed;
    }

    return [
        {
            title: 'Fundamental',
            items: ['Pengenalan materi dan setup awal', 'Struktur project yang terarah'],
        },
        {
            title: 'Implementasi',
            items: ['Membangun fitur utama', 'Optimasi dan best practices'],
        },
    ];
}

function parseTools(value: unknown): ToolItem[] {
    if (Array.isArray(value)) {
        const parsed = value
            .map((item) => {
                if (typeof item !== 'object' || item === null) return null;
                const raw = item as { name?: unknown; icon?: unknown };

                return {
                    name: typeof raw.name === 'string' ? raw.name : '',
                    icon: typeof raw.icon === 'string' ? raw.icon : '',
                };
            })
            .filter((item): item is ToolItem => Boolean(item?.name));

        if (parsed.length > 0) return parsed;
    }

    return [
        { name: 'Next.js', icon: 'N' },
        { name: 'TypeScript', icon: 'TS' },
        { name: 'Tailwind CSS', icon: 'TW' },
    ];
}

function formatDate(dateString: string | null): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return '-';

    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

async function getEbookByIdentifier(identifier: string): Promise<EbookRow | null> {
    const { data: bySlug, error: slugError } = await supabase
        .from('ebooks')
        .select('*')
        .eq('slug', identifier)
        .maybeSingle();

    if (bySlug) {
        return bySlug as EbookRow;
    }

    const { data: byId, error: idError } = await supabase
        .from('ebooks')
        .select('*')
        .eq('id', identifier)
        .maybeSingle();

    if (!byId && (slugError || idError)) {
        console.error('Supabase detail ebook error:', slugError || idError);
        return null;
    }

    return (byId as EbookRow) || null;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id: identifier } = await params;
    const ebook = await getEbookByIdentifier(identifier);

    if (!ebook) {
        return {
            title: 'Ebook | RoisDev',
            description: 'Detail ebook dari RoisDev.',
        };
    }

    const title = ebook.title || 'Ebook';
    const description = ebook.description || 'Detail ebook dari RoisDev.';
    const pathIdentifier = ebook.slug || ebook.id;
    const canonical = `https://roisdev.my.id/ebook/${pathIdentifier}`;

    return {
        title: `${title} | RoisDev`,
        description,
        alternates: {
            canonical,
        },
        openGraph: {
            type: 'article',
            url: canonical,
            title: `${title} | RoisDev`,
            description,
            images: [
                {
                    url: ebook.cover || ebook.image || '/favicon.jpeg',
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
    };
}

export default async function EbookDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: identifier } = await params;
    const ebook = await getEbookByIdentifier(identifier);

    if (!ebook) {
        notFound();
    }

    const title = ebook.title || 'Untitled Ebook';
    const cover = ebook.cover || ebook.image || '';
    const category = ebook.category || ebook.category_badge || 'General';
    const description = ebook.description || 'Penjelasan ebook belum tersedia.';
    const pathIdentifier = ebook.slug || ebook.id;

    const benefits = parseBenefits(ebook.benefits);
    const premiumBenefits = parsePremiumBenefits(ebook.premium_benefits);
    const curriculum = parseCurriculum(ebook.curriculum);
    const tools = parseTools(ebook.tools);

    return (
        <div>

            <div className="relative overflow-hidden pt-14  dark:bg-zinc-900">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(20,184,166,0.16),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(2,132,199,0.14),_transparent_50%)]" />

                <WrapperLayout>
                    <div className="py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div className="space-y-6 order-2 lg:order-1">
                            <Badge className="rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-semibold uppercase text-[10px] tracking-widest px-4 py-1">
                                {category}
                            </Badge>

                            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-zinc-900 dark:text-zinc-100">
                                {title}
                            </h1>

                            <p className="text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                                {description}
                            </p>

                            <div className="flex flex-wrap gap-3 text-sm">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/70">
                                    <CalendarDays size={15} className="text-teal-600" />
                                    {formatDate(ebook.created_at)}
                                </div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/70">
                                    <Layers3 size={15} className="text-cyan-600" />
                                    {curriculum.length} Modul
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Link href={`/ebook/${pathIdentifier}/learn`}>
                                    <Button className="h-12 rounded-full px-7 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 gap-2 font-semibold cursor-pointer">
                                        Mulai Belajar <ArrowRight size={16} />
                                    </Button>
                                </Link>
                                <a href="#video-demo">
                                    <Button variant="outline" className="h-12 rounded-full px-7 gap-2 font-semibold cursor-pointer">
                                        Lihat Demo <PlayCircle size={16} />
                                    </Button>
                                </a>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="relative aspect-[5/5] rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
                                {cover ? (
                                    <Image
                                        src={cover}
                                        alt={title}
                                        fill
                                        priority
                                        className="object-cover"
                                        sizes="(max-width: 600px) 60vw, 45vw"
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center bg-[linear-gradient(140deg,#ccfbf1,#ecfeff)] dark:bg-[linear-gradient(140deg,#1f2937,#0f172a)]">
                                        <BookOpen className="h-20 w-20 text-zinc-600 dark:text-zinc-300" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </WrapperLayout>
            </div>

            <WrapperLayout>
                <div className="py-10 space-y-10">
                    <section id="video-demo" className="space-y-4">
                        <div className="text-center">
                            <p className="text-xs uppercase tracking-[0.2em] text-teal-600 font-semibold">Demo Video</p>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2">Lihat Gambaran Isi Ebook</h2>
                            <p className="text-zinc-500 mt-3 max-w-2xl mx-auto">
                                Video ini memberi preview gaya penyampaian materi, struktur pembelajaran, dan hasil akhir yang akan Anda capai.
                            </p>
                        </div>
                        <div className="rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-700 p-3 md:p-4 bg-white dark:bg-zinc-900">
                            <VideoDemo />
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {premiumBenefits.map((item, idx) => (
                            <Card key={`${item.title}-${idx}`} className="py-0 shadow-none border-zinc-200 dark:border-zinc-700 rounded-3xl">
                                <CardContent className="p-6 space-y-4">
                                    <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                                        <Sparkles className="h-5 w-5 text-teal-700 dark:text-teal-300" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2 py-0 shadow-none border-zinc-200 dark:border-zinc-700 rounded-3xl">
                            <CardContent className="p-7 md:p-8 space-y-6">
                                <h2 className="text-2xl md:text-3xl font-bold">Penjelasan Ebook</h2>

                                {ebook.content ? (
                                    <div
                                        className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-teal-600"
                                        dangerouslySetInnerHTML={{ __html: ebook.content }}
                                    />
                                ) : (
                                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                        Ebook ini dirancang untuk membantu Anda memahami konsep penting secara praktis. Materi disusun bertahap,
                                        mulai dari pondasi hingga implementasi, agar proses belajar lebih cepat dan mudah diikuti.
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="py-0 shadow-none border-zinc-200 dark:border-zinc-700 rounded-3xl">
                            <CardContent className="p-7 space-y-6">
                                <h3 className="text-xl font-bold">Yang Akan Anda Dapat</h3>

                                <div className="space-y-3">
                                    {benefits.map((benefit, idx) => (
                                        <div key={`${benefit}-${idx}`} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                                            <Zap className="h-4 w-4 text-teal-600 mt-0.5" />
                                            <span>{benefit}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
                                    <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">Tech Stack</p>
                                    <div className="flex flex-wrap gap-2">
                                        {tools.map((tool, idx) => (
                                            <Badge
                                                key={`${tool.name}-${idx}`}
                                                variant="outline"
                                                className="rounded-full border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800"
                                            >
                                                {tool.icon ? `${tool.icon} ` : ''}
                                                {tool.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="rounded-[2rem] border border-zinc-200 dark:border-zinc-700 p-7 md:p-8 bg-white dark:bg-zinc-900">
                        <h2 className="text-2xl md:text-3xl font-bold mb-5">Kurikulum</h2>
                        <div className="space-y-4">
                            {curriculum.map((section, sectionIdx) => (
                                <div key={`${section.title}-${sectionIdx}`} className="rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5">
                                    <h3 className="font-semibold text-lg mb-3">{section.title}</h3>
                                    <ul className="space-y-2">
                                        {section.items.map((item, itemIdx) => (
                                            <li key={`${item}-${itemIdx}`} className="text-sm text-zinc-600 dark:text-zinc-300 flex items-start gap-2">
                                                <CircleCheckBig className="h-4 w-4 text-teal-600 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[2rem] bg-zinc-900 text-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold">Siap Mulai Belajar?</h3>
                            <p className="text-zinc-300 mt-2">Akses materi ebook sekarang dan lanjutkan ke halaman pembelajaran interaktif.</p>
                        </div>
                        <Link href={`/ebook/${pathIdentifier}/learn`}>
                            <Button className="h-12 px-7 rounded-full bg-teal-600 hover:bg-teal-500 text-white gap-2 font-semibold cursor-pointer">
                                Akses Ebook <ArrowRight size={16} />
                            </Button>
                        </Link>
                    </section>
                </div>
            </WrapperLayout>
        </div>
    );
}
