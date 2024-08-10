import GlobalStyle from "./styles/global";
import Router from "./routes";
import { AuthProvider } from "./contexts/auth";

function App() {
  return (
    <>
      <AuthProvider>
        <Router/>
        <GlobalStyle/>
      </AuthProvider>
    </>
  );
}

export default App;
