
# Word Frequency Counter


This project is a web application that fetches data from the **terriblytinytales** **https://www.terriblytinytales.com/test.txt** API and displays the word frequency in a histogram format. It provides an interface for users to export the word frequency data as a CSV file and toggle between light and dark themes. The project is built using React and utilizes several libraries and plugins.

## Deployment on firebase
**https://terriblytinytales.web.app/**


## Tech Stack

**Client:** React, react-csv, react-router-dom, echarts-for-react, TailwindCSS.

**React:** A JavaScript library for building user interfaces.

**React Router:** A library for declarative routing in React applications.

**React Hooks:** Used to manage state and lifecycle methods in functional components.

**react-csv:** Used to generate a CSV file from the word frequency data.

**echarts-for-react:** Used to render the histogram and pie chart visualizations.

## Code Explanation

### App.js
This file sets up the main component of the application. It imports the required dependencies and defines the routes for the Submit and Histogram components using React Router. The routes are configured to render the corresponding components when the URL path matches.

### Histogram.jsx
This component is responsible for fetching the data from the terriblytinytales API and processing it to determine word frequency. It utilizes the useEffect hook to perform the data fetching when the component mounts. The fetched data is cleaned and processed to remove special characters, convert all words to lowercase, and count the frequency of each word. The top 20 words with the highest frequency are selected for display.

The component also includes functionality to toggle between light and dark themes. The current theme is stored in the theme state variable, and clicking the "Dark Theme" or "Light Theme" button updates the theme accordingly.

The word frequency data is visualized using either a bar graph or a pie chart, depending on the selected graph type. The graph type is stored in the graphType state variable and can be changed using the dropdown menu. The visualization is achieved using the ReactECharts component from the echarts-for-react library.

The component includes a function convertToCSV that converts the word frequency data into a format suitable for exporting as a CSV file. The CSVLink component from the react-csv library is used to generate a download link for the CSV file.

### Submit.jsx
This component serves as the landing page of the application. It displays a button labeled "Submit Button" and a message to prompt the user to click the button to plot the histogram data. When the button is clicked, the component uses the useNavigate hook from React Router to navigate the user to the Histogram component.

## Running the Project

### Run Locally

Clone the project

```bash
  git clone https://github.com/nikhil-banga/word-frequency-counter
```

Go to the project directory

```bash
  cd word-frequency-counter
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

