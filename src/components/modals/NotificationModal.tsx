'use client';

import styles from './NotificationModal.module.css';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export default function NotificationModal({
  open,
  onOpenChange,
  title,
  description,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void; // functions can be types in TS -> type of a function
  title: string;
  description: string;
}) {
  return (
    // onOpenChange: when user close the modal, it becomes 'false'
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>
          <DialogDescription className={styles.dialogDescription}>
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
