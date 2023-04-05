import { useEffect, useState } from 'react';

import { useAppSelector } from '@/app/hooks';
import { User } from '@/types';

import { useCurrentViewDialog } from './useCurrentViewDialog';

export const useCurrentViewDialogOpponent = () => {
  const authUser = useAppSelector((state) => state.auth.user);
  const dialog = useCurrentViewDialog();

  const [opponent, setOpponent] = useState<User | null>(null);

  useEffect(() => {
    if (dialog) {
      const opponent = dialog.users.find((user) => user.id !== authUser.id);
      setOpponent(opponent || null);
      return;
    }
    setOpponent(null);
  }, [authUser, dialog]);

  return opponent;
};
