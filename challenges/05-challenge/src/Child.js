import React from "react";

export const Child = React.memo(({ numero, increment }) => {
  console.log("Son renderizado:", numero);

  return (
    <button
      onClick={() => increment(numero)}
    >
      {numero}
    </button>
  );
});

