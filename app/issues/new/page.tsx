'use client'
import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const newIssuePage = () => {
  return (
    <div className='max-w-xl ml-4 space-y-2'>
        <TextField.Root size="3" color="iris" variant="soft" placeholder="Titulo" />
        <TextArea size="3" color="iris" variant="soft" placeholder="Descripción" />
        <Button>Añadir Issue</Button>
    </div>
  )
}

export default newIssuePage