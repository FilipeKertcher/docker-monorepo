import React, { useEffect, useState } from 'react';
import './App.css';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  image: string;
  authorName: string;
}

const PostCard = ({post}: {post: Post}) => {
  return (
    <div key={post.id} style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 20,
      
    }}>
    <img src={post.image} height={200} width={200} alt={'Post'}/>
    <span>{ 
      post.title
    }</span>
    <span>{ 
      post.authorName
    }</span>
  </div>
  )
}
function App() {

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/posts`)

      const posts = await response.json() as Post[]

      setPosts(posts)
    
    }

    fetchData()
  },[])
  return (
    <div className="App">
      <div>app</div>


      <h2>Posts</h2>
      <div >
          {
            posts.map(post => (<PostCard post={post}/>))
          }
      </div>
    </div>
  );
}

export default App;
