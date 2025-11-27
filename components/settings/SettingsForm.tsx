"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/providers/LanguageProvider"
import { Language } from "@/lib/translations"

interface SettingsFormProps {
  user: {
    name: string | null
    walletAddress: string | null
    email: string | null
  }
}

export function SettingsForm({ user }: SettingsFormProps) {
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const [name, setName] = useState(user.name || "")
  const [walletAddress, setWalletAddress] = useState(user.walletAddress || "")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, walletAddress }),
      })

      if (res.ok) {
        router.refresh()
        alert(t('settings.saved'))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {t('settings.language')}
        </label>
        <select 
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
        >
          <option value="en">English</option>
          <option value="zh">中文 (Chinese)</option>
          <option value="ja">日本語 (Japanese)</option>
          <option value="ko">한국어 (Korean)</option>
          <option value="es">Español (Spanish)</option>
          <option value="fr">Français (French)</option>
          <option value="de">Deutsch (German)</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Display Name
        </label>
        <Input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Email
        </label>
        <Input 
          value={user.email || ""} 
          disabled 
          className="bg-muted"
        />
        <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Wallet Details
        </label>
        
        <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200 mb-2">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Important Safety Warning</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>To prevent loss of funds, please clearly specify:</p>
                <ul className="list-disc space-y-1 pl-5 mt-1">
                  <li><strong>Network</strong> (e.g., ERC20, TRC20, Solana, BSC)</li>
                  <li><strong>Token</strong> (e.g., USDT, USDC, ETH)</li>
                  <li><strong>Memo/Tag</strong> (Required for some Exchange addresses)</li>
                </ul>
                <p className="mt-2">Example: <em>"USDT (TRC20): Txyz... | ETH (ERC20): 0xabc..."</em></p>
              </div>
            </div>
          </div>
        </div>

        <Input 
          value={walletAddress} 
          onChange={(e) => setWalletAddress(e.target.value)} 
          placeholder="e.g. USDT (TRC20): Txyz... | ETH: 0x..."
        />
        <p className="text-xs text-muted-foreground">
          Enter your network, address, and accepted tokens. This will be shown to tippers.
        </p>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}

