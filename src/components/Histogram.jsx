import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import ReactECharts from "echarts-for-react";
const Histogram = () => {
  const [data, setData] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [graphType, setGraphType] = useState("bar");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.terriblytinytales.com/test.txt"
        );
        if (!response.ok) {
          throw new Error("Request failed with status: " + response.status);
        }
        const data = await response.text();
        const output = data.replace(/[^a-z']/gi, " ");
        const removeSpaces = output.replace(/\s+/g, " ");
        const words = removeSpaces.toLowerCase().split(/\s+/);
        const wordCounts = countWords(words);
        const sortedWordCounts = sortWordCounts(wordCounts);
        const topWords = sortedWordCounts.slice(0, 20);
        setData(topWords);
        console.log(wordCounts);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const countWords = (text) => {
    const wordCounts = {};
    for (const word of text) {
      if (wordCounts[word]) {
        wordCounts[word]++;
      } else {
        wordCounts[word] = 1;
      }
    }
    return wordCounts;
  };

  const sortWordCounts = (wordCounts) => {
    const sortedWords = Object.keys(wordCounts).sort(
      (a, b) => wordCounts[b] - wordCounts[a]
    );
    const sortedWordCounts = sortedWords.map((word) => ({
      name: word,
      value: wordCounts[word],
    }));
    return sortedWordCounts;
  };
  const convertToCSV = () => {
    const csvData = data.map((item) => ({
      Word: item.name,
      Frequency: item.value,
    }));
    return csvData;
  };

  const pie = {
    tooltip: {},
    series: [
      {
        name: "Word Count",
        type: "pie",
        radius: "50%",
        data: data.map((item) => ({ name: item.name, value: item.value })),
      },
    ],
    roseType: "area",
  };
  const bar = {
    tooltip: {},
    xAxis: {
      type: "category",
      name: "names",
      data: data.map((item) => item.name),
      show: graphType === "bar",
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      type: "value",
      name: "Frequency",

      axisLabel: {
        formatter: "{value}",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "8%",
      containLabel: true,
    },
    series: [
      {
        name: "Word Count",
        type: "bar",
        data: data.map((item) => item.value),
        itemStyle: {
          color: (params) =>
            params.dataIndex % 2 === 0 ? "#394867" : "#212A3E", // Alternate colors for bars
        },
      },
    ],
  };
  const graphOptions = [
    { key: "bar", label: "Bar Graph" },
    { key: "pie", label: "Pie Chart" },
  ];

  return (
    <div
      className={`h-screen container px-24 pb-24 flex ${
        theme === "light" ? "bg-[#9BA4B5]" : "bg-[#212A3E]"
      } flex-col mx-auto`}
    >
      <div className="flex flex-wrap justify-evenly pt-12">
        <CSVLink
          data={convertToCSV()}
          filename="histogram_data.csv"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Export CSV
        </CSVLink>
        <button
          onClick={toggleTheme}
          type="button"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          {theme === "light" ? "Dark Theme" : "Light Theme"}
        </button>
        <select
          value={graphType}
          onChange={(e) => setGraphType(e.target.value)}
          className="text-white bg-blue-500 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          {graphOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-grow">
        <div className="box-content container rounded-xl mx-auto border h-full shadow-lg bg-slate-300 overflow-hidden">
          <p className="font-semibold text-center text-4xl container mx-auto justify-center">
            Word Frequency
          </p>
          {graphType === "bar" ? (
            <ReactECharts option={bar} style={{ height: "100%" }} />
          ) : (
            <ReactECharts option={pie} style={{ height: "100%" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Histogram;
