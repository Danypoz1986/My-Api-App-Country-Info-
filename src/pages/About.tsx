import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonButton
  } from '@ionic/react';

  import { useHistory } from 'react-router-dom';

  const About: React.FC = () => {

    const history = useHistory();

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar style={{ marginTop: '40px' }}>
            <IonButtons slot="start"> 
              <IonButton onClick={() => history.goBack()}>🔙 Back</IonButton>
            </IonButtons> 
            <IonTitle>About This App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2>About Country Info App</h2>
          <p><strong>Version:</strong> 1.0</p>
          <p><strong>Developer:</strong> Daniel Pozzoli</p>
          <p>
            This app provides detailed information about countries, including their flags, 
            capitals, languages, currencies, time zones, population, and more. 
            The data is fetched from the REST Countries API and displayed in an easy-to-use interface.
          </p>
          <h3>Features:</h3>
          <ul>
            <li>🔎 Search countries by name, currency, or language</li>
            <li>🌍 View detailed country information</li>
            <li>📌 Interactive menu for easy navigation</li>
            <li>📱 Clean and responsive design</li>
          </ul>
          <p>Thank you for using the <strong>Country Info App</strong>! 🚀</p>
        </IonContent>
      </IonPage>
    );
  };
  
  export default About;
  