"use client";

import { useTheme } from "@/app/providers/theme-provider";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export function ModeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 border border-border rounded-md bg-secondary opacity-50" />
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-md border border-border bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <FiSun className="w-5 h-5 transition-transform duration-300 hover:rotate-90" />
            ) : (
                <FiMoon className="w-5 h-5 transition-transform duration-300 hover:-rotate-12" />
            )}
        </button>
    );
}
