import Link from 'next/link'
export function NavBar() {
    return <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
            <Link href={"/"} className="btn btn-ghost text-xl">Dallon Gunn</Link>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
                <li><Link href="/">Home</Link></li>
                <li><Link href="about/">About</Link></li>
            </ul>
        </div>
    </div>
}