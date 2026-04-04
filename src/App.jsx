import Router from "./router";
import { AuthProvider } from "./usercontext/context";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}
