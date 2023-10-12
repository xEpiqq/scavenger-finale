import react from "react";

export const metadata = {
    id: "search-local",
    title: "Local Buisness owners love your work!",
    description:
        "Everyone lives somewhere. And everyone needs a website. So why not start with the people around you?",
    imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    keywords: ["first client", "first paying user", "entrepreneurship", "web dev", "free lance", "freelance", "freelancing", "freelancer", "freelance web developer", "freelance web dev", "freelance web development", "freelance web designer", "freelance web design", "freelance web development", "freelance web developer portfolio", "freelance web developer website", "freelance web developer"],
    category: { title: "Best First Read", href: "#" },
}

const body = "Getting your first client is often difficult. You need to stand out and make yourself known without any references to help you out.\n\nWhen I started to cold call to get some freelance web design jobs, I had no experience in sales at all. Just a friend who had success cold calling to get his clients. He gave me a few pointers and words of encouragement, then I was off calling.\n\nIt was hard at first. I didn’t really know what to say in the calls. Everything the business owner said was new to me so I really had no idea how to respond like an experienced salesman. But, many of them listened to me, and talked to me about their struggles with their current website. Why? Because I was local. Many business owners hate meeting online and are distrustful of people who are not from their community. I was able to tell them that I would go to their business and meet face to face to help with their fears.\n\nNow, it comes to nurturing those all-important relationships with local business owners, it's not rocket science, but it does require a special touch. Start by keeping the lines of communication wide open. Reach out regularly, not just to chat about project updates, but to show a sincere interest in their business. Listen closely to what they have to say, from their aspirations to their concerns. Be responsive, and let them know their opinions truly matter.\n\nYou must be reliable! After all, you want your clients to suggest you to even more business owners. Always keep your promises, stick to deadlines, and if any hurdles pop up along the way, don't shy away from being upfront and honest. Going above and beyond can make a world of difference, so don't be afraid to share your wisdom, propose ideas that go beyond your contract, or offer a hand with any technical snags that may come their way.\n\nBuilding trust is the name of the game. So, always be forthright, respectful, and approachable. These local business owners are your ticket to being the site builder in the community. And if you impress them with your dedication and expertise, they might just become your biggest advocates in the community.\n\nBefore you know it, you have your first client. But even more importantly, you did a great job for a local businessman with lots of friends who see how his website helped take his business to the next level."


function BlogPost({ params }) {
  return (
    <div className="relative isolate bg-white px-6 py-24">
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
      </div>{" "}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-left">
          <h1
            className="text-3xl font-bold text-center tracking-tight mb-4 text-gray-900 sm:text-4xl"
          >{"Local Buisness owners love your work!"}</h1>
          <p
            className="mt-2 text-sm text-center  text-gray-400 mb-2"
          >
            {
              "By David Wing"
            }
          </p>
          <p className="whitespace-pre-wrap mt-2 text-sm leading-6 text-gray-600">
            {
              body
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
