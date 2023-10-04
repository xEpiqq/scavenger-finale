import react from "react";

export const metadata = {
    id: "first-client",
    title: "Your first client. What they don't tell you.",
    description:
        "Jayden's journey to acquire his first paying user, emphasizing the trials and triumphs of entrepreneurship, with a reminder that success often hinges on that pivotal first customer.",
    imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    keywords: ["first client", "first paying user", "entrepreneurship", "web dev", "free lance", "freelance", "freelancing", "freelancer", "freelance web developer", "freelance web dev", "freelance web development", "freelance web designer", "freelance web design", "freelance web development", "freelance web developer portfolio", "freelance web developer website", "freelance web developer"],
    category: { title: "Best First Read", href: "#" },
}

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
          >{"Your first client. What they don't tell you"}</h1>
          <p
            className="mt-2 text-sm text-center  text-gray-400 mb-2"
          >
            {
              "By Jayden Crowther"
            }
          </p>
          <p className="whitespace-pre-wrap mt-2 text-sm leading-6 text-gray-600">
            {
              "When caught in eternal build hell that first paying user occupies every day-dream and constitutes your worst nightmare. Thoughts plague your mind about whether or not you're wasting your life, endlessly slaving away, for some mystical first user that may or may not come. In daydream, you dream of infinite scale, status, and freedom. Blue horizons. 'All I need is that first user,' But in the night comes terror. 'What if it all fails?'\n\nI speak from experience. But I know i'm not alone. That's been my life at least, for well over a year. A college drop-out living in a college town surrounded by college people--always wondering if my unstable life path is really worth it. I moved on a huge bet with no money to my name, and bagged an apartment with my life savings of $800, following my 2 year mission trip where I didn't make a dime (just service).\n\nI started learning web development at the beginning of 22' while desperately trying to escape the financial grim reaper. Rent was due, and I was in short supply. How can I possibly monetize this? A couple weeks in I decided to go big or go home so I pulled up google maps and started calling all of the local businesses I could get my hands on. I sounded braindead at first, 'uhh hey im calling wih uhh my name is jayden.. are you interested in a new website?' Haha, the pitch improved I promise.\n\nWell flash-forward I closed my first deal for $1900 after pestering the dude 5 or 6 times. But hey!! It worked. That feeling alone was worth every bit of suffering. My girlfriend at the time was pressuring me to get a 'normal job' but I knew deep down that wasn't for me. Belief is a powerful thing. Beliefs are shattered when you accomplish something new, and are strengthened when you persist in the midst of all doubt.\n\nI needed a way to get business leads faster and streamline the sales process. Google maps surfing would not cut it. With newfound determination I locked myself in my room for a couple weeks and emerged with some clunky python web scraper that stored all the leads in google sheets. And boy, did it pay off. $2200, $2600 boom, boom. I had to let the HOTTEST leads go because I was too slow to keep up as an imposter web dev.\n\nThen my world changed. The idea beamed straight into my psyche from the heavens above. The world needs this tool. I'd call it Scavenger. So I got to work. Backend, whats backend? Database? SSR?? Continuous integration? Docker? Cloud providers? Whats a tech stack? Flask? Django? Express? MongoDB?\n\nBut from the earliest stages I dreamed of USER #1 -- That's all I needed. And that dream kept me going. I was hungry. A ravenous dawg. And I know I'm not the only one. For 3 months I went at it alone. After my lonesome grind I knew I needed help so I petitioned a really good friend to join me. We used to talk of keeping the dream alive, and knew this was our big chance.\n\nWe fell into the trap of building but never launching (perfectionism). Then got a little distracted on 3 months of ai side projects. The deadliest of indie sins.\n\nBut the drive never died. And our skills had evolved. Indie hackers saved us with its glorious advice. Market first. So before returning fully to the OG project, we threw up a quick landing page, wrote a linkedin bot and got 30 pre-launch signups. That'll do.\n\nWe took a shotgun to the head of that old unmaintanable zombie project and started fresh. We learned that shipping fast is everything so Nextjs + Firebase it was. And after 3 weeks we launched like a phoenix from the ashes. Today was day 4. We tried the bot again on roughly 200 people... and got that first credit card.\n\nI had tears in my eyes. I called my co-founder and we stared at eachother, smiling, not saying a word. But much was communicated. Here is the moral of the story. It is all worth it. Don't stop. You have no idea how close you are to hitting gold. The hero's journey includes failure, grief, uncertainty, and imposter syndrome. It also includes triumph.\n\nHere is what they don't tell you. It's better than you can imagine.\n\n1 user is all it takes."
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
