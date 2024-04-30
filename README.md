# react-concepts-prep
## Ctrl+K and then press V to preview the md file

-> Controlled Components
## In React, a controlled component is a component where the form data (like input fields, select boxes, etc.) is managed by React's state, rather than being maintained internally by the DOM. This concept contrasts with uncontrolled components, where the form elements maintain their own state within the DOM, independent of React's state management.
```javascript
import React, { useState } from 'react';

function ControlledInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value); // Update state when input changes
  };

  return (
    <div>
      <label htmlFor="input">Controlled Input:</label>
      <input
        type="text"
        id="input"
        value={inputValue} // Value comes from state
        onChange={handleChange} // Event handler updates state
      />
      <p>Current Value: {inputValue}</p>
    </div>
  );
}

export default ControlledInput;
```
-> Uncontrolled Components
## Uncontrolled components in React are components where the form data is managed internally by the DOM itself, rather than being controlled by React's state. This approach differs from controlled components, where React's state manages the form data. Uncontrolled components rely on native DOM behavior for managing their internal state.
-> Pure Components
## A "Pure Component" in ReactJS is a component that implements a shallow comparison of props and state to determine if it should re-render. If the props and state haven't changed, a Pure Component will not re-render, which can optimize performance by reducing unnecessary re-renders.
## Functional Components with React.memo: Functional components can achieve similar behavior to Pure Components by using React.memo, which also implements shallow comparison.
-> React.Memo
## In React, you can implement a "pure component" in a functional way using the React.memo higher-order component. React.memo is designed to wrap functional components and automatically implement shallow comparison for props, similar to the way PureComponent does for class-based components. This allows you to optimize re-renders, reducing unnecessary updates when the props haven't changed.
### Custom Comparison Function
## React.memo also allows you to define a custom comparison function if the shallow comparison does not meet your needs. This function takes the previous and current props and returns true if re-rendering should be skipped, or false if re-rendering should occur.
```javascript
import React from 'react';

// Functional component
const MyCustomComponent = ({ user }) => {
  console.log('Rendering MyCustomComponent');
  return <div>{user.name}</div>;
};

// Custom comparison function
const areEqual = (prevProps, nextProps) => {
  // Compare user IDs to determine if the component should re-render
  return prevProps.user.id === nextProps.user.id;
};

// Apply custom comparison function to React.memo
const PureCustomComponent = React.memo(MyCustomComponent, areEqual);

export default PureCustomComponent;
```
-> Render Prop pattern
## The "render prop" pattern in React is a design technique where a component's rendering logic is delegated to the child component via a function prop. This pattern provides a flexible and powerful way to share logic and state between components without explicitly using inheritance or higher-order components (HOCs).
```javascript
import React from 'react';

// Parent component that uses a render prop
function DataProvider({ render }) {
  const data = { message: 'Hello, World!' };

  return (
    <div>
      {/* Call the render prop function with the data */}
      {render(data)}
    </div>
  );
}

// Child component that utilizes the parent component with a render prop
function DisplayData() {
  return (
    <DataProvider
      render={(data) => (
        <p>{data.message}</p> // Define how the data is rendered
      )}
    />
  );
}

export default DisplayData;
```
-> HOC pattern
## A Higher-Order Component (HOC) in React is a design pattern used to enhance the capabilities of a component by wrapping it with another component. An HOC takes an existing component as an argument and returns a new component with additional functionality or behavior. This pattern is commonly used for code reuse, abstraction, and extending the capabilities of components without modifying them directly.
```javascript
import React from 'react';

// Higher-Order Component that adds extra functionality
function withExtraInfo(WrappedComponent) {
  return function EnhancedComponent(props) {
    const extraInfo = 'Additional Information';

    // Return a new component with added functionality
    return <WrappedComponent {...props} extraInfo={extraInfo} />;
  };
}

// Component to be wrapped by the HOC
function BasicComponent({ extraInfo }) {
  return <div>This is a basic component with {extraInfo}</div>;
}

// Use the HOC to create a new component
const EnhancedComponent = withExtraInfo(BasicComponent);

export default EnhancedComponent;
```
-> React Portal
## In React, "portals" refer to a feature that allows you to render a component's children into a DOM node that exists outside the component's direct parent or typical React hierarchy. This capability is especially useful when you need to break out of the normal React component structure for specific scenarios, like modals, pop-ups, tooltips, or other components that need to appear above other content or at a different location in the DOM.
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

// Modal component that renders its content in a portal
function Modal({ children }) {
  // Select the DOM node where the modal should be rendered
  const modalRoot = document.getElementById('modal-root');

  return ReactDOM.createPortal(
    <div className="modal">{children}</div>, // Content to be rendered in the portal
    modalRoot // The DOM node where the portal renders the content
  );
}

// Example usage of the Modal component with a portal
function App() {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      <h1>React Portals Example</h1>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && (
        <Modal>
          <div>
            <h2>This is a modal!</h2>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
```
-> useRef
## useRef is a hook in React that allows you to create a mutable reference to a value or a DOM element that persists across re-renders. It can be used for various purposes, such as accessing DOM nodes, storing mutable data that doesn't trigger re-renders, or interacting with third-party libraries that require DOM elements.
```javascript
import React, { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input element when the component is mounted
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <input type="text" ref={inputRef} />
    </div>
  );
}

export default FocusInput;
```
-> Ref Forwarding
## Ref forwarding in ReactJS is a technique that allows a component to forward its refs to a child component, ensuring that you can access the ref of a nested component in the parent or higher up the component tree. This is especially useful when you need to interact with a child component's DOM element or an instance method while keeping the component structure flexible.
```javascript
import React from 'react';

// A child component that accepts a ref
const TextInput = React.forwardRef((props, ref) => {
  return <input type="text" ref={ref} {...props} />;
});

// A parent component that uses the forwarded ref
function ParentComponent() {
  const inputRef = React.useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Access the DOM element via the ref
    }
  };

  return (
    <div>
      <TextInput ref={inputRef} placeholder="Type something..." />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

export default ParentComponent;
```
-> UseReducer
##
```javascript
import React, { useReducer } from 'react';

// Reducer function to manage state transitions
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function Counter() {
  const initialState = { count: 0 };
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}

export default Counter;
```
-> UseEffect cleanup function
## In ReactJS, the useEffect hook is used to perform side effects in function components. A key aspect of useEffect is its ability to return a "cleanup function," which is executed when the component is unmounted, or before the effect runs again in subsequent renders. The cleanup function is crucial for resource management, preventing memory leaks, and ensuring proper cleanup of effects that can impact application behavior.
```javascript
import React, { useEffect, useState } from 'react';

function TimerComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Set up an interval to increment the count every second
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures the effect runs once on mount

  return <div>Count: {count}</div>;
}

export default TimerComponent;
```
-> React Suspense
### React Suspense is a powerful feature introduced to simplify the handling of asynchronous operations in React applications, allowing components to "suspend" rendering while waiting for asynchronous data to be fetched or resolved. It is particularly useful for improving user experience during data fetching, code splitting, and server-side rendering.
```javascript
import React, { Suspense, lazy } from 'react';

// Lazy-load a component
const LazyComponent = lazy(() => import('./LazyComponent'));

// Use Suspense with a fallback while waiting for the component to load
function MyApp() {
  return (
    <div>
      <h1>My React App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent /> {/* This component is lazy-loaded */}
      </Suspense>
    </div>
  );
}

export default MyApp;
```
-> React Error Boundary and Reset bondary
## React Error Boundaries are components designed to catch JavaScript errors in their child component trees, log those errors, and display fallback UI instead of crashing the entire application. They provide a way to isolate component failures and ensure that an error in one part of the component tree doesn't bring down the whole application.
```javascript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI when an error is caught
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children; // Render the child components if there's no error
  }
}

export default ErrorBoundary;
```
## Resetting the Error
To reset an Error Boundary and allow users to "try again," you need to add a method or mechanism to reset the hasError state. This typically involves providing a "retry" button or similar UI element that resets the state to normal.

Here's an example with a "Try Again" button to reset the Error Boundary:
```javascript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false }); // Reset the error state
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={this.resetError}>Try Again</button> {/* Button to reset the error */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```
-> All inbuilt framework hooks
-> Current Reactjs version and new features
## React 18
## Automatic baching
## concurrent react(concurrent rendering)
concurrency is actually a feature, in which react can pause and resume rendering events to improve performance
Now react can interupt, pause or abondon a render inorder to do any urgent updates thar are needed. Before react 18 rendering was actually a single synchronus task and it could not be intrupted once it started. Concurrent rendering is not a feature but it's rather a technical foundation that most features in react 18 are build on top of it. But the good thing is that you as a developer don't need to think about it and it's behind the scenes and you can focus on what you want to do and the react takes care of how to do it. concurrent rendering is cool for react because it helps react prepare new screens specially in case where let's say you have tabbed away and you want to come back so react
## transition -> startTransition , useTransition
transition is actually, you can tell react to prioritize certain important updates and you can mark them the non-urgent updates using starttransition
## Suspense on the server


-> How react handles render cycle internally
-> React lazy loading
-> React performance optimization
-> SOLID Principal


UI Framework
-> Mantine UI
-> Prime React