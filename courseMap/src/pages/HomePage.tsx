import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
} from "@ionic/react";

import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center home-header">
            NSCC Course Map
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonImg
          class="ion-align-self-center home-image"
          src={
            "https://www.nscc.ca/img/aboutnscc/visual-identity-guidelines/artwork/campuses/institute/nscc-it-jpeg.jpg"
          }
        ></IonImg>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
