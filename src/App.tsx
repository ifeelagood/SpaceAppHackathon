import { Button } from "./components/ui/button";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { StatusBar } from "./components/StatusBar";
import { useState, useEffect } from "react";


import  { EventGraph } from "./EventGraph.js"
import type { EventGraphProps, NodeId, NodeRow, EdgeRow  } from "./EventGraph.js";
import { Resources }  from "./game/resource.js"



export default function App() {
  console.log("start");
 

  const [eventCsvContent, setEventCsvContent] = useState<string>("");
  const [optionCsvContent, setOptionCsvContent] = useState<string>("");

  
  useEffect(() => {
    fetch("/events.csv")
    .then(res => res.text())
    .then(text => setEventCsvContent(text))

    fetch("/options.csv")
    .then(res => res.text())
    .then(text => setOptionCsvContent(text))
  }, []);
  


  console.log(eventCsvContent);

  const isConditionMet = (edge : EdgeRow) => { return true };

  const onNavigate =  (from: NodeId, to: NodeId, via: EdgeRow) => {};


  const eventGraphProps : EventGraphProps = {
    nodeCsvText: eventCsvContent,
    edgeCsvText: optionCsvContent,
    isConditionMet: isConditionMet,
    hideBlockedOptions: false,
    initialNodeId: "StartScreen",
    onNavigate: onNavigate,
    className: "eventgraph"
    
  };
  
  const eventGraph = EventGraph(eventGraphProps);
  console.log(eventGraph);

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
    <div className="size-full flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-start justify-between px-8 py-4 bg-card border-b border-border">
        {/* Left Section - Money and P Status (Vertically Stacked) */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-foreground">Money:</span>
            <span className="text-foreground">
              ${money.toLocaleString()}
            </span>
          </div>
          <StatusBar label="😊" value={pValue} />
        </div>

        {/* Center Section - Date */}
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="text-foreground">{currentDate}</div>
        </div>

        {/* Right Section - D and R Status (Vertically Stacked) */}
        <div className="flex flex-col gap-2 flex-1 items-end">
          <StatusBar label="🛡" value={dValue} />
          <StatusBar label="🧪" value={rValue} />
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Background Map Image */}
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1677295922463-147d7f2f718c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwbWFwJTIwZ2FtZXxlbnwxfHx8fDE3NTk1NTQ5NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Map"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        {/* Text Prompt */}
        <div className="relative z-10 max-w-2xl mx-auto px-8 py-6 bg-card/80 backdrop-blur-sm rounded-lg border border-border shadow-lg">
          <p className="text-foreground text-center">
            A mysterious traveler approaches you with an offer.
            They claim to know the location of an ancient
            artifact that could change the fate of your kingdom.
            However, accepting their help would require
            divulging sensitive information about your current
            resources. What do you choose?
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-center gap-8 px-8 py-6 bg-card border-t border-border">
        <Button
          onClick={handleAccept}
          size="lg"
          className="px-8 py-6"
        >
          Accept the traveler's offer and share information
        </Button>
        <Button
          onClick={handleReject}
          variant="outline"
          size="lg"
          className="px-8 py-6"
        >
          Decline the offer and keep your secrets safe
        </Button>
      </footer>
    </div>
  );
}