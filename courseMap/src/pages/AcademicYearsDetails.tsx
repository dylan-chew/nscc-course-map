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
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import "./AcademicYearsDetails.css";
import { RouteComponentProps } from "react-router";

interface AcademicYearsDetailsPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const AcademicYearsDetails: React.FC<AcademicYearsDetailsPageProps> = ({
  match,
}) => {
  // definig the state for this component
  const [semesters, setSemesters] = useState<Array<any>>([]);
  const [academicYear, setAcademicYear] = useState<String>("");

  const getData = (callback: (data: any) => void) => {
    console.log(`Getting academic year details for id ${match.params.id}`);
    const url = `https://w0254970-apim.azure-api.net/academicyears/${match.params.id}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        callback(json);
      });
  };

  useEffect(() => {
    console.log("Getting academic years details...");

    getData((data) => {
      setSemesters(data.Semesters);
      setAcademicYear(data.Title);
    });
  }, []);

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    console.log("Begin async operation");

    getData((data) => {
      setSemesters(data.Semesters);
      event.detail.complete();
    });
  };

  const formatDateTime = (date: any) => {
    const dateSplit = date.replace("T", " ").split(/[- :]/);

    const newDate = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);

    return `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Semesters in {academicYear}</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/academicYears" />
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
          {semesters.map((semester: any, i) => {
            return (
              <IonItem
                routerLink={`/academicyears/semesters/${semester.SemesterId}`}
                key={i}
              >
                <IonCard>
                  <IonCardHeader>
                    <IonCardSubtitle>{semester.Name}</IonCardSubtitle>
                    <IonCardTitle>
                      {formatDateTime(semester.StartDate)} -{" "}
                      {formatDateTime(semester.EndDate)}
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

export default AcademicYearsDetails;
