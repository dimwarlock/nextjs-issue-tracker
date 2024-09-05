import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import delay from 'delay'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

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
    <Grid columns={{initial: '1', md: '2'}} className='ml-4'>
        <Box>
          <IssueDetails issue={issue}/>
        </Box>
        <Box>
          <EditIssueButton id={issue.id}/>
        </Box>
    </Grid>
  )
}

export default IssueDetailPage