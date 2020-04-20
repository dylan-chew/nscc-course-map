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
import "./InstructorsList.css";
import { RouteComponentProps } from "react-router";

interface CourseDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const CourseDetail: React.FC<CourseDetailPageProps> = ({ match }) => {
  // definig the state for this component
  const [courseDetails, setCourseDetails] = useState<any>({});
  const [prereqs, setPrereqs] = useState<any>([]);
  const [isPrereqFor, setIsPrereqFor] = useState<any>([]);

  const getData = (callback: (data: any) => void) => {
    console.log(`Getting course details for id ${match.params.id}`);
    const url = `https://w0254970-apim.azure-api.net/courses/${match.params.id}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        callback(json);
      });
  };

  useEffect(() => {
    console.log("Getting course data...");

    getData((data) => {
      setCourseDetails(data);
      setPrereqs(data.CoursePrereqs);
      setIsPrereqFor(data.IsPrereqForCourses);
    });
  }, []);

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    console.log("Begin async operation");

    getData((data) => {
      setCourseDetails(data);
      setPrereqs(data.CoursePrereqs);
      setIsPrereqFor(data.IsPrereqForCourses);
      event.detail.complete();
    });
  };

  let prereqList = prereqs.map((prereq: any, i: any) => {
    return (
      <IonItem key={i}>
        {prereq.PrereqCourseCode} - {prereq.PrereqTitle}
      </IonItem>
    );
  });

  let isPrereqList = isPrereqFor.map((isprereq: any, i: any) => {
    return (
      <IonItem key={i}>
        {isprereq.ForCourseCode} - {isprereq.ForTitle}
      </IonItem>
    );
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Courses Details</IonTitle>
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
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{courseDetails.CourseCode}</IonCardSubtitle>
            <IonCardTitle>{courseDetails.Title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonListHeader>Course Prerequistes:</IonListHeader>
              {prereqList.length > 0 ? prereqList : "None"}
            </IonList>
            <IonList>
              <IonListHeader>Is Prerequiste For:</IonListHeader>
              {isPrereqList.length > 0 ? isPrereqList : "None"}
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CourseDetail;
