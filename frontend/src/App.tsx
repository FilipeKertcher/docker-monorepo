import React, { useEffect, useState } from 'react';
import './App.css';
import { Card, CardBody,Container,Flex,HStack,Heading,Image,SimpleGrid,Text, VStack } from '@chakra-ui/react';

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

    <Card backgroundColor={'white'} borderRadius={5} padding={8} mt={10} maxWidth={400}>
      <CardBody>
        <VStack justifyContent={'flex-start'} alignItems={"flex-start"}>
          <Image src={post.image} maxHeight={200} style={{width: '100%'}}/>
          <HStack> <Text as='b'> Author Name: </Text><Text>{post.authorName}</Text></HStack>
          <VStack justifyContent={'flex-start'} alignItems={"flex-start"} padding={0}>
          <Text>{post.title}</Text>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
    
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
    <>
     <Flex backgroundColor={'white'} width={'100%'} height={60} margin={0} justifyContent={'center'} alignItems={'center'}>
      <Heading as='h2' size='2xl'>
        Posts
      </Heading>
      </Flex>
      <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} backgroundColor={'#afb3b0'}>
     
      <SimpleGrid columns={3} spacing={15} maxW="container.lg" alignSelf={'center'} backgroundColor={'#afb3b0'}>
          {
            posts.map(post => (<PostCard post={post}/>))
          }
      </SimpleGrid>
    </Flex>
      </>
    
  );
}

export default App;
