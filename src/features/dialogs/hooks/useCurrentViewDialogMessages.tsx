import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getDialogMessages } from '@/features/dialogs';
import { Message } from '@/types/dialogs';

export const useCurrentViewDialogMessages = () => {
  const dispatch = useAppDispatch();
  const currentViewDialogId = useAppSelector((state) => state.dialogs.currentViewDialogId);
  const dialogMessages = useAppSelector((state) => state.dialogs.dialogMessages);

  const [messages, setMessages] = useState<Message[] | null>(null);

  useEffect(() => {
    if (!currentViewDialogId) {
      setMessages(null);
      return;
    }
    const messages = dialogMessages[currentViewDialogId];
    if (!messages?.length) {
      dispatch(getDialogMessages(currentViewDialogId));
    }
    setMessages(messages || []);
  }, [currentViewDialogId, dialogMessages, dispatch]);

  return messages;
};
