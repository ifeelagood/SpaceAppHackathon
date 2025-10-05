import { Button } from "./components/ui/button";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { StatusBar } from "./components/StatusBar";
import { useState, useEffect } from "react";


import { Resources }  from "./game/resource.js"

import { WebEventGraph } from "./components/EventGraph.js";

import { GameUI } from "./components/GameUI.js";


export default function App() {


  const resources: Resources = new Resources();

  const [money, setMoney] = useState(100);
  const [pValue, setPValue] = useState(65);
  const [dValue, setDValue] = useState(42);
  const [rValue, setRValue] = useState(78);

  // Static date in MM/YYYY format
  const currentDate = "10/2025";

  const handleAccept = () => {
    console.log("Accepted");
  };

  const handleReject = () => {
    console.log("Rejected");
  };

  return (
    <GameUI></GameUI>
  );
}