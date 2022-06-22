import React from 'react';
import { Grid, Item } from 'semantic-ui-react';

import Topics from '../components/Topics';
import firebase from '../utils/firebase';


function Posts()
{
    const [posts,setPosts]=React.useState([]);
    React.useEffect(()=>{
       firebase.firestore().collection("posts").get().then((collectionSnapshot)=>{

        const data=collectionSnapshot.docs.map(docSnapshot =>{
            return docSnapshot.data();
        })
        setPosts(data);
       }) 
    },[])
    return (
    <Grid>
        <Grid.Row>
        <Grid.Column width={3}>
            <Topics/>
        </Grid.Column>
        <Grid.Column width={10}>
            <Item.Group>
            {posts.map((post) =>{
          return(
          <Item>
    <Item.Image src={post.imageUrl}/>
          </Item>
          );
        })}
        </Item.Group>
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
        </Grid.Row>
    </Grid>
    );
}

export default Posts;