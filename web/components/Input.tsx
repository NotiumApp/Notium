import React, { PropsWithoutRef } from "react";

type InputProps = PropsWithoutRef<JSX.IntrinsicElements["input"]> & {
  labelText?: string;
  required?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ labelText, required = true, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {labelText ? (
          <label htmlFor={props.name} className="text-sm">
            {labelText}
          </label>
        ) : null}
        <input
          id={props.name}
          className="outline-none focus:ring-2 focus:ring-accent w-full transition ease-in-out duration-150 py-2 px-4 caret-gray-500 ring-1 ring-neutral-400"
          required={required}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
