import { Container , Header , Form ,Image ,Button} from 'semantic-ui-react';
import React from 'react';
import 'firebase/firestore';
import firebase from "../utils/firebase";
import 'firebase/storage';
import {useHistory} from 'react-router-dom';
function NewPost(){
    const history=useHistory();
    const [title,setTitle]=React.useState('');
    const [content,setContent]=React.useState('');
    const [topics,setTopics]=React.useState([]);
    const [topicsName,setTopicsName]=React.useState('');
    const [file,setFile]=React.useState(null);
    const[isLoading,setIsLoading]= React.useState(false);
    React.useEffect(() => {
        firebase
            .firestore()
            .collection('topics')
            .get()
            .then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map((doc) => {
                    return doc.data();
                });
                setTopics(data);
            });
    }, []);
    const options = topics.map(topic =>{
        return {
            text:topic.name,
            value:topic.name,
        };
    });
    const preview =file ? URL.createObjectURL(file) : 'https://pic.pimg.tw/erikasky/1623678658-4086168600-g.png';
function onSubmit(){
    setIsLoading(true);
    const documentRef=firebase.firestore().collection('posts').doc();
    const fileRef=firebase.storage().ref('post-images/'+documentRef.id);
    const metadata={
    contentType:file.type
    };
    fileRef.put(file,metadata).then(()=>
   {
    fileRef.getDownloadURL().then((imageUrl)=>
    {
        documentRef
        .set({
            title,
            content,
            topic : topicsName,
            createAt: firebase.firestore.Timestamp.now(),
            auther:{
              displayName:firebase.auth().currentUser.displayName || '',
              photoURL:firebase.auth().currentUser.photoURL || '',
              uid:firebase.auth().currentUser.uid ,
              email:firebase.auth().currentUser.email ,
          },
          imageUrl,
          })
          .then(()=>{
              setIsLoading(false);
              history.push('/');
          });
    });

   });
}
    return <Container>
        <Header>發表文章</Header>
    <Form onSubmit={onSubmit}>
        <Image src={preview}
        size='small'
        floated='left'
        />
        <Button basic as="label" htmlFor="post-image"
        >上傳文章圖片</Button>
        <Form.Input type='file' id="post-image" style={{display:"none" }}
        onChange={(e)=>setFile(e.target.files[0])}
        />
        <Form.Input 
        placeholder="輸入文章標題" 
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
        <Form.TextArea
        placeholder="輸入文章內容" 
        value={content}
        onChange={(t)=>setContent(t.target.value)}
        />
        <Form.Dropdown 
        placeholder="選擇文章主題" 
        options={options}
        selection
        value={topicsName}
        onChange={(o, { value })=>setTopicsName(value)}//e

        />
        <Form.Button loading={isLoading}
        >送出</Form.Button>
    </Form>
    </Container>;
    //return "123";
}
export default NewPost;