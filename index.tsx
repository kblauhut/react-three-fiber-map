import React from "react";
import { createRoot } from "react-dom/client";
import { MapView } from "./src/mapview";

const App = () => {
  return <MapView />;
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
