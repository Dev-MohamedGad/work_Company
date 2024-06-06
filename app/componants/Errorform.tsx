import React from "react";

type Props = {
  errors: String;
};
export default function Errorform({ errors }: Props) {
  console.log(errors);

  return (
    <div className="bg-red-500 opacity-50 my-2 py-1 rounded-lg text-white text-center">
      {errors}
    </div>
  );
}
