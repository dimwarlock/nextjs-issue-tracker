'use client'
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import createIssueSchema from '@/app/validationSchema';
import {z} from 'zod'
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {ErrorMsg, Spinner} from '@/app/components/index'
import { Issue } from '@prisma/client';

/*
interface IssueFormData {
  title: string;
  description: string;
}
*/

const SimpleMDE = dynamic(
  ()=> import("react-simplemde-editor"),
  {ssr: false, loading: () => <Skeleton height="20rem" />}
)

type IssueFormData = z.infer<typeof createIssueSchema>;

interface Props {
  issue?: Issue;
}

const IssueForm = ({issue}: Props) => {
  const router = useRouter();
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data)=> {
    try {
      setIsSubmitting(true)
      await axios.post('/api/issues', data)
      router.push('/issues')
    } catch (error) {
      setIsSubmitting(false)
      setError('Ha ocurrido un error inesperado.')
    }
  })

  return (
    <div className='max-w-xl ml-4 space-y-2'>
      {error && <Callout.Root color='red'> <Callout.Text>{error}</Callout.Text> </Callout.Root>}
      <form className='space-y-2' onSubmit={onSubmit}>
          <TextField.Root size="3" color="iris" variant="soft" placeholder="Titulo" {...register('title')} defaultValue={issue?.title}/>
          {<ErrorMsg>{errors.title?.message}</ErrorMsg>}
          <Controller 
            name='description'
            control={control}
            render={({field})=> <SimpleMDE placeholder='Descripción' {...field}/>}
            defaultValue={issue?.description}
          />
          {<ErrorMsg>{errors.description?.message}</ErrorMsg>}
          <Button>Añadir Issue {isSubmitting && <Spinner/>}</Button>
      </form>
    </div>
  )
}

export default IssueForm