import { 
  IonAvatar, 
  IonContent, 
  IonHeader, 
  IonImg, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonPage, 
  IonSearchbar, 
  IonSelect, 
  IonSelectOption, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonMenuButton 
} from '@ionic/react';
import useApi, { searchType } from '../hooks/useApi';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const { searchData } = useApi();

  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState<searchType>(searchType.Name);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    const loadData = async () => {
      try {
        console.log(`Fetching data for type: ${type} and query: ${searchTerm}`);
        const result = await searchData(type, searchTerm);

        // ✅ Ensure we only store valid results
        const validResults = result.filter(country => country.name?.common);
        setResults(validResults);
        console.log('Fetched Data:', validResults);
      } catch (error) {
        console.error('Error fetching data:', error);
        setResults([]);
      }
    };

    loadData();
  }, [searchTerm, type]);

  return (
    <IonPage>
      <IonHeader style={{ paddingTop: '40px' }}>
        <IonToolbar color={'primary'}>
          <IonButtons slot="start"> {/* ✅ Menu button on the left */}
            <IonMenuButton />
          </IonButtons>
          <IonTitle>My Api App (Country Info)</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar 
          value={searchTerm}
          debounce={300} 
          onIonChange={(e) => setSearchTerm(e.detail.value!)}
        />
        <IonItem>
          <IonSelect 
            value={type} 
            onIonChange={(e) => setType(e.detail.value as searchType)} 
            label="Select Search Type"
          >
            <IonSelectOption value={searchType.Name}> Name </IonSelectOption>
            <IonSelectOption value={searchType.FullName}> Full Name </IonSelectOption>
            <IonSelectOption value={searchType.Currency}> Currency </IonSelectOption>
            <IonSelectOption value={searchType.Language}> Language </IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* ✅ Display results dynamically */}
        {results.length > 0 ? (
          <IonList> {/* ✅ Wraps all IonItems inside a list */}
            {results.map((country, index) => (
              <IonItem key={index} routerLink={`/countries/${encodeURIComponent(country.name?.common)}`}>
                <IonAvatar slot='start'>
                  <IonImg src={country.flags?.png} />
                </IonAvatar>
                <IonLabel>
                  {country.name?.common || 'Unknown Country'}
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <IonLabel style={{ padding: '20px', display: 'block' }}>No results found</IonLabel>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
