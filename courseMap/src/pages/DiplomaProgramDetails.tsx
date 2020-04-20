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
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonListHeader,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import "./DiplomaProgramDetails.css";
import { RouteComponentProps } from "react-router";

interface DiplomaProgramDetailsPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const DiplomaProgramDetails: React.FC<DiplomaProgramDetailsPageProps> = ({
  match,
}) => {
  // definig the state for this component
  const [advisors, setAdvisors] = useState<Array<any>>([]);
  const [diplomaProgram, setDiplomaProgram] = useState<String>("");

  const getData = (callback: (data: any) => void) => {
    console.log(`Getting diploma program details for id ${match.params.id}`);
    const url = `https://w0254970-apim.azure-api.net/diplomaprograms/${match.params.id}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        callback(json);
      });
  };

  useEffect(() => {
    console.log("Getting academic advisor data...");

    getData((data) => {
      setAdvisors(data.Advisors);
      setDiplomaProgram(data.Title);
    });
  }, []);

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    console.log("Begin async operation");

    getData((data) => {
      setAdvisors(data.Advisors);
      event.detail.complete();
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{diplomaProgram} Advisors</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/diplomaPrograms" />
          </IonButtons>
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
          {advisors.map((advisor: any, i) => {
            return (
              <IonItem
                routerLink={`/diplomaprograms/advisingassignments/${advisor.InstructorId}`}
                key={i}
              >
                <IonCard>
                  <IonCardHeader>
                    <IonCardSubtitle>{advisor.AcademicYear}</IonCardSubtitle>
                    <IonCardTitle>
                      {advisor.Instructor} - {advisor.DiplomaProgramYear}{" "}
                      {advisor.DiplomaProgramYearSection}
                    </IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DiplomaProgramDetails;
