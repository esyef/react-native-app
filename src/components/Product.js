import { View, StyleSheet, Text } from 'react-native';
import { database } from '../config/fb';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';

export default function Product({ id, emoji, name, price, isSold }) {
  return (
    <View style={style.productContainer}>
      <Text style={style.emoji}>{emoji}</Text>

      <Text style={style.name}>{name}</Text>
      <Text style={style.price}> {price}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  productContainer: {
    padding: 16,
    backgroundColor: '#0c1b33',
    margin: 16,
    borderRadius: 8,
  },
  name: { fontSize: 32, fontWeight: 'bold' },
  price: { fontSize: 24 },
  emoji: {
    fontSize: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
});
