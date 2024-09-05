import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

interface Props {
    params: {
        id: string
    }
}

const EditIssuePage = ({params}: Props) => {
  const issue = prisma.issue.findUnique({
    where: {
        id: parseInt(params.id)      
    }});

  if (!issue)
    notFound()

  return (
    <IssueForm issue={issue} />
  )
}

export default EditIssuePage