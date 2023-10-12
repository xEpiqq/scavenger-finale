'use client'

import React from 'react'
import SurveyRadialCard from './SurveyRadialCard.jsx'
import SurveyRadialCardSm from './SurveyRadialCardSm.jsx'

import { useState } from 'react'

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from '../../../components/initializeFirebase.jsx'

const auth = getAuth(app);

function Page() {
    const [user, loading, error] = useAuthState(auth)

    const preferredMethodOptions = [
        { id: 1, title: 'Phone', description: 'Direct outreach through phone calls', users: '' },
        { id: 2, title: 'Social Media', description: 'Outreach through socials', users: '' },
        { id: 3, title: 'Email', description: 'Outreach through emailing', users: '' },
    ]

    const clientsPerWeekOptions = [
        { id: 2, name: '1' },
        { id: 3, name: '2' },
        { id: 3, name: '3' },
        { id: 3, name: '4+' },
    ]

    const [preferredMethod, setPreferredMethod] = useState(preferredMethodOptions[0])
    const [clientsPerWeek, setClientsPerWeek] = useState(clientsPerWeekOptions[0])

    const onSubmit = () => {
        fetch('/api/signup-survey-submitted', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                preferedMethod: preferredMethod.title,
                clientsPerWeek: clientsPerWeek.name,
                user_id: user.uid,
            }),
        })
        stripeCheckoutTrial()
    }


    async function stripeCheckoutTrial() {
        const response = await fetch("/api/stripecheckout_trial", {
            method: "POST",
            body: JSON.stringify({
                user_id: user.uid,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(!response.ok) {
            return;
        }
        const json = await response.json();
        const url = json.url;
        window.location.href = url;
    }

    return (
        <div className="relative isolate overflow-hidden min-h-screen p-20 bg-white flex justify-center w-full">
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>
            <div className='max-w-7xl pt-4 flex gap-8 flex-col '>
                <hr className='w-full' />
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Lets get started! 🚀
                </h1>
                <SurveyRadialCard
                    title="What is your preferred method of outreach?"
                    value={preferredMethod}
                    onChange={setPreferredMethod}
                    options={
                        preferredMethodOptions
                    }
                />
                <SurveyRadialCardSm
                    title="How many clients do you want to sell per week?"
                    value={clientsPerWeek}
                    onChange={setClientsPerWeek}
                    options={
                        clientsPerWeekOptions
                    }
                />
                <button
                    type="button"
                    onClick={onSubmit}
                    className="rounded bg-indigo-600 px-2 py-4 text-sm font-semibold max-w-xs text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {"Continue ->"}
                </button>
            </div>
        </div>
    )
}

export default Page