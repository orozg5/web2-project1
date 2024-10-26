import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { Landing } from "./pages/Landing";
import { NotFound } from "./pages/NotFound";
import { Ticket } from "./pages/Ticket";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/tickets/:id" element={<Ticket />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
