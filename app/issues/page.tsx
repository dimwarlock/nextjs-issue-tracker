import React from 'react'
import {Button} from '@radix-ui/themes'
import Link from 'next/link'

const IssuesPage = () => {
  return (
    <div className='ml-4'>
      <Button><Link href='/issues/new'>Nueva Issue</Link></Button>
    </div>
  )
}

export default IssuesPage