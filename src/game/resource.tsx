import { monitorEventLoopDelay } from "perf_hooks";

const MONEY_DEFAULT = 100;
const REPUTATION_DEFAULT = 50;
const DEFENSE_DEFAULT = 10;
const RESEARCH_DEFAULT = 10;

class Resources {
  public money : number = MONEY_DEFAULT;
  public reputation : number = REPUTATION_DEFAULT;
  public defense : number = DEFENSE_DEFAULT
  public research : number = RESEARCH_DEFAULT;


  public reset() {
    this.money = MONEY_DEFAULT;
    this.reputation = REPUTATION_DEFAULT;
    this.defense = DEFENSE_DEFAULT;
    this.reputation = RESEARCH_DEFAULT;
  }
}

export { Resources };