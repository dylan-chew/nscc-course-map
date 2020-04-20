import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonItem,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import "./CoursesList.css";

const CoursesList: React.FC = () => {
  //define the state of courses
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getData = (callback: (data: any) => void) => {
    const url = "https://w0254970-apim.azure-api.net/courses";

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        // set the state of our rockets
        callback(json);
      });
  };

  useEffect(() => {
    console.log("Getting courses data...");

    getData((data) => {
      setCourses(data);
    });
  }, []);

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    console.log("Begin async operation");

    getData((data) => {
      setCourses(data);
      event.detail.complete();
    });
  };

  const handleInput = (event: any) => {
    setSearchText(event.detail.value);
  };

  let coursesFiltered = courses
    .filter((course: any) => {
      if (
        searchText === "" ||
        course.Title.toLowerCase().includes(searchText.toLowerCase()) ||
        course.CourseCode.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return course;
      }
    })
    .map((course: any, i) => {
      if (course)
        return (
          <IonItem routerLink={`/courses/${course.Id}`} key={i}>
            {course.CourseCode} - {course.Title}
          </IonItem>
        );
    });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Courses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonToolbar>
        <IonSearchbar onIonChange={handleInput}></IonSearchbar>
      </IonToolbar>
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
          {coursesFiltered.length > 0 ? coursesFiltered : "No Courses Found"}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CoursesList;
