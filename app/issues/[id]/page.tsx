import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import delay from 'delay'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'

interface Props {
    params: {
        id: string
    }
}

const IssueDetailPage = async ({params}: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {id: parseInt(params.id)}
  })

  if (!issue)
    notFound();

  await delay(2000)
  return (
    <Grid columns={{initial: '1', md: '5'}} gap='5' className='mx-4'>
        <Box className='lg: col-span-4'>
          <IssueDetails issue={issue} />
        </Box>
        <Box>
          <Flex direction='column' gap='3'>
            <EditIssueButton id={issue.id} />
            <DeleteIssueButton id={issue.id} />
          </Flex>
        </Box>
    </Grid>
  )
}

export default IssueDetailPage