'use client';

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
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invalid URL</DialogTitle>
          <DialogDescription>
            Please enter a valid YouTube cooking video URL.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
