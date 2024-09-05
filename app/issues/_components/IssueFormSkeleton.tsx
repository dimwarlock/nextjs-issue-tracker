import { Issue } from '@prisma/client';
import { Box, Button } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {
  issue?: Issue;
}

const IssueFormSkeleton = ({issue}: Props) => {
  return (
    <Box className='max-w-xl ml-4 space-y-2'>
        <form className='space-y-2'>
        <Skeleton height='2rem'/>
        <Skeleton height='23rem' className='mb-11'/>
        <Button>{issue? 'Update Issue' : 'Add new Issue'}</Button>
        </form>
    </Box>
  )
}

export default IssueFormSkeleton