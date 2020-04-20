import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  calendarOutline,
  schoolOutline,
  personCircleOutline,
  libraryOutline,
} from "ionicons/icons";
import AcademicYearsList from "./pages/AcademicYearsList";
import CoursesList from "./pages/CoursesList";
import CourseDetails from "./pages/CourseDetails";
import DiplomaProgramsList from "./pages/DiplomaProgramsLists";
import DiplomaProgramDetails from "./pages/DiplomaProgramDetails";
import InstructorsList from "./pages/InstructorsList";
import InstructorDetails from "./pages/InstructorDetails";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route
            path="/academicyears"
            component={AcademicYearsList}
            exact={true}
          />
          <Route path="/courses" component={CoursesList} exact={true} />
          <Route path="/courses/:id" component={CourseDetails} exact={true} />
          <Route
            path="/diplomaprograms"
            component={DiplomaProgramsList}
            exact={true}
          />
          <Route
            path="/diplomaprograms/:id"
            component={DiplomaProgramDetails}
            exact={true}
          />
          <Route path="/instructors" component={InstructorsList} exact={true} />
          <Route
            path="/instructors/coursestaught/:id"
            component={InstructorDetails}
            exact={true}
          />
          <Route
            path="/instructors/coursestaught/courses/:id"
            component={CourseDetails}
            exact={true}
          />
          <Route
            path="/diplomaprograms/advisingassignments/:id"
            component={InstructorDetails}
            exact={true}
          />
          <Route
            path="/"
            render={() => <Redirect to="/academicyears" />}
            exact={true}
          />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="AcademicYears" href="/academicyears">
            <IonIcon icon={calendarOutline} />
            <IonLabel>Academic Years</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Courses" href="/courses">
            <IonIcon icon={schoolOutline} />
            <IonLabel>Courses</IonLabel>
          </IonTabButton>
          <IonTabButton tab="DiplomaPrograms" href="/diplomaprograms">
            <IonIcon icon={libraryOutline} />
            <IonLabel>Diploma Programs</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Instructors" href="/instructors">
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Instructors</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
