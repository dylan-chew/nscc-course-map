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
import "./SemestersDetails.css";
import { RouteComponentProps } from "react-router";

interface SemestersDetailsPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const SemestersDetails: React.FC<SemestersDetailsPageProps> = ({ match }) => {
  // definig the state for this component
  const [coursesTaught, setCoursesTaught] = useState<Array<any>>([]);
  const [semester, setSemester] = useState<String>("");

  const getData = (callback: (data: any) => void) => {
    console.log(`Getting academic year details for id ${match.params.id}`);
    const url = `https://w0254970-apim.azure-api.net/semesters/${match.params.id}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        callback(json);
      });
  };

  useEffect(() => {
    console.log("Getting academic years details...");

    getData((data) => {
      setCoursesTaught(data.CoursesTaught);
      setSemester(data.Name);
    });
  }, []);

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    console.log("Begin async operation");

    getData((data) => {
      setCoursesTaught(data.CoursesTaught);
      event.detail.complete();
    });
  };

  const coursesTaughtDisplay = coursesTaught.map((courseTaught: any, i) => {
    return (
      <IonItem
        routerLink={`/academicyears/semesters/courses/${courseTaught.CourseId}`}
        key={i}
      >
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{courseTaught.CourseCode}</IonCardSubtitle>
            <IonCardTitle>{courseTaught.Title}</IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonItem>
    );
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Courses Taught in {semester}</IonTitle>
          <IonButtons slot="start">
            <IonBackButton />
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
          {coursesTaught.length > 0
            ? coursesTaughtDisplay
            : `No courses available`}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SemestersDetails;
