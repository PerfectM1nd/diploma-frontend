import { useEffect, useState } from 'react';

import { useAppSelector } from '@/app/hooks';
import { Message } from '@/types/dialogs';

export const useCurrentViewDialogMessages = () => {
  const currentViewDialogId = useAppSelector((state) => state.dialogs.currentViewDialogId);
  const dialogMessages = useAppSelector((state) => state.dialogs.dialogMessages);

  const [messages, setMessages] = useState<Message[] | null>(null);

  useEffect(() => {
    if (!currentViewDialogId) {
      setMessages(null);
      return;
    }
    const messages = dialogMessages[currentViewDialogId];
    setMessages(messages);
  }, [currentViewDialogId, dialogMessages]);

  return messages;
};
