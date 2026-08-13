import type { Metadata } from 'next'
import { getServerSession } from '@/actions/auth.actions'
import type { Team } from '@/types/firestore'
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
                    <p className="mt-3 max-w-2xl text-base text-zinc-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
            </div>

         
        {teams.map((team, index) => (
            

            <div 
                key={team.name}
                className={`-mx-6 -mt-6 space-y-6 px-30 py-20 ${index % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'}`} >

                {/* Reversing the content inside each div */}
                <div 
                className={`flex items-center gap-20 ${index % 2 === 1 ? 'flex-row-reverse' : 'flex-row'}`}> 

                    <h1>hi</h1>
                    <p>hello</p>



                </div>



            </div>
            
        ))}
        </div>

        
        
        

    )



}