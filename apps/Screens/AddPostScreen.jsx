import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ToastAndroid, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig'
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';

export default function AddPostScreen() {
  const db = getFirestore(app);
  const storage = getStorage();
  const {user} = useUser();
  const [categoryList, setCategoryList] = useState([])
  const [loading,setLoading] = useState(false)
  const [image, setImage] = useState(null);


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
  };

  // Used to pick image from Gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = async(value)=>{
    setLoading(true);
    // Cover URL to blob file
    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, "marketPost/" + Date.now() + ".jpg");

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob!");
      return getDownloadURL(storageRef);
    }).then(async(url) => {
      console.log(url);
      
      value.image=url;
      value.userName = user.fullName;
      value.userEmail = user.primaryEmailAddress.emailAddress;
      value.userImage = user.imageUrl; 

      const docRef = await addDoc(collection(db,'UserPost'),value)
      
      if(docRef.id){
        setLoading(false)
        console.log('Document Added!');
        Alert.alert('Success!','Post Added successfully!')
        
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  }
  return (
    <View className='p-10'>
      <Formik
        initialValues={{ name: '', description: '', category: '', address: '', price: '',image:'',userName:'',userEmail:'',userImage:''}}
        onSubmit={value => onSubmitMethod(value)}
        validate={(values)=>{
          const errors={};
          if(!values.title){
            ToastAndroid.show('Title is empty',ToastAndroid.SHORT)
            errors.name='title is empty'
          }
          return errors
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values,setFieldValue,errors }) => (
          <View>
            <Text style={styles.title}>Add new Post</Text>
            <Text style={styles.subtitle}>Create new product to sell</Text>
            <TouchableOpacity onPress={pickImage}>
              {image ?
              <Image source={{uri:image}} style={{width:120,height:100,marginTop:25,borderRadius:15}} />
              :
              <Image source={require('./../../assets/images/imagePlaceholder.png')}
              style={{width:120,height:100,marginTop:25,borderRadius:15}}
              />
              }
            </TouchableOpacity>
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
            <View style={{borderWidth:1,borderRadius:10,marginTop:15,height:53}}>
            <Picker
              style={styles.input}
              selectedValue={values?.category}
              onValueChange={itemValue => setFieldValue('category',itemValue)}
            >
              {categoryList && categoryList.map((category, i) => (
                <Picker.Item label={category?.name} value={category.name} key={i} />
              ))}
            </Picker>            
            </View>


            <TouchableOpacity 
              style={styles.button}
              disabled={loading} 
              onPress={handleSubmit}
            >
              { loading ?
                <ActivityIndicator color={'#ffff'} />
                :
                <Text style={styles.buttonText}>Submit</Text>
              }
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
