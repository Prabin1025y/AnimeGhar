"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function DarkModeSwitch() {
    const { setTheme, theme } = useTheme()

    return (
        <Button variant="ghost" size="icon" className="text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setTheme(theme == "dark" ? "light" : "dark")}>
            {theme == "light"
                ? <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                : <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />}
        </Button>
    )
}
