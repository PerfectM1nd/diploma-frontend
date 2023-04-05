import { useAppSelector } from '@/app/hooks';
import { User } from '@/types';
import { Dialog } from '@/types/dialogs';

export const useDialogOpponent = (dialog: Dialog) => {
  const authUser = useAppSelector((state) => state.auth.user);
  return dialog.users.find((user) => user.id !== authUser.id) as User;
};
