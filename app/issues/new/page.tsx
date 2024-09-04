'use client'
import { Button, TextField } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const newIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<IssueForm>();

  return (
    <form 
      className='max-w-xl ml-4 space-y-2' 
      onSubmit={handleSubmit(async (data)=> {
        await axios.post('/api/issues', data)
        router.push('/issues')
      })}
    >
        <TextField.Root size="3" color="iris" variant="soft" placeholder="Titulo" {...register('title')} />
        <Controller 
          name='description'
          control={control}
          render={({field})=> <SimpleMDE placeholder='Descripción' {...field}/>}
        />
        <Button>Añadir Issue</Button>
    </form>
  )
}

export default newIssuePage