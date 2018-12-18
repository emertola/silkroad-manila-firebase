import React from "react";

import { FirebaseContext } from "./firebase";

const TestFB = () => {
  return (
    <FirebaseContext.Consumer>
      {firebase => {
        return <div>Hey, I'm using firebase</div>;
      }}
    </FirebaseContext.Consumer>
  );
};

export default TestFB;
