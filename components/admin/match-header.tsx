"use client"

import { useAdmin } from "@/hooks/use-admin"
import { Plus } from "lucide-react"
import { useState } from "react"
import { MatchModal } from "@/components/admin/match-modal"

interface AdminMatchHeaderProps {
    venues: any[]
}

export function AdminMatchHeader({ venues }: AdminMatchHeaderProps) {
    const { isAdmin } = useAdmin()
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (!isAdmin) return null

    return (
        <div className="mb-6">
            <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
                <Plus className="h-4 w-4" />
                Programar Partido
            </button>

            {isModalOpen && (
                <MatchModal
                    venues={venues}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    )
}
