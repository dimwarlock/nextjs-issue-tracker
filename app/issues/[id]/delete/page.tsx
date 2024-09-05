import { Issue } from '@prisma/client'
import axios from 'axios'
import router from 'next/router'
import React from 'react'

interface Props {
    issue: Issue
}

const page = ({issue}: Props) => {
    const deletion = async ()=> {
        if (issue)
        await axios.delete('/api/issues/' + issue.id)
        router.push('/issues')
    }

    return (
        <div>page</div>
    )
}

export default page