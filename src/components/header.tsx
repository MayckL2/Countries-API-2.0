import { useEffect, useState } from "react"
import { LuMoonStar } from "react-icons/lu";
import { MdOutlineWbSunny } from "react-icons/md";

export default function Header() {
    const [dark, setDark] = useState(false)
    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            setDark(true)
        } else {
            document.documentElement.classList.remove('dark')
            setDark(false)
        }
    }, [])

    // Troca tema do site
    function handleDarkMode() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark')
            setDark(false)
        } else {
            document.documentElement.classList.add('dark')
            setDark(true)
        }
    }

    return (<header className="bg-slate-300 dark:bg-slate-700 flex items-center justify-between px-4 sm:px-8 py-4">
        <h1 className="capitalize text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">Where in the world?</h1>

        <button onClick={handleDarkMode} className="flex items-center gap-2 p-2 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 rounded-xl hover:bg-slate-500 transition-all">
            {dark ? <MdOutlineWbSunny className="text-xl" /> : <LuMoonStar className="text-xl" />}
            Dark mode
        </button>
    </header>)
}