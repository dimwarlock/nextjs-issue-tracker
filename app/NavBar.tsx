'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillAppstore } from "react-icons/ai";
import classnames from 'classnames';

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

  const currentPath = usePathname();

  return (
    <nav className='flex space-x-5 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><AiFillAppstore /></Link>
        <ul className='flex space-x-5'>
            {links.map(link => 
                <Link key={link.href}
                    className={classnames({
                      'text-zinc-400': true,
                      'hover:text-zinc-200 transition-colors': link.href !== currentPath,
                      'text-purple-600': link.href === currentPath
                    })}
                    href={link.href}
                >
                {link.label}
                </Link>)}
        </ul>
    </nav>
  )
}

export default NavBar