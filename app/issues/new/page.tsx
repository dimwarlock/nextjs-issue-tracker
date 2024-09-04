'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
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
  const [error, setError] = useState('');

  return (
    <div className='max-w-xl ml-4 space-y-2'>
      {error && <Callout.Root color='red'> <Callout.Text>{error}</Callout.Text> </Callout.Root>}
      <form className='space-y-2'
        onSubmit={handleSubmit(async (data)=> {
          try {
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            setError('Ha ocurrido un error inesperado.')
          }
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
    </div>
  )
}

export default newIssuePage