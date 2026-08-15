import type { Metadata } from 'next'

import { getServerSession } from '@/actions/auth.actions'
import { TeamMemberCard } from '@/components/team/TeamMemberCard'
import { teams } from '@/teamDescriptions'

export const metadata: Metadata = {
  title: 'Team',
}

export default async function TeamPage() {
  const session = await getServerSession()

  if (!session) {
    return <div>Unauthorised Access. Please Sign in to access this page</div>
  }

  return (
    <div>

        {/* Team description Block */}
      <div className="-mx-6 -mt-6 space-y-6 bg-[#fafafa] px-30 py-20">
        <h1 className="text-5xl font-bold tracking-tight">Team 2</h1>
        <p className="mt-6 text-lg text-zinc-500">
          Meet Team 2, a group of students working together, with each team member
          contributing different skills and responsibilities to complete this project
          to the highest standard.
        </p>
      </div>

        {/* Each team member block dynamically displayed */}
      {teams.map((team, index) => (
        <TeamMemberCard key={team.name} team={team} index={index} />
      ))}
    </div>
  )
}