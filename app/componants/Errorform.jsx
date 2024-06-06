import React from "react";

export default function Errorform({ errors }) {

  return (
    <div className="bg-red-500 opacity-50 my-2 py-1 rounded-lg text-white text-center">
      {errors}
    </div>
  );
}
