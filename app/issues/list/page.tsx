import React from 'react'
import {Table} from '@radix-ui/themes'
import prisma from '@/prisma/client'
import { IssueStatusBadge } from '../../components/IssueStatusBadge'
import delay from 'delay'
import IssueActions from './IssueActions'
import { Link } from '@/app/components/index'
import { Issue, Status } from '@prisma/client'
import NextLink from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'

const IssuesPage = async ({searchParams}: {searchParams: {status: Status, orderBy: keyof Issue}}) => {
  const columns : {label: string, value: keyof Issue, className?: string}[] = [
    {label: 'Issue', value: 'title'},
    {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
    {label:'Created', value:'createdAt', className: 'hidden md:table-cell'}
  ]

  const issues = await prisma.issue.findMany({
    where: {
      status: searchParams.status
    }
  });
 await delay(2000);

  return (
    <div className='ml-4'>
      <IssueActions />

      <Table.Root variant='surface' className='mt-5'>
        <Table.Header>
          <Table.Row>
            {columns.map(column=> (
              <Table.ColumnHeaderCell key={column.value}> 
                <NextLink href={{query: {...searchParams, orderBy: column.value}}}>
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
              </Table.ColumnHeaderCell>
            ))}
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