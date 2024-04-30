import * as React from "react";
import "./styles.css";

interface ButtonProps {
  count: number;
  onClick: () => void;
}

interface ExtendedButtonProps {
  children: (props: any) => React.ReactElement;
}

const Button: React.FC<ButtonProps> = ({ count, onClick }) => (
  <button onClick={onClick}>Count:{count}</button>
);

const ExtendedButton: React.FC<ExtendedButtonProps> = ({ children }) => {
  let [count, setCount] = React.useState(0);
  const onClick = () => {
    setCount(++count);
  };
  return children({ count, onClick });
};
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <ExtendedButton>{props => <Button {...props} />}</ExtendedButton>
    </div>
  );
}