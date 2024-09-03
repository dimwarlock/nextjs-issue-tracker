import Link from 'next/link'
import React from 'react'
import { AiFillAppstore } from "react-icons/ai";

const NavBar = () => {
  const links = [
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'Issues',
        href: '/issues'
    },
  ]

  return (
    <nav className='flex space-x-5 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><AiFillAppstore /></Link>
        <ul className='flex space-x-5'>
            {links.map(link => 
                <Link key={link.href}
                    className='text-zinc-400 hover:text-zinc-200 transition-colors'
                    href={link.href}
                >
                {link.label}
                </Link>)}
        </ul>
    </nav>
  )
}

export default NavBar