import React from 'react'
import {Table} from '@radix-ui/themes'
import prisma from '@/prisma/client'
import { IssueStatusBadge } from '../components/IssueStatusBadge'
import delay from 'delay'
import IssueActions from './IssueActions'
import {Link } from '@/app/components/index'

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
 await delay(2000);

  return (
    <div className='ml-4'>
      <IssueActions />

      <Table.Root variant='surface' className='mt-5'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className='block md:hidden'>
                <IssueStatusBadge status={issue.status}/>
                <div>
                {issue.createdAt.toDateString()}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status}/></Table.Cell>
            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export const dynamic = 'force-dynamic';
//export const revalidate = 0

export default IssuesPage