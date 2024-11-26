import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const [totalFees, setTotalFees] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.110.66.77:3000/');
        const data = await response.json();
        const validUsers = data.filter((user: any) => user.user.age >= 0);  // Filter negative ages

        setUsers(validUsers);
        setTotalFees(
          validUsers.reduce((sum: number, user: any) => sum + user.user.fee, 0) // Sum of all fees
        );
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  // Determine card color based on age
  const getCardColor = (age: number) => {
    if (age < 30) return 'gray';
    if (age <= 50) return 'red';
    return 'blue';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalFees}>Total Fees Paid: ${totalFees}</Text>
      
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: getCardColor(item.user.age) }]}>
            <Text style={styles.cardText}>{item.user.name} {item.user.lastname}</Text>
            <Text style={styles.cardText}>Age: {item.user.age}</Text>
            <Text style={styles.cardText}>Fees Paid: ${item.user.fee}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  totalFees: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  cardText: {
    color: '#fff',
  },
});
