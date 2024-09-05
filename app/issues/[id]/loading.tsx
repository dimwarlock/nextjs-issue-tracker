import { Heading, Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = () => {
  return (
    <Box className='ml-4 max-w-xl'>
        <Heading><Skeleton /></Heading>
        <Flex className='space-x-3 my-2'>
            <Skeleton width='2rem' />
            <Skeleton width='8rem' />
        </Flex>
        <Card className='prose mt-3'>
          <Skeleton count={3}/>
        </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage