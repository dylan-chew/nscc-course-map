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
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import "./InstructorsList.css";
import { RouteComponentProps } from "react-router";

// interface Course {
//   id: Number;
//   title: String;
//   courseCode: String;
// }

// interface CoursesTaught {
//   coursesTaught: Array<Course>;
// }

interface InstructorDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const InstructorDetail: React.FC<InstructorDetailPageProps> = ({ match }) => {
  // definig the state for this component
  const [coursesTaught, setCoursesTaught] = useState<Array<any>>([]);
  const [instructor, setInstructor] = useState<String>("");

  const getData = (callback: (data: any) => void) => {
    console.log(`Getting instructor details for id ${match.params.id}`);
    const url = `https://w0254970-apim.azure-api.net/instructors/${match.params.id}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        // set the state of our rockets
        callback(json);
      });
  };

  useEffect(() => {
    console.log("Getting rocket data...");

    getData((data) => {
      setCoursesTaught(data.CoursesTaught);
      setInstructor(`${data.FirstName} ${data.LastName}`);
    });
  }, []);

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    console.log("Begin async operation");

    getData((data) => {
      setCoursesTaught(data.CoursesTaught);
      event.detail.complete();
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Courses Taught by {instructor}</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/instructors" />
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
          {coursesTaught.map((course: any, i) => {
            return (
              <IonItem routerLink={`/courses/${course.Id}`} key={i}>
                {course.CourseCode} - {course.Title}
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default InstructorDetail;
