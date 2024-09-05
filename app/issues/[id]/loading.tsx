import { Heading, Flex, Card, Box, Grid } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import EditIssueButton from './EditIssueButton'
import DeleteIssueButton from './DeleteIssueButton'

const LoadingIssueDetailPage = () => {
  return (
    <Grid columns={{initial: '1', md: '5'}} gap='5' className='mx-4'>
      <Box className='lg: col-span-4'>
        <Heading><Skeleton /></Heading>
        <Flex className='space-x-3 my-2'>
            <Skeleton width='2rem' />
            <Skeleton width='8rem' />
        </Flex>
        <Card className='prose max-w-full'>
          <Skeleton count={3}/>
        </Card>
      </Box>
      <Box>
        <Flex direction='column' gap='3'>
          <EditIssueButton id={0}/>
          <DeleteIssueButton id={0}/>
        </Flex>
      </Box>
    </Grid>
  )
}

export default LoadingIssueDetailPage