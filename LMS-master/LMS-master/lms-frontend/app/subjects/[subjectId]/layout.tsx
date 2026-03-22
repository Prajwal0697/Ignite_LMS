'use client';
import { useParams } from 'next/navigation';
import SubjectSidebar from '../../../components/Sidebar/SubjectSidebar';
import AppShell from '../../../components/Layout/AppShell';
import AuthGuard from '../../../components/Auth/AuthGuard';

export default function SubjectLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const subjectId = parseInt(params.subjectId as string);

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f' }}>
        <AppShell />

        <div className="flex flex-1 pt-14">
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 fixed left-0 top-14 bottom-0 border-r border-slate-border overflow-hidden"
            style={{ background: '#0d0d14' }}>
            <SubjectSidebar subjectId={subjectId} />
          </aside>

          {/* Main content */}
          <main className="flex-1 lg:ml-72 xl:ml-80 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
