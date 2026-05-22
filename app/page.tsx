import Image from "next/image";

export default async function Home() {
  const NEXT_HYGRAPH_ENDPOINT = process.env.NEXT_HYGRAPH_ENDPOINT;

  const res = await fetch(NEXT_HYGRAPH_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          cars {
            id
            name
            slug
          }
        }
      `,
    }),
  });

  const data = await res.json();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <ul>
          {data.data.cars.map(
            (car: { id: string; name: string; slug: string }) => (
              <li key={car.id}>{car.name}</li>
            ),
          )}
        </ul>
      </main>
    </div>
  );
}
