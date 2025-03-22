import { 
    IonBackButton, 
    IonButton, 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    useIonViewWillEnter, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent, 
    IonImg, 
    IonAvatar, 
    IonModal, 
    IonFooter,
    IonItem,
    IonIcon,
    IonLabel,
    IonMenuButton
  } from '@ionic/react';
  
  import { 
    business, 
    map, 
    language, 
    cashOutline, 
    earthOutline, 
    people, 
    resizeOutline, 
    lockClosedOutline, 
    carOutline 
  } from 'ionicons/icons';         
  
  import React, { useState } from 'react';
  import { RouteComponentProps } from 'react-router';
  import { detailsResult } from '../hooks/useApi';
  import useApi from '../hooks/useApi';
  
  interface DetailsPageProps
    extends RouteComponentProps<{
      countryName: string;
    }>{}
  
  const Details: React.FC<DetailsPageProps> = ({ match }) => {
    const { getDetails } = useApi();
    const [data, setData] = useState<detailsResult | null>(null);
  
    useIonViewWillEnter(async () => {
      const countryName = match.params.countryName; // ✅ Get country from match.params
      if (countryName) {
        const result = await getDetails(countryName);
        setData(result);
      }
    });
  
    return (
      <IonPage style={{ marginTop: '40px' }}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Country Info</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {data && (
            <IonCard>
              <IonCardHeader>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IonAvatar style={{ marginRight: '10px' }}>
                    <IonImg src={data.flags?.svg} />
                  </IonAvatar>
                  <IonCardTitle>{data.name?.official}</IonCardTitle>
                </div>
              </IonCardHeader>
  
              <div style={{ height: '15px' }}></div>
  
              <IonCardContent>
                <IonImg src={data.coatOfArms?.svg} />
              </IonCardContent>  
            </IonCard>
          )}
  
          <IonModal trigger='open-modal' initialBreakpoint={0.25} breakpoints={[0, 0.25, 0.5, 0.75]}>
            <IonContent className='ion-padding'>
  
              <IonItem lines="none">
                <IonIcon icon={business} slot='start' />
                <IonLabel>{data?.capital ? Object.values(data.capital).join(', ') : 'N/A'}</IonLabel>
              </IonItem>
  
              <IonItem lines="none">
                <IonIcon icon={map} slot='start' />
                <IonLabel>{data?.region}</IonLabel>
              </IonItem>
  
              <IonItem lines="none">
                <IonIcon icon={language} slot='start' />
                <IonLabel>{data?.languages ? Object.values(data.languages).join(', ') : 'N/A'}</IonLabel>
              </IonItem>
  
              <IonItem lines="none">
                <IonIcon icon={cashOutline} slot='start' />
                <IonLabel>
                  {data?.currencies
                    ? Object.entries(data.currencies)
                        .map(([code, { name, symbol }]) => `${name} (${symbol})`)
                        .join(', ')
                    : 'N/A'}
                </IonLabel>
              </IonItem>
  
              <IonItem lines="none">
                <IonIcon icon={earthOutline} slot='start' />
                <IonLabel>{data?.timezones ? data.timezones.join(', ') : 'N/A'}</IonLabel>
              </IonItem>
  
              <IonItem lines="none">
                <IonIcon icon={people} slot='start' />
                <IonLabel>{data?.population ? data.population.toLocaleString() : 'N/A'}</IonLabel>
              </IonItem>                
  
              <IonItem lines="none">
                <IonIcon icon={resizeOutline} slot='start' />
                <IonLabel>{data?.area ? `${data.area.toLocaleString()} km²` : 'N/A'}</IonLabel>
              </IonItem>
              
              <IonItem lines="none">
                <IonIcon icon={lockClosedOutline} slot="start" />
                <IonLabel>
                  {data?.borders?.length ? data.borders.join(', ') : 'No borders'}
                </IonLabel>
              </IonItem>
  
              <IonItem lines="none">
                <IonIcon icon={carOutline} slot='start' />
                <IonLabel>{data?.car?.side}</IonLabel>
              </IonItem>             
  
            </IonContent>
          </IonModal>    
        </IonContent>
        <IonFooter>
          <IonButton expand="full" id='open-modal'>
            Show More
          </IonButton>
        </IonFooter>
      </IonPage>
    );
  }
  
  export default Details;
  