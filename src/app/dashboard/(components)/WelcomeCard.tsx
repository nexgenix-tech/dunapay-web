import { Card, CardContent } from "@/components/ui/card"
import { User as UserIcon } from "lucide-react"
import type { User } from "@/lib/types"

interface WelcomeCardProps {
  user: User | null
}

export default function WelcomeCard({ user }: WelcomeCardProps) {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 17 ? "Good afternoon" : "Good evening"

  return (
    <Card className="bg-gradient-to-r from-[#6B8E23] to-[#4A7C59] text-white mb-4">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-full">
            <UserIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {greeting}, {user!.firstName}!
            </h1>
            <p className="text-white/90 mt-1">
              Welcome back to your dunaPAY dashboard. Here&apos;s an overview of your traffic fines.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}