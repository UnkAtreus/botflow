'use client';

import { NavigationMenu } from '@/components/nav-bar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex min-h-screen flex-col w-full'>
      <div className='bg-white/75 backdrop-blur px-6 flex justify-between h-16 border-b'>
        <div className='flex items-center'>
          <div className='font-bold text-3xl'>Botflow</div>
        </div>
        <div className='flex items-center space-x-4'>
          <NavigationMenu />
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>KD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {children}
    </main>
  );
}
