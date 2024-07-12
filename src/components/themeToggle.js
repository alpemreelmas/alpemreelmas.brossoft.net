"use client"
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {MoonIcon, SunIcon} from "lucide-react";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="grid place-content-center w-full">
                <div
                    className="inline-block h-4 w-4 animate-spin rounded-full border-[2px] border-current border-t-transparent text-black"
                    role="status"
                    aria-label="loading"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={"flex justify-center items-center w-full"} style={{zIndex: "9"}}>
            <button
                onClick={toggleTheme}
                className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                        theme === 'dark' ? 'bg-gray-600' : 'bg-blue-400'
                    }`}
                >
                    <div
                        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out items-center flex ${
                            theme === 'dark' ? 'translate-x-6' : ''
                        }`}
                    >
                        {theme === 'light' ? (
                            <SunIcon className={"mx-auto my-auto"} size={20} color={"gray"}/>
                        ) : (
                            <MoonIcon className={"mx-auto my-auto"} size={20} color={"gray"}/>
                            
                        )}
                    </div>
                </button>
            </div>
    );
}

