import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Calendrier from "./pages/calendrier/Calendrier";
import Contact from "./pages/contacts/Contact";
import Layout from "./layout/Layout";
import Login from "./pages/login/Login";
import CreateUser from "./pages/createUser/ManageUser";
import ProtectedRoute from "./auth/ProtectedRoute";
import axios from "axios";
import NotLoggedRoute from "./auth/NotLoggedRoute";
import InvoiceCreation from "./pages/invoice/invoiceCreation/InvoiceCreation";
import UserList from "./pages/user/UserList";
import InvoiceDisplay from "./pages/invoice/invoiceDisplay/InvoiceDisplay";
import UserVerify from "./pages/user/verify/UserVerify";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Order from "./pages/order/Order";
import Guide from "./pages/guide/Guide";
import Stats from "./pages/stats/Stats";

function App() {
  const [userLoaded, setUserLoaded] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] = user.token;
    }
    setUserLoaded(true);
  }, []);

  if (!userLoaded) {
    return <div>Loading...</div>; // TODO CHANGE BACKGROUND
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    });
  }

  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout pathName={"Dashboard"}>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendrier"
            element={
              <Layout pathName={"Calendrier"}>
                <Calendrier />
              </Layout>
            }
          />
          <Route
            path="/contacts"
            element={
              <Layout pathName={"Contacts"}>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/admin/user/create"
            element={
              <Layout pathName={"Administration"}>
                <CreateUser />
              </Layout>
            }
          />
          <Route
            path="/admin/user"
            element={
              <Layout pathName={"Administration"}>
                <UserList />
              </Layout>
            }
          />
          <Route
            path="/admin/stats"
            element={
              <Layout pathName={"Statistiques"}>
                <Stats />
              </Layout>
            }
          />
          <Route
            path="/invoice/create"
            element={
              <Layout pathName={"Factures"}>
                <InvoiceCreation />
              </Layout>
            }
          />
          <Route
            path="/invoice"
            element={
              <Layout pathName={"Factures"}>
                <InvoiceDisplay />
              </Layout>
            }
          />
          <Route
            path="/order"
            element={
              <Layout pathName={"Bons de Commande"}>
                <Order />
              </Layout>
            }
          />
          <Route
            path="/connexion"
            element={
              <NotLoggedRoute>
                <Login />
              </NotLoggedRoute>
            }
          />

          <Route
            path="/guide"
            element={
              <Layout pathName={"Guide"}>
                <Guide />
              </Layout>
            }
          />
          <Route
            path="/user/verify/:email/:code"
            element={
              <NotLoggedRoute>
                <UserVerify />
              </NotLoggedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Layout pathName={"Dashboard"}>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
