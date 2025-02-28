# My Api App (Country Info) 🌍

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Usage](#api-usage)
  - [Search Countries](#search-countries)
  - [Get Country Details](#get-country-details)
- [App Screens](#app-screens)
  - [Home Page](#home-page)
  - [Details Page](#details-page)
  - [About Page](#about-page)
- [Deployment](#deployment)
- [Credits](#credits)
- [Author](#author)

## Overview

The **Country Info App** is an **Ionic React** application that provides comprehensive information about countries worldwide. Users can search for countries using different criteria and view detailed data such as capitals, languages, currencies, time zones, population, and borders.

This app was inspired by **Simon Grimm's YouTube tutorial**: [Ionic React Beginners Guide](https://www.youtube.com/watch?v=xn-qpnT2n3Q). I took inspiration from the video and extended the functionality to create my own version of the app.

## Features

- 🔍 **Search for countries** by name, full name, currency, or language.
- 🌍 **View detailed information** about each country, including:
  - Capital, region, and subregion
  - Official languages
  - Currencies and symbols
  - Population and area
  - Time zones and borders
  - Driving side
- 🚀 **Interactive UI** with a clean and user-friendly design.
- 📱 **Responsive design** optimized for mobile and tablet devices.
- 📌 **Side Menu Navigation** for easy access to different sections.

## Technologies Used

- **Ionic React** – For building the UI.
- **TypeScript** – For better type safety and maintainability.
- **React Hooks** – For managing state and effects.
- **REST Countries API** – To fetch real-time country data.
- **Ionicons** – For modern icons used in the app.

## Installation

To run the project locally in Ionic, follow these steps:

```bash
# Clone the repository
git clone https://github.com/Danypoz1986/My-Api-App-Country-Info-
cd My-Api-App-Country-Info-

# Install dependencies
npm install

# Start the development server
ionic serve
```
The app will be available at `http://localhost:8100`.

## API Usage
This app fetches country data from the **REST Countries API** (https://restcountries.com/v3.1). Below are the main functions:

### Search Countries
Retrieves a list of countries based on search criteria.

```typescript
const searchData = async (type: searchType, query: string): Promise<detailsResult[]> => {
  let url = `${baseUrl}/${type}/${encodeURIComponent(query)}`;
  const response = await fetch(url);
  return response.json();
};
```
### Get Country Details
Retrieves detailed information about a specific country, including its borders.

```typescript
const getDetails = async (country: string): Promise<detailsResult> => {
  const url = `${baseUrl}/name/${encodeURIComponent(country)}?fullText=true`;
  const response = await fetch(url);
  const data = await response.json();

  if (data[0].borders) {
    const borderCodes = data[0].borders.join(',');
    const bordersResponse = await fetch(`${baseUrl}/alpha?codes=${borderCodes}`);
    const bordersData = await bordersResponse.json();
    data[0].borders = bordersData.map((b: any) => b.name.common);
  }

  return data[0];
};
```
## App Screens

### Home Page
- Displays a **search bar** and a **filter dropdown** for selecting the search type.
- Lists countries with **flags and names**.
- Clicking a country **navigates to the details page**.

### Details Page
- Shows **detailed country information**, including:
    - Capital, region, languages, and currencies.
    - Borders and neighbors.
    - Driving side
    - Modal pop-up for extra details.

### About Page
- Displays **developer information** and **app version**.

## Deployment
The app is deployed on **Netlify** and can be accessed at:

🔗 [https://my-api-app-country-info.netlify.app/countries](https://my-api-app-country-info.netlify.app/countries)

## Credits
- **REST Countries API** – For providing country data.
- **Ionic Framework** – For UI components.
- **Simon Grimm's YouTube Tutorial** – Guide for learning Ionic React.
- **ChatGPT AI Assistance** – Helped with coding guidance, debugging, and structuring the project.

## Author
Developed by **Daniel Pozzoli** 🚀