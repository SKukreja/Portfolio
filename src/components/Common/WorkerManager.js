let sharedWorker = null;

export const getSharedWorker = () => {
  if (!sharedWorker) {
    sharedWorker = new Worker('/animationWorker.js');
  }
  return sharedWorker;
};