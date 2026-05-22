export default async function CarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <h1>Welcome to the Car Page with params: {slug}!</h1>;
}
