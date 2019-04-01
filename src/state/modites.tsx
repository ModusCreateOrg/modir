import { Context, createContext } from 'react';

const ModitesContext: Context<any> = createContext([{}, Function]);
const ModitesContextProvider = ModitesContext.Provider;

export { ModitesContextProvider };
export default ModitesContext;
