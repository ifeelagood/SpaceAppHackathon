import { EventGraph } from "./event.js"
import type { NodeId } from "./event.js"
import { Resources }  from "./resource.js"

class GameState {

  public eventGraph: EventGraph|undefined = undefined;
  public resources: Resources = new Resources();
  public currentNode: NodeId = "start";

}