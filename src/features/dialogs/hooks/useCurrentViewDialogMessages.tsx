import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
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
      // TODO get dialog messages
    }
    setMessages(messages || []);
  }, [currentViewDialogId, dialogMessages, dispatch]);

  return messages;
};
