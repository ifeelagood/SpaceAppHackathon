import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App.tsx'


import { GameState } from './game/state'

const state : GameState = new GameState();

console.log(state);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
