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
  const [advisingAssignments, setAdvisingAssignments] = useState<Array<any>>(
    []
  );
  const [instructor, setInstructor] = useState<String>("");

  const getData = (callback: (data: any) => void) => {
    console.log(match.path);

    console.log(`Getting instructor details for id ${match.params.id}`);
    const url = `https://w0254970-apim.azure-api.net/instructors/${match.params.id}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        callback(json);
      });
  };

  useEffect(() => {
    console.log("Getting courses taught data...");

    getData((data) => {
      setCoursesTaught(data.CoursesTaught);
      setAdvisingAssignments(data.AdvisingAssignments);
      setInstructor(`${data.FirstName} ${data.LastName}`);
    });
  }, []);

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    console.log("Begin async operation");

    getData((data) => {
      setCoursesTaught(data.CoursesTaught);
      setAdvisingAssignments(data.AdvisingAssignments);
      event.detail.complete();
    });
  };

  let coursesTaughtDisplay = coursesTaught.map((course: any, i) => {
    return (
      <IonItem
        routerLink={`/instructors/coursestaught/courses/${course.Id}`}
        key={i}
      >
        {course.CourseCode} - {course.Title}
      </IonItem>
    );
  });

  let advisingAssignmentsDisplay = advisingAssignments.map((aa: any, i) => {
    return (
      <IonItem key={i}>
        {aa.DiplomaProgram} - {aa.DiplomaProgramYear} -{" "}
        {aa.DiplomaProgramYearSection} - {aa.AcademicYear}
      </IonItem>
    );
  });

  const isCoursesTaught = () => {
    if (match.path === "/instructors/coursestaught/:id") {
      return true;
    } else {
      console.log("falseflaslfle");
      return false;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {isCoursesTaught()
              ? `Courses Taught by ${instructor}`
              : `${instructor}'s Advising Assignments`}
          </IonTitle>
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
          {isCoursesTaught()
            ? coursesTaughtDisplay
            : advisingAssignmentsDisplay}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default InstructorDetail;
