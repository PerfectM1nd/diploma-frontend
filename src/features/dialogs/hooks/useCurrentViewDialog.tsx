import { useEffect, useState } from 'react';

import { useAppSelector } from '@/app/hooks';
import { Dialog } from '@/types/dialogs';

export const useCurrentViewDialog = () => {
  const currentViewDialogId = useAppSelector((state) => state.dialogs.currentViewDialogId);
  const dialogs = useAppSelector((state) => state.dialogs.dialogs);

  const [dialog, setDialog] = useState<Dialog | null>(null);

  useEffect(() => {
    const dialog = dialogs?.find((dialog) => dialog.id === currentViewDialogId);
    setDialog(dialog || null);
  }, [currentViewDialogId, dialogs]);

  return dialog;
};
