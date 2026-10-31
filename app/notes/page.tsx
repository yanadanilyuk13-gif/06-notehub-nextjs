import { Suspense } from 'react';
import { connection } from 'next/server';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

async function NotesContent() {
  await connection();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes(1, ''),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

export default function NotesPage() {
  return (
    <Suspense fallback={<p>Loading, please wait...</p>}>
      <NotesContent />
    </Suspense>
  );
}
