import react from "react";

const posts = [
  {
    id: 1,
    title: "Your first client. What they don't tell you.",
    href: "/blog/first-client",
    description:
      "Jayden's journey to acquire his first paying user, emphasizing the trials and triumphs of entrepreneurship, with a reminder that success often hinges on that pivotal first customer.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Best First Read", href: "#" },
    author: {
      name: "Jayden Crowther",
      role: "Co-Founder / CEO",
      href: "#",
      imageUrl:
        "/images/testimonials/jayden-crowther.png",
    },
  },{
    id: 2,
    title: "From That First Phone Call to a Thriving Partnership",
    href: "/blog/search-local",
    description:
      "This blog post shares a personal journey of breaking into freelance web design, from the challenges of cold calling to the importance of nurturing relationships with local business owners. It offers practical insights for newcomers, emphasizing the value of local connections, trust-building, and delivering exceptional service to succeed in the field.",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Best First Read", href: "#" },
    author: {
      name: "David Wing",
      role: "Co-Founder / Lead Programmer",
      href: "#",
      imageUrl:
        "/images/testimonials/author-01.png",
    },
  },
  // More posts...
];

export const metadata = {
    id: "blog",
    title: "Blog",
    description:
        "Learn how to grow your business with our expert advice.",
    imageUrl:
        "/images/landing-pages/blog/hero.jpg",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    keywords: ["blog", "entrepreneurship", "web dev", "free lance", "freelance", "freelancing", "freelancer", "freelance web developer", "freelance web dev", "freelance web development", "freelance web designer", "freelance web design", "freelance web development", "freelance web developer portfolio", "freelance web developer website", "freelance web developer"],
    category: { title: "Blog", href: "#" },
}

export default function BlogPage() {
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col items-start justify-between"
            >
              <div className="relative w-full">
                <img
                  src={post.imageUrl}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="bg-gray-50 relative z-10 rounded-full px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src={post.author.imageUrl}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-100"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
