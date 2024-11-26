import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Line } from 'react-chartjs-2'; // Import the Line chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ThirdScreen() {
  const [users, setUsers] = useState<any[]>([]); // State to store API user data
  const [chartData, setChartData] = useState<any>(null); // State for chart data
  const [name, setName] = useState(''); // State for form name input
  const [age, setAge] = useState(''); // State for form age input
  const [fee, setFee] = useState(''); // State for form fee input

  // Fetch user data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.110.66.77:3000/');
        const data = await response.json();

        const validUsers = data.filter((user: any) => user.user.age >= 0);
        setUsers(validUsers);

        // Update chart data
        updateChartData(validUsers);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  // Update chart data when the users array changes
  const updateChartData = (userArray: any[]) => {
    const labels = userArray.map((user) => user.user.name); // X-axis labels
    const dataPoints = userArray.map((user) => user.user.fee); // Y-axis data points

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'User Fees',
          data: dataPoints,
          borderColor: 'rgb(134, 65, 244)',
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.1, // Line smoothing
        },
      ],
    });
  };

  // Handle form submission to add new user data and update the chart
  const handleFormSubmit = () => {
    // Add the new user to the existing user array
    const newUser = {
      user: {
        name: name.trim(),
        age: parseInt(age),
        fee: parseFloat(fee),
      },
    };
    const updatedUsers = [...users, newUser];

    // Update state and chart data
    setUsers(updatedUsers);
    updateChartData(updatedUsers);

    // Clear form fields
    setName('');
    setAge('');
    setFee('');
  };

  // Chart configuration options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <View style={styles.container}>
      {/* Form for adding new user data */}
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Fee"
        keyboardType="numeric"
        value={fee}
        onChangeText={setFee}
      />
      <Button title="Add User" onPress={handleFormSubmit} />

      {/* Display the Line chart */}
      {chartData && (
        <Line
          data={chartData}
          options={chartOptions}
          height={200}
          width={300}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
});
