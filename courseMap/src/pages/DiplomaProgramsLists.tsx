import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonItem,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import "./DiplomaProgramsList.css";

const DiplomaProgramsList: React.FC = () => {
  // definig the state for this component
  const [diplomaPrograms, setDiplomaPrograms] = useState<Array<any>>([]);

  const getData = (callback: (data: any) => void) => {
    const url = "https://w0254970-apim.azure-api.net/diplomaprograms";

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        callback(json);
      });
  };

  useEffect(() => {
    console.log("Getting diploma programs data...");

    getData((data) => {
      setDiplomaPrograms(data);
    });
  }, []);

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    console.log("Begin async operation");

    getData((data) => {
      setDiplomaPrograms(data);
      event.detail.complete();
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Diploma Programs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon="arrow-dropdown"
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>
        <IonList>
          {diplomaPrograms.map((dp: any, i) => {
            return (
              <IonItem href={`/diplomaprograms/${dp.Id}`} key={i}>
                {dp.Title}
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DiplomaProgramsList;
