'use client'

import { useState } from "react"
import { News } from "@/lib/data"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { NewsModal } from "./news-modal"
import { ArrowRight } from "lucide-react"

interface NewsSectionProps {
    news: News[]
}

export function NewsSection({ news }: NewsSectionProps) {
    const [selectedNews, setSelectedNews] = useState<News | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenNews = (item: News) => {
        setSelectedNews(item)
        setIsModalOpen(true)
    }

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Ultimas noticias</h2>
                <div className="h-1 w-12 bg-primary rounded-full" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {news.map((item) => (
                    <Card
                        key={item.id}
                        className="group cursor-pointer overflow-hidden border-border transition-all hover:border-primary/30 hover:shadow-md"
                        onClick={() => handleOpenNews(item)}
                    >
                        {item.image && (
                            <div className="aspect-video w-full overflow-hidden border-b">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        )}
                        <CardHeader className="p-5">
                            <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                                {new Date(item.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
                            </div>
                            <CardTitle className="line-clamp-2 text-lg leading-tight group-hover:text-primary transition-colors">
                                {item.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2 mt-2">
                                {item.subtitle}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-5 pb-5 pt-0">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                                Leer nota completa <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <NewsModal
                item={selectedNews}
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </section>
    )
}
