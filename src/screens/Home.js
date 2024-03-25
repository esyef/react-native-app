import { useNavigation } from '@react-navigation/native';
import { Text, Button } from 'react-native';
import { database } from '../config/fb';
import { QuerySnapshot, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Product from '../components/Product';
import { useEffect, useState } from 'react';

export default function Home() {
  const nav = useNavigation();
  const [products, setProduct] = useState();

  useEffect(() => {
    const collectionRef = collection(database, 'products');
    const q = query(collectionRef, orderBy('createdAt', 'desc'))

    const unsuscribe = onSnapshot(q, querySnapshot => {
      setProduct(querySnapshot.docs.map(doc => ({
        id: doc.id,
        emoji: doc.data().emoji,
        name: doc.data().name,
        price: doc.data().price,
        isSold: doc.data().isSold,
        createAt: doc.data().createAt
      })))
    })

    return unsuscribe
  }, []);

  return (
    <>
      <Text>Products</Text>
      {
        products.map(product => (
          <Product 
            key={product.id}
            {...product}
          />
        ))
      }
      <Button title='Go to Add Screen ' onPress={() => nav.navigate('Add')} />
    </>
  );
}
