import React from "react";
import CreatePostNavigator from "./navigation";

export default function CreatePost() {
  return <CreatePostNavigator />;
}

// import React, { useState } from 'react';
// import { ScrollView, StyleSheet, View } from 'react-native';
// import Header from './Header';
// import CreateNav from './CreateNav';
// import PostCreation from './PostCreation';
// import TakeCreation from './TakeCreation';
// import SelectPhotos from './SelectPhotos';

// const CreatePost = () => {
//   const [selectedScreen, setSelectedScreen] = useState('Post');

//   return (
//     <View style={styles.container}>
//       <Header />
//       {/* <CreateNav
//         selectedScreen={selectedScreen}
//         setSelectedScreen={setSelectedScreen}
//       />
//       <ScrollView contentContainerStyle={styles.screenContainer}>
//         {selectedScreen === 'Post' && <PostCreation />}
//         {selectedScreen === 'Take' && <TakeCreation />}
//       </ScrollView> */}
//       <SelectPhotos />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#181818',
//   },
//   screenContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
// });

// export default CreatePost;
