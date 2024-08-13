import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Name from "./pages/Name";
import Title from "./pages/Title";
import Index from "./pages/Index";
import Layout from "./pages/Layout";
import Test from "./pages/Test";
import SearchResult from "./pages/SearchResult";
import { AuthProvider } from "./utils/AuthContext";
import Bookmarks from "./pages/Bookmarks";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import SearchHistory from "./pages/SearchHistory";
import { NotificationProvider } from "./utils/NotificationContext";
import Ratings from "./pages/Ratings";
import { invoke } from '@tauri-apps/api'

const App = () =>
  {
  // now we can call our Command!
  // Right-click the application background and open the developer tools.
  // You will see "Hello, World!" printed in the console!
  invoke('greet', { name: 'World' })
  // `invoke` returns a Promise
  .then((response) => console.log(response));
  
  return <AuthProvider>
    <NotificationProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/title/:id" element={<Title />} />
          <Route path="/name/:id" element={<Name />} />
          <Route path="/SearchResult/*" element={<SearchResult />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/test" element={<Test />} />
          <Route path="/account" element={<Account />} />
          <Route path="/searchhistory" element={<SearchHistory />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </NotificationProvider>
  </AuthProvider>
  };

export default App;
