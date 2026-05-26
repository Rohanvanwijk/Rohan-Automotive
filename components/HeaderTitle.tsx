export default function HeaderTitle(props: { title: string }) {
  return (
    <header className="w-full max-w-7xl flex items-center justify-center border-b border-zinc-200 dark:border-zinc-700 px-4 py-6">
      <h1 className="text-4xl font-bold text-center py-10">{props.title}</h1>
    </header>
  );
}
