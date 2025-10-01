import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./Pages/Home/Home";
import UserPageMaster from "./Pages/PageMasters/UserPageMaster";

const queryClient = new QueryClient();
const App = () => {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
          <Routes>
            <Route path="/" element={<UserPageMaster />}>
              <Route index element={<Home />} />
              <Route path="/edituser/:id" element={<Home />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </Provider>
    </>
  );
};

export default App;
