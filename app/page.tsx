import { SearchComponent } from '@/components/SearchComponent/SearchComponent';

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Search</h1>
      <SearchComponent className="max-w-6xl mx-auto" />
    </main>
  );
}