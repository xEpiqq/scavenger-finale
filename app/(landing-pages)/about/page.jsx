import DummyList from "@/components/DummyList";

function Page() {
  return (
    <div className="bg-white">
      {/* Header */}
      <main className="isolate pb-[50vh]">
        {/* Hero section */}
        <div className="relative pt-14">
          <div
            className="fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
          <div className="relative mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start gap-5 sm:flex-row">
              <div className="text-center">
                <h1 className="pt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">
                    What if there was a way...
                  </span>{" "}
                  <span className="block text-indigo-600 xl:inline">
                    to sell clients without relying on Fiverr?
                  </span>
                </h1>
                <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                  Your <span className="font-bold">first client</span> is the
                  hardest to get. We know, it was for us. That's why we created
                  Scavenger, to help you get your first client and start your
                  freelancing career.
                </p>
              </div>
              <div className="flex w-full flex-row items-center justify-evenly sm:w-fit sm:flex-col sm:justify-center sm:gap-0">
                <img
                  src="/email_sending.svg"
                  alt="Through cold emails"
                  className="max-w-[8rem]"
                />
                <img
                  src="/phone_sending.svg"
                  alt="Through cold calls"
                  className="max-w-[6rem]"
                />
              </div>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center sm:mt-[15rem] sm:flex-row sm:justify-start">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Automate your cold outreach
                </h2>
                <p className="pt-6">
                  Let us do the hard work for you. We'll find the emails of your
                  potential clients and send them a cold email for you.
                </p>
                <div className="bg-white w-full max-w-7xl mt-10 sm:rounded-lg sm:shadow-xl">
                  <DummyList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;
