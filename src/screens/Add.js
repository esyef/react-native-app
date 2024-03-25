import { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';
import { database } from '../config/fb';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function Add() {

  const nav = useNavigation();
  const [newItem, setNewItem] = useState({
    emoji: '💻',
    name: '',
    price: 0,
    isSold: false,
    createAt: new Date(),
  });

  const [isOpen, setIsOpen] = useState(false);

  function handlePick(emojiObject) {
    setNewItem({
      ...newItem,
      emoji: emojiObject.emoji,
    });
  }

  const onSend = async () => {
    await addDoc(collection(database, 'products'), newItem);
    nav.goBack()
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Sell a new product</Text>
      <Text style={style.emoji} onPress={() => setIsOpen(true)}>
        {newItem.emoji}
      </Text>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <TextInput
        onChangeText={(text) =>
          setNewItem({
            ...newItem,
            name: text,
          })
        }
        placeholder='Product Name'
        style={style.inputContainer}
        placeholderTextColor='#fff'
      />

      <TextInput
        onChangeText={(text) =>
          setNewItem({
            ...newItem,
            price: text,
          })
        }
        placeholder='$ Price'
        style={style.inputContainer}
        placeholderTextColor='#fff'
      />

      <Button title='Publish' onPress={onSend} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c1b33',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
  },
  emoji: {
    fontSize: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
  inputContainer: {
    width: '90%',
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    color: '#fff',
  },
});
