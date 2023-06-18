import localStorage from 'reduxjs-toolkit-persist/es/storage';
export const saveState = (state: any) => {
  try {
    const serializableState = JSON.stringify(state);
    localStorage.setItem('globalState', serializableState);
  } catch (err) {
    console.log('Redux was not able to persist the state into the localstorage');
  }
};

export const loadState = () => {
  try {
    const serializableState: string | any = localStorage.getItem('globalState');
    return serializableState !== null || serializableState === undefined
      ? JSON.parse(serializableState)
      : undefined;
  } catch (error) {
    return undefined;
  }
};
