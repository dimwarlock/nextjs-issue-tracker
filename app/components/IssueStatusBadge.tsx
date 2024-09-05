import { Status } from '@prisma/client'
import { Badge, Flex } from '@radix-ui/themes'
import React from 'react'

interface Props {
    status: Status;
}

const statusMap: Record<Status, {label: string, color: 'red' | 'blue' | 'violet'}> = {
    OPEN: {label: 'Open', color: 'red'},
    IN_PROGRESS: {label: 'In progress', color: 'violet'},
    CLOSED: {label: 'Closed', color:'blue'}
}

export const IssueStatusBadge = ({status}: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}
