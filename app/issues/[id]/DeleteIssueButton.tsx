import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'

interface Props {
    id: number;
}

const DeleteIssueButton = ({id}: Props) => {
  return (
    <Button color='red'><TrashIcon /><Link href={`\${id}`}>Delete Issue</Link></Button>
  )
}

export default DeleteIssueButton