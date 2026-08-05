import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      `
      fixed
      inset-0
      z-50
      bg-black/60
      backdrop-blur-sm

      data-[state=open]:animate-in
      data-[state=closed]:animate-out
      data-[state=closed]:fade-out-0
      data-[state=open]:fade-in-0
      `,
      className,
    )}
    {...props}
  />
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />

    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        `
        fixed
        left-1/2
        top-1/2
        z-50

        w-[calc(100%-2rem)]
        max-w-md

        -translate-x-1/2
        -translate-y-1/2

        max-h-[90vh]
        overflow-y-auto

        rounded-3xl

        border
        border-white/10

        bg-white/[0.06]

        p-6

        text-white

        shadow-[0_30px_120px_rgba(0,0,0,0.8)]

        backdrop-blur-3xl

        outline-none

        duration-200

        data-[state=open]:animate-in
        data-[state=closed]:animate-out

        data-[state=closed]:fade-out-0
        data-[state=open]:fade-in-0

        data-[state=closed]:zoom-out-95
        data-[state=open]:zoom-in-95
        `,
        className,
      )}
      {...props}
    >
      {children}

      <DialogPrimitive.Close
        className="
        absolute
        right-4
        top-4

        flex
        h-8
        w-8
        items-center
        justify-center

        rounded-xl

        text-zinc-500

        transition

        hover:bg-white/10
        hover:text-white
        "
      >
        <X size={17} />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
      flex
      flex-col
      gap-2
      `,
      className,
    )}
    {...props}
  />
);

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
      mt-6

      flex
      flex-col-reverse
      gap-3

      sm:flex-row
      sm:justify-end
      `,
      className,
    )}
    {...props}
  />
);

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      `
      text-xl
      font-semibold
      tracking-tight
      `,
      className,
    )}
    {...props}
  />
));

DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      `
      text-sm
      text-zinc-400
      `,
      className,
    )}
    {...props}
  />
));

DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
  DialogPortal,
};
