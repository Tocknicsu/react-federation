/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, FunctionComponent } from 'react';

const loadComponent = (scope: string, module: string) => {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    const container = (window as any)[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await (window as any)[scope].get(module);
    const Module = factory();
    return Module;
  };
};

interface useDynamicScriptProps {
  url: string;
}

const useDynamicScript = (
  args: useDynamicScriptProps,
): {
  ready: boolean;
  failed: boolean;
} => {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement('script');

    element.src = args.url;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = async () => {
      console.log(`Dynamic Script Loaded: ${args.url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

interface DynamicLoadProps<T> {
  system: {
    url: string;
    scope: string;
    module: string;
  };
  props?: T;
}

const DynamicLoad = <T,>(props: DynamicLoadProps<T>): ReturnType<FunctionComponent<DynamicLoadProps<T>>> => {
  const { ready, failed } = useDynamicScript({
    url: props.system && props.system.url,
  });

  if (!props.system) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.system.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.system.url}</h2>;
  }

  const Component = React.lazy(loadComponent(props.system.scope, props.system.module));

  return (
    <React.Suspense fallback="Loading System">
      <Component {...props.props} />
    </React.Suspense>
  );
};
export default DynamicLoad;
