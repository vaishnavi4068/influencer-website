import { ReactNode } from 'react'
import Header from './Header'

interface LayoutProps {
    children: ReactNode
    hideHeader?: boolean
}

export default function Layout({ children, hideHeader }: LayoutProps) {
    return (
        <div className="min-h-screen">
            {!hideHeader && <Header />}
            <main>
                {children}
            </main>
        </div>
    )
}
