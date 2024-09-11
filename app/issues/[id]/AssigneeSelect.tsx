'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import toast, {Toaster} from 'react-hot-toast'

interface Props {
  issue: Issue;
}

const AssigneeSelect = ({issue}: Props) => {
  const {data: users, error, isLoading} = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: ()=> axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3
  });

  if (isLoading)
    return <Skeleton />

  if (error)
    return null;

  const assignIssue = (userId: String)=> {
    axios.patch('/api/issues/' + issue.id, {assignedToUserId: userId || null}).catch(()=> {toast.error('Changes not saved')});
  }

  return (
    <>
    <Select.Root onValueChange={assignIssue}>
        <Select.Trigger />
        <Select.Content>
            <Select.Group>
                <Select.Label>
                    Suggestions
                </Select.Label>

                <Select.Item value="">
                  Unasiggned
                </Select.Item>

                {users?.map(user=> <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
            </Select.Group>
        </Select.Content>
    </Select.Root>

    <Toaster />
    </>
  )
}

export default AssigneeSelect