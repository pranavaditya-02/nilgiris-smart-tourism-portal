'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  description?: string;
  roles?: string[];
}

interface SidebarNavProps {
  items: NavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredItems = items.filter(
    (item) => !item.roles || !user || item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-40 lg:hidden p-2 rounded-md bg-primary text-primary-foreground"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-30 transform transition-transform duration-300 ease-in-out",
        "lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center font-bold text-sm sm:text-base">
            N
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-foreground text-xs sm:text-sm truncate">Nilgiris</h1>
            <p className="text-xs text-muted-foreground truncate">Smart Tourism</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-3 sm:p-4 border-b border-sidebar-border">
          <p className="text-xs text-muted-foreground">Logged in as</p>
          <p className="font-medium text-xs sm:text-sm text-foreground truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground capitalize">
            {user.role === 'district-admin' ? 'District Admin' : 'Tourism Department'}
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto scrollbar-hide">
        {filteredItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors',
              pathname === item.href
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-muted'
            )}
          >
            <span className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5">{item.icon}</span>
            <span className="truncate">{item.title}</span>
          </Link>
        ))}
        </nav>

      {/* Footer */}
      <div className="p-3 sm:p-4 border-t border-sidebar-border space-y-2">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start text-foreground hover:bg-muted bg-transparent text-xs sm:text-sm"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="truncate">Logout</span>
        </Button>
      </div>
    </aside>
    </>
  );
}
