"use client"

import { useLanguage } from "@/components/providers/LanguageProvider"
import { languages, Language } from "@/lib/i18n"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {t('settings.language')}
      </label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}

