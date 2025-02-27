export enum searchType {
  Name = 'name',
  FullName = 'fullName',
  Currency = 'currency',
  Language = 'language',
}

export interface detailsResult {
  name?: { common: string; official: string };
  capital?: string[];
  currencies?: { [key: string]: { name: string; symbol: string } };
  languages?: { [key: string]: string };
  flags?: { png: string; svg: string };
  coatOfArms?: { png: string; svg: string };
  region?: string;
  population?: number;
  timezones?: string[];
  area?: number;
  borders?: string[];
  car?: { side: string };
  postalCode?: { format: string}
}

export const useApi = () => {
  const baseUrl = 'https://restcountries.com/v3.1';

  const searchData = async (type: searchType, query: string): Promise<detailsResult[]> => {
    let url = '';

    switch (type) {
      case searchType.Name:
        url = `${baseUrl}/name/${encodeURIComponent(query)}`;
        break;
      case searchType.FullName:
        url = `${baseUrl}/name/${encodeURIComponent(query)}?fullText=true`;
        break;
      case searchType.Currency:
        url = `${baseUrl}/currency/${encodeURIComponent(query)}`;
        break;
      case searchType.Language:
        url = `${baseUrl}/lang/${encodeURIComponent(query)}`;
        break;
      default:
        throw new Error('Invalid search type');
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    
    return response.json();
  };

  const getDetails = async (country: string): Promise<detailsResult> => {
    const url = `${baseUrl}/name/${encodeURIComponent(country)}?fullText=true`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    if (data[0].borders) {
      const borderCodes = data[0].borders.join(',');
      const bordersResponse = await fetch(`${baseUrl}/alpha?codes=${borderCodes}`);
      const bordersData = await bordersResponse.json();
      
      // Replace ISO3 codes with full country names
      data[0].borders = bordersData.map((b: any) => b.name.common);
    }
    return data[0];
  };


  return { searchData, getDetails };
};

export default useApi;
