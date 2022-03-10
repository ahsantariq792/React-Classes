import { useState } from 'react';
import { ref, storage, uploadBytesResumable, getDownloadURL } from './firebase'





function App() {


  const [image, setImage] = useState(null);

  const [imageurl, setImageurl] = useState('');

  function send() {
    console.log(image)

    //Reference of file upload (path in firebasebucket)
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);


    // const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log("error in uploading image", error)
      },
      () => {
        //Get link of file uploaded on firebase
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setImageurl(() => downloadURL)
          console.log('File available at', downloadURL);

            console.log(imageurl)

        });
      }
    );


  }
  return (
    <>
      <div>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type='submit' onClick={send} >Upload</button>
        <div>
          {(imageurl) ?

            <img src={{ imageurl }} />
            :
            null}
        </div>
      </div>
    </>
  );
}

export default App;
