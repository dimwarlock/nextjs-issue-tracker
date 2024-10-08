import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import delay from 'delay'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
import { describe } from 'node:test'

interface Props {
    params: {
        id: string
    }
}

const fetchUser = cache((issueId: number)=> prisma.issue.findUnique({where: {id: issueId}}));

const IssueDetailPage = async ({params}: Props) => {
  const session = await getServerSession(authOptions)

  const issue = await fetchUser(parseInt(params.id));

  if (!issue)
    notFound();

  await delay(2000)
  return (
    <Grid columns={{initial: '1', md: '5'}} gap='5' className='mx-4'>
        <Box className='lg: col-span-4'>
          <IssueDetails issue={issue} />
        </Box>
        {session && 
        <Box>
          <Flex direction='column' gap='3'>
            <AssigneeSelect issue={issue}/>
            <EditIssueButton id={issue.id} />
            <DeleteIssueButton id={issue.id} />
          </Flex>
        </Box>
        } 
    </Grid>
  )
}

export default IssueDetailPage

export async function generateMetadata({params}: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: 'Detalles de Issue: ' + issue?.id
  }
}