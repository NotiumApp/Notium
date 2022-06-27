import React from "react";
import { useForm } from "react-hook-form";

export const Form = ({
  children,
  onSubmit,
  className,
  submitText,
  otherOptions,
  ...props
}: {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  submitText: string;
  otherOptions?: React.ReactNode;
}) => (
  <div className="mx-2 rounded-sm border border-neutral-200 bg-white px-4 py-8 sm:px-10">
    <form
      className={`${className} flex flex-col space-y-4 max-w-2xl mx-auto`}
      onSubmit={onSubmit}
      {...props}
    >
      {children}
      <div className="pt-2 w-full">
        <button
          type="submit"
          className="cursor-pointer bg-accent hover:bg-accent-hover transition text-white p-2 w-full"
        >
          {submitText}
        </button>
      </div>
    </form>
    {otherOptions}
  </div>
);
