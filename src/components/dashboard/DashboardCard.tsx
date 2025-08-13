
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function DashboardCard({ title, icon, children, className }: DashboardCardProps) {
  return (
    <div className={cn('bg-card text-card-foreground border border-border shadow-sm rounded-lg p-4', className)}>
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}
