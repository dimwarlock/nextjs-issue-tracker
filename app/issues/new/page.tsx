'use client'
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import createIssueSchema from '@/app/validationSchema';
import {z} from 'zod'
import ErrorMsg from '@/app/components/ErrorMsg';
import Spinner from '@/app/components/Spinner';

/*
interface IssueForm {
  title: string;
  description: string;
}
*/

type IssueForm = z.infer<typeof createIssueSchema>;

const newIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className='max-w-xl ml-4 space-y-2'>
      {error && <Callout.Root color='red'> <Callout.Text>{error}</Callout.Text> </Callout.Root>}
      <form className='space-y-2'
        onSubmit={handleSubmit(async (data)=> {
          try {
            setIsSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            setIsSubmitting(false)
            setError('Ha ocurrido un error inesperado.')
          }
        })}
      >
          <TextField.Root size="3" color="iris" variant="soft" placeholder="Titulo" {...register('title')} />
          {<ErrorMsg>{errors.title?.message}</ErrorMsg>}
          <Controller 
            name='description'
            control={control}
            render={({field})=> <SimpleMDE placeholder='Descripción' {...field}/>}
          />
          {<ErrorMsg>{errors.description?.message}</ErrorMsg>}
          <Button>Añadir Issue {isSubmitting && <Spinner/>}</Button>
      </form>
    </div>
  )
}

export default newIssuePage