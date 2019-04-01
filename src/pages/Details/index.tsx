import { IonPage } from '@ionic/react';
import React, { lazy, useContext } from 'react';
import Modite from '../../models/Modite';
import ModiteContext from '../../state/modite';

const ModiteDetails = lazy(() =>
  import('../../components/ModiteDetails' /* webpackChunkName: "modite-details", webpackPrefetch: true  */),
);

function Details() {
  const [activeModite]: [Modite] = useContext(ModiteContext);

  return (
    <IonPage>
      <ModiteDetails modite={activeModite} />
    </IonPage>
  );
}

export default Details;
