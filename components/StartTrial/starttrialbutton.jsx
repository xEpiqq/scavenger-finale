'use client'
import * as fbq from '../../lib/fpixel'

function StartTrialButton() {

    const handleFbClick = () => {
        fbq.event('Purchase', { currency: 'USD', value: 10 })
      }

    return (
        
    <>
        <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
                href="/signup"
                alt="Sign up for Scavenger"
                className="flex gap-4 rounded-md bg-gray-1 px-7 py-4 text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleFbClick}
                >
                Start Your Free Trial Today{" "}
                <img src="/clicktrial.svg" className="w-5" role="presentation" />
            </a>
        </div>

    </>
  );
}

export default StartTrialButton;
