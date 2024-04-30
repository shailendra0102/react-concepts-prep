import React, { useState } from "react";
import "./styles.css";

let HOC = BaseComponents => {
  let [count, setCount] = useState(5);
  const incrementCounter = () => setCount(++count);
  return () => <BaseComponents count={count} increment={incrementCounter} />;
};

let Button = props => (
  <button onClick={props.increment}>Count:{props.count}</button>
);

export default function App() {
  const ExtendedButton = HOC(Button);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {/* <Button count="0"></Button> */}
      <ExtendedButton />
    </div>
  );
}