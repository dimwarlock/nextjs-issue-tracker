import React from 'react'
import prisma from '@/prisma/client'
import IssueActions from './IssueActions'
import { Status } from '@prisma/client'
import Pagination from '@/app/components/Pagination'
import IssueTable, { IssueQuery } from './IssueTable'
import { columnNames } from './IssueTable'
import { Flex } from '@radix-ui/themes'
//import delay from 'delay'

const IssuesPage = async ({searchParams}: {searchParams: IssueQuery}) => {


  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)? searchParams.status : undefined;
  const where = {status};

  const orderBy = columnNames.includes(searchParams.orderBy)? {[searchParams.orderBy]: 'asc'} : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1)*pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({where})
  
  // await delay(2000);

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues}/>
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </Flex>
  )
}

export const dynamic = 'force-dynamic';
//export const revalidate = 0

export default IssuesPage