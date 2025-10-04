import { EventGraph } from "./event.js"
import type { NodeId } from "./event.js"
import { Resources }  from "./resource.js"


const eventCsvContent = await fetch("/events.csv").then(res => res.text());
const optionsCsvContent = await fetch("/options.csv").then(res => res.text())
  
class GameState {

  public eventGraph: EventGraph|undefined = undefined;
  public resources: Resources = new Resources();
  public currentNode: NodeId = "start";


  constructor() {
    this.eventGraph = new EventGraph(eventCsvContent, optionsCsvContent);
  }
}