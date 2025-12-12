"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import { loadToken } from "./store/authSlice";
import { useEffect, useState } from "react";

function ClientInit({ children }) {
  const dispatch = useDispatch();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    dispatch(loadToken());
    setHydrated(true);
  }, [dispatch]);

  if (!hydrated) return null;
  return children;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <ClientInit>{children}</ClientInit>
    </Provider>
  );
}
