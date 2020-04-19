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
import "./InstructorsList.css";

interface Instructor {
  id: Number;
  firstName: String;
  lastName: String;
}

const InstructorsList: React.FC = () => {
  // definig the state for this component
  const [instructors, setInstructors] = useState<Array<Instructor>>([]);

  const getData = (callback: (data: any) => void) => {
    const url = "https://w0254970-apim.azure-api.net/instructors";

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        // set the state of our rockets
        callback(json);
      });
  };

  useEffect(() => {
    console.log("Getting instructor data...");

    getData((data) => {
      setInstructors(
        data.map((item: any) => {
          return {
            id: item.Id,
            firstName: item.FirstName,
            lastName: item.LastName,
          };
        })
      );
    });
  }, []);

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    console.log("Begin async operation");

    getData((data) => {
      setInstructors(
        data.map((item: any) => {
          return {
            id: item.Id,
            firstName: item.FirstName,
            lastName: item.LastName,
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
          <IonTitle>Instructors</IonTitle>
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
          {instructors.map((instructor: Instructor, i) => {
            return (
              <IonItem href={`/instructors/${instructor.id}`} key={i}>
                {instructor.lastName}, {instructor.firstName}
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default InstructorsList;
