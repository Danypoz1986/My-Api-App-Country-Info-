import { Redirect, Route } from 'react-router-dom';
import { 
  IonApp, 
  IonRouterOutlet, 
  setupIonicReact, 
  IonMenu, 
  IonContent, 
  IonList, 
  IonItem, 
  IonSplitPane, 
  IonHeader, 
  IonToolbar, 
  IonTitle 
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import About from './pages/About';
import { menuController } from '@ionic/core'; 

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Details from './pages/Details';

setupIonicReact();

const closeMenuAndNavigate = async (path: string) => {
  await menuController.close();
  window.location.href = path;
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main"> {/* ✅ Enables side menu */}

        {/* ✅ Menu Section */}
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem button onClick={() => closeMenuAndNavigate('/countries')}>🏠 Home</IonItem>
              <IonItem button onClick={() => closeMenuAndNavigate('/about')}>ℹ️ About</IonItem>
            </IonList>
          </IonContent>
        </IonMenu>

        {/* ✅ Main Page Content with Menu in Header */}
        <IonRouterOutlet id="main">
          <Route exact path="/countries" component={Home} />
          <Route exact path="/countries/:countryName" component={Details} />
          <Route exact path="/about" component={About} />
          <Route exact path="/">
            <Redirect to="/countries" />
          </Route>  
        </IonRouterOutlet>

      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
