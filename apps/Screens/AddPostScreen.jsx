import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig'
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';

export default function AddPostScreen() {
  const db = getFirestore(app)
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    getCategoryList();
  }, [])

  // Get collection from Firebase
  const getCategoryList = async () => {
    try {
      setCategoryList([]); 
      const querySnapshot = await getDocs(collection(db, "Category"));
      querySnapshot.forEach((doc) => {
        setCategoryList((categoryList) => [...categoryList, doc.data()]);
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  return (
    <View className='p-10'>
      <Formik
        initialValues={{ name: '', description: '', category: '', address: '', price: '' }}
        onSubmit={values => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values,setFieldValue }) => (
          <View>
            <Text style={styles.title}>Add new Post</Text>
            <Text style={styles.subtitle}>Create new product to sell</Text>

            <TextInput
              style={styles.input}
              placeholder='Title'
              value={values?.title}
              onChangeText={handleChange('title')}
            />
            <TextInput
              style={styles.input}
              placeholder='Description'
              value={values?.description}
              numberOfLines={5}
              onChangeText={handleChange('description')}
            />
            <TextInput
              style={styles.input}
              placeholder='Price'
              value={values?.price}
              onChangeText={handleChange('price')}
              keyboardType='number-pad'
            />
            <TextInput
              style={styles.input}
              placeholder='Address'
              value={values?.address}
              onChangeText={handleChange('address')}
            />
            <Picker
              style={styles.input}
              selectedValue={values?.category}
              onValueChange={itemValue => setFieldValue('category',itemValue)}
            >
              {categoryList && categoryList.map((category, i) => (
                <Picker.Item label={category?.name} value={category.name} key={i} />
              ))}
            </Picker>

            {/* Cambiamos View a TouchableOpacity para que maneje onPress */}
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleSubmit} // Asegúrate de que handleSubmit esté conectado aquí
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 17,
    marginBottom: 5,
    marginTop: 10,
    textAlignVertical: 'top',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  subtitle: {
    fontWeight: 'bold',
    color: 'gray',
  },
  button: {
    padding: 15,
    marginTop: 10,
    backgroundColor: 'blue',
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
})
