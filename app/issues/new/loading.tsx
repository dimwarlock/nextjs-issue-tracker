import { Button, Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingNewIssuePage = () => {
  return (
    <Box className='max-w-xl ml-4 space-y-2'>
      <form className='space-y-2'>
        <Skeleton />
        <Skeleton height='20rem'/>
        <Button>Añadir Issue</Button>
      </form>
    </Box>
    )
}

export default LoadingNewIssuePage