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
import "./AcademicYearsList.css";

interface AcademicYears {
  id: Number;
  title: String;
}

const AcademicYearsList: React.FC = () => {
  // definig the state for this component
  const [academicYears, setAcademicYears] = useState<Array<AcademicYears>>([]);

  const getData = (callback: (data: any) => void) => {
    const url = "https://w0254970-apim.azure-api.net/academicyears";

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        callback(json);
      });
  };

  useEffect(() => {
    console.log("Getting academic years data...");

    getData((data) => {
      setAcademicYears(
        data.map((item: any) => {
          return {
            id: item.Id,
            title: item.Title,
          };
        })
      );
    });
  }, []);

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    console.log("Begin async operation");

    getData((data) => {
      setAcademicYears(
        data.map((item: any) => {
          return {
            id: item.Id,
            title: item.Title,
          };
        })
      );
      event.detail.complete();
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Academic Years</IonTitle>
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
          {academicYears.map((ay: any, i) => {
            return (
              <IonItem routerLink={`/academicyears/${ay.id}`} key={i}>
                {ay.title}
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AcademicYearsList;
