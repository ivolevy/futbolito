"use client"

import { useState, useEffect } from "react"

export function useAdmin() {
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAdmin = () => {
            const adminSession = sessionStorage.getItem("futbolito-admin")
            setIsAdmin(adminSession === "true")
            setLoading(false)
        }

        checkAdmin()

        // Listen for storage changes (in case of login/logout in other tabs)
        window.addEventListener("storage", checkAdmin)
        return () => window.removeEventListener("storage", checkAdmin)
    }, [])

    const logout = () => {
        sessionStorage.removeItem("futbolito-admin")
        setIsAdmin(false)
        window.location.href = "/"
    }

    return { isAdmin, loading, logout }
}
