// Plain shared state between the DOM and the WebGL scene.
// Kept outside React so pointer and scroll updates never re-render the page.

export const STAGE_COUNT = 5;

export const sceneState = {
  stage: 0,
  pointerX: 0,
  pointerY: 0,
};

const listeners = new Set<() => void>();

export function setStage(stage: number) {
  if (sceneState.stage === stage) return;
  sceneState.stage = stage;
  listeners.forEach((tell) => tell());
}

export function onStageChange(tell: () => void) {
  listeners.add(tell);
  return () => {
    listeners.delete(tell);
  };
}
