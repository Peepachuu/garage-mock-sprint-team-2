'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Team } from '@/types/firestore'

// Card used for each member on the team page.
export function TeamMemberCard({team, index}: 
    {team: Team; index: number}) {

  // Track whether the image failed to load so we can switch to displaying to initials.
  const [imageFailed, setImageFailed] = useState(false)

  // Only render the image when it exists and it has not failed to load.
  const showImage = Boolean(team.image) && !imageFailed

  return (
    <div
      className={`-mx-6 -mt-6 space-y-6 px-30 py-20 ${
        index % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'
      }`}
    >
      <div
        className={`flex items-center gap-20 ${index % 2 === 1 ? 'flex-row-reverse' : 'flex-row'}`}>

        <div
          className={`relative flex h-[260px] w-[260px] shrink-0 items-center justify-center overflow-hidden rounded-[30px] ${team.boxColour}`}
        >  
        {/* Ternary operator to display image when it loads and isn't missing. Else, display the initials */}
          {showImage ? (
            <Image
              src={team.image!}
              alt={`${team.name} profile`}
              width={260}
              height={260}
              className="h-[260px] w-[260px] object-cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            // Fallback to display the initials if the image does not load or is missing
            <span className={`text-7xl font-bold ${team.textColour}`}>
                {team.initials}
            </span>

          )}
        </div>

        <div className="flex-1">

            <div className="mb-5 flex items-center gap-3 text-sm font-semibold">

                {/* Index of each team member displayed */}
                <span className="text-zinc-300">
                    {String(index + 1).padStart(2, '0')}
                </span>
            
                {/* Separator between the index and the team member role */}
                <span className="text-zinc-300">
                    •
                </span>

                {/* Team role displayed */}
                <span className="tracking-wide text-blue-600">
                    {team.role}
                </span>

            </div>

                {/* Team member name displayed */}
                <h2 className="text-4xl font-bold text-zinc-900">
                    {team.name}
                </h2>

                {/* Team member description displayed */}
                <p data-testid="team-member-blurb" className="mt-6 text-lg text-zinc-600">
                    {team.description}
                </p>

        </div>
      </div>
    </div>
  )
}
