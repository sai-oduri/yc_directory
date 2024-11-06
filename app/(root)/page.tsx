import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query: string }>
}) {

  const query = (await searchParams).query;

  const posts = [
    {
      // fake data
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Sai" },
      _id: 1,
      description: "This is a description",
      image: "data:image/jpeg;base64,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",
      category: "Robots",
      title: "We Robots"
    },
  ]

  return (
    <>
      <section className="pink_container ">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : 'All Startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Startups found</p>
          )
          }
        </ul>
      </section>
    </>
  );
}
