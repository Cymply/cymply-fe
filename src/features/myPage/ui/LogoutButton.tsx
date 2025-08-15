// 2. features/myPage/ui/LogoutButton.tsx
'use client';

import { useLogout } from '../hooks/useLogout';

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const LogoutButton = ({ className, children }: LogoutButtonProps) => {
  const { handleLogout } = useLogout();
  
  const onLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (confirm('정말 로그아웃 하시겠습니까?')) {
      await handleLogout();
    }
  };
  
  return (
    <form onSubmit={onLogout}>
      <button
        type="submit"
        className={className}
      >
        {children || '로그아웃'}
      </button>
    </form>
  );
};