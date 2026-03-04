'use client'

import { News } from "@/lib/data"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { CalendarDays } from "lucide-react"

interface NewsModalProps {
    item: News | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export function NewsModal({ item, isOpen, onOpenChange }: NewsModalProps) {
    if (!item) return null

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {new Date(item.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <DialogTitle className="text-2xl font-bold leading-tight">
                        {item.title}
                    </DialogTitle>
                    <DialogDescription className="text-base font-medium text-foreground/80 mt-1">
                        {item.subtitle}
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                    {item.image && (
                        <div className="overflow-hidden rounded-lg border aspect-video relative">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {item.content}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
