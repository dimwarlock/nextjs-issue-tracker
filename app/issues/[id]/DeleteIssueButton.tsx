'use client';
import { Spinner } from '@/app/components';
import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface Props {
    id: number;
}

const DeleteIssueButton = ({id}: Props) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const Deletion = async ()=> {
    try {
      //throw new Error()
      setIsDeleting(true)
      await axios.delete('/api/issues/' + id); 
      router.push('/issues/list');
      router.refresh()
    } catch (error) {
      setError(true)
    }
  }
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled={isDeleting}><TrashIcon />Delete Issue {isDeleting && <Spinner />}</Button>
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
              <Button color='red' onClick={Deletion}>Delete Issue</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This Issue cannot be deleted.
          </AlertDialog.Description>
          <Button variant='soft' mt='2' onClick={()=> setError(false)}>OK</Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton