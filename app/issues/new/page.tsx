'use client'
import { Button, TextField } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';

interface IssueForm {
  title: string;
  description: string;
}

const newIssuePage = () => {
  const {register, control, handleSubmit} = useForm<IssueForm>();

  return (
    <form 
      className='max-w-xl ml-4 space-y-2' 
      onSubmit={handleSubmit(async (data)=> {
        await axios.post('/api/issues', data)
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