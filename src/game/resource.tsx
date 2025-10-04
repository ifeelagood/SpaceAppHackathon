const MONEY_DEFAULT = 100;
const REPUTATION_DEFAULT = 50;
const DEFENSE_DEFAULT = 10;
const RESEARCH_DEFAULT = 10;


const resources = {
  money: MONEY_DEFAULT,
  reputation: REPUTATION_DEFAULT,
  defense: DEFENSE_DEFAULT,
  research: RESEARCH_DEFAULT
};

function getResources() {
  return resources;
}

function resetResources() {
  resources.money = MONEY_DEFAULT;
  resources.reputation = REPUTATION_DEFAULT;
  resources.research = RESEARCH_DEFAULT;
  resources.defense = DEFENSE_DEFAULT;
}

export { getResources, resetResources };