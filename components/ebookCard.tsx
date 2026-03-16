"use client"

import Image from "next/image"
import Link from "next/link"
import { Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "./ui/button"

type EbookItem = {
  id: string | number
  title: string
  author?: string
  cover?: string | null
  price?: number
  discount_price?: number
  students?: number
}

interface EbookCardProps {
  ebook: EbookItem
}

export default function EbookCard({ ebook }: EbookCardProps) {

  const formatPrice = (value?: number) => {
    if (!value) return "-"
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(value)
  }

  return (
    <Card className="overflow-hidden py-0 rounded-2xl border bg-white dark:bg-zinc-900">

      {/* Cover */}
      <div className="relative aspect-[2/3] w-full">
        {ebook.cover ? (
          <Image
            src={ebook.cover}
            alt={ebook.title}
            fill
            className="object-cover"
          />
        ) : null}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">

        {/* Author */}
        <p className="text-xs text-zinc-500 uppercase tracking-wide">
          {ebook.author || "Author"}
        </p>

        {/* Title */}
        <h3 className="font-semibold text-lg leading-snug line-clamp-2">
          {ebook.title}
        </h3>



        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-zinc-500 pt-3 border-b pb-3">

          <div className="flex items-center gap-2">
            <Users size={16} />
            {ebook.students || 0}
          </div>

          <span className="text-teal-700 font-bold">
            Free
          </span>

        </div>

        {/* Price */}
        <div className="">
        <Link href={ `/ebook/${ebook.id}`} className="cursor-pointer">


          <Button className="w-full rounded-full cursor-pointer">
            <span className="text-sm w-full text-center text-white">
              Akses Sekarang
            </span>
          </Button>
        </Link>
        </div>
      </div>

    </Card>
  )
}