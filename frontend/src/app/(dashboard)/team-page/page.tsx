import type { Metadata } from 'next'
import { getServerSession } from '@/actions/auth.actions'
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

            <div className="-mx-6 -mt-6 space-y-6 px-30 py-20 bg-[#fafafa]">
                <h1 className="text-5xl font-bold tracking-tight">
                    Team 2
                </h1>
                    <p className="mt-6 text-lg text-base text-zinc-500">
                        Meet Team 2, a group of students working together, with each team member contributing different skills and responsibilities to complete this project to the highest standard.
                    </p>
            </div>

         
        {teams.map((team, index) => (

            <div 
                key={team.name}
                className={`-mx-6 -mt-6 space-y-6 px-30 py-20 ${index % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'}`} >

                {/* Reversing the content inside each div */}
                <div 
                className={`flex items-center gap-20 ${index % 2 === 1 ? 'flex-row-reverse' : 'flex-row'}`}> 

                    {/* Initials box */}
                    <div 
                        className={`flex h-[260px] w-[260px] items-center justify-center rounded-[30px] shrink-0 ${team.boxColour}`}>                          
                            <span className={`text-7xl font-bold ${team.textColour}`}>
                                {team.initials}
                            </span>
                    </div>

                    {/* Team Member information beside the initial box */}
                    <div className="flex-1">

                        {/* Index + role */}
                        <div className="mb-5 flex font-semibold text-sm items-center gap-3">

                            {/* Index */}
                            <span className="text-zinc-300">
                                {String(index + 1).padStart(2, '0')}
                            </span>

                            {/* . */}
                            <span className="text-zinc-300">
                                •
                            </span>

                            {/* role */}
                            <span className="text-blue-600 tracking-wide">
                                {team.role}
                            </span>

                        </div>

                        {/* name */}
                        <h2 className="text-4xl font-bold text-zinc-900">
                            {team.name}
                        </h2>

                        {/* description */}
                        <p className="mt-6 text-lg text-zinc-600">
                            {team.description}
                        </p>

                    </div>
                    
                </div>

            </div>

        ))}
        </div>

    )



}