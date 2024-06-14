import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, keepPreviousData } from "@tanstack/react-query";
import "./index.sass";
import { AuthProvider } from "./contexts/auth.context.tsx";
import { NotificationProvider } from "./contexts/notification.context.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
    },
    mutations: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ NotificationProvider>
    </QueryClientProvider>
  </BrowserRouter>
);