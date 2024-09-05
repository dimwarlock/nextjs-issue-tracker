'use-client'
import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'

interface Props {
    id: number;
}

const DeleteIssueButton = ({id}: Props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'><TrashIcon /><Link href={`\${id}`}>Delete Issue</Link></Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>
          Confirm Deletion
        </AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to confirm this deletion? This action cannot be undone.
        </AlertDialog.Description>
        <Flex mt='4' gap='3'>
          <AlertDialog.Cancel>
            <Button variant='soft'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color='red'>Delete Issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton