import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import React from 'react'
import { IssueStatusBadge } from './components';
import Link from 'next/link'

const LastestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {createdAt: 'desc'},
    take: 5,
    include: {
        assignedToUser: true
    }
  });

  return (
    <>
    <Heading size='4' mb='5' align='center'>Lastest Issues</Heading>
    <Card>
        <Table.Root>
            <Table.Body>
                {issues.map(issue=> (
                    <Table.Row key={issue.id}>
                        <Table.Cell>
                            <Flex justify='between'>
                                <Flex direction='column' align='start'>
                                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                    <IssueStatusBadge status={issue.status}/>
                                </Flex>
                                {issue.assignedToUserId && (
                                    <Avatar src={issue.assignedToUser?.image!} fallback='?' size='2' radius='full'></Avatar>
                                )}
                            </Flex>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    </Card>
    </>
  )
}

export default LastestIssues