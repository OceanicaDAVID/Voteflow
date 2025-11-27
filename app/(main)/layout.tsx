import { Sidebar } from "@/components/layout/Sidebar"
import { RightSection } from "@/components/layout/RightSection"
import { MobileNav } from "@/components/layout/MobileNav"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto flex min-h-screen max-w-7xl">
      {/* Left Sidebar (Hidden on mobile) */}
      <div className="hidden w-20 flex-none border-r md:flex xl:w-72">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex w-full min-w-0 flex-1 flex-col border-r pb-16 md:pb-0">
        {children}
      </main>

      {/* Right Section (Hidden on mobile/tablet) */}
      <div className="hidden w-80 flex-none lg:block">
        <RightSection />
      </div>

      {/* Mobile Navigation (Visible only on mobile) */}
      <MobileNav />
    </div>
  )
}

