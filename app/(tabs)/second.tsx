import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export default function SecondScreen() {
  const [timer, setTimer] = useState(0); // Timer state
  const [userDetails, setUserDetails] = useState<string>(''); // User details state
  const [loading, setLoading] = useState(true); // Loading state for the API call

  // Timer effect: Increment timer every second
  useEffect(() => {
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);

    // Fetch user data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.110.66.77:3000/'); // API endpoint
        const data = await response.json();

        // Filter and format valid users (exclude users with negative age)
        const validUsers = data.filter((item: any) => item.user.age >= 0);
        const userDetailsString = validUsers
          .map((item: any) => {
            const { name, lastname, age, fee } = item.user;
            return `Name: ${name} ${lastname}, Age: ${age}, Fee Paid: $${fee}`;
          })
          .join('\n');

        // Update user details and stop loading
        setUserDetails(userDetailsString);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchData();

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Create a promise that resolves after 3 intervals (1 second each)
  const startIntervalPromise = () => {
    return new Promise((resolve) => {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        if (count === 3) {
          clearInterval(interval);
          resolve('Interval completed 3 times');
        }
      }, 1000);
    });
  };

  // Trigger the interval promise effect
  useEffect(() => {
    startIntervalPromise().then((message) => {
      console.log(message); // Logs after 3 intervals
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Timer Display */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerTitle}>Session Timer</Text>
        <Text style={styles.timerText}>{timer} seconds</Text>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Fetching user details...</Text>
        </View>
      ) : (
        <View style={styles.textBoxContainer}>
          {/* User Details Display */}
          <Text style={styles.textBox}>{userDetails || 'No user data available.'}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Light blue background for attractiveness
  },
  timerContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6f7ff', // Light cyan background for timer
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  timerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
  textBoxContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  textBox: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
});
