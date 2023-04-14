import { useAppSelector } from '@/app/hooks';

export const useDialogMessages = (dialogId: number) => {
  const dialogMessages = useAppSelector((state) => state.dialogs.dialogMessages);
  return dialogMessages[dialogId] || [];
};
