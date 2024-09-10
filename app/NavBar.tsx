'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillAppstore } from "react-icons/ai";
import classnames from 'classnames';
import {useSession} from 'next-auth/react'
import { Box, Container, Flex } from '@radix-ui/themes';

const NavBar = () => {
  const {status, data: session} = useSession();

  const links = [
    {
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        label: 'Issues',
        href: '/issues/list'
    },
  ]

  const currentPath = usePathname();

  return (
    <nav className='border-b mb-5 px-5 py-3 h-14'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'><AiFillAppstore /></Link>
            <ul className='flex space-x-5'>
              {links.map(link => 
                  <li key={link.href}>
                    <Link className={classnames({
                        'text-black': link.href === currentPath,
                        'text-zinc-500 hover:text-black transition-colors': link.href !== currentPath
                      })}
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                )}
            </ul>
          </Flex>

          <Box>
            {status === 'unauthenticated' && <Link href='/api/auth/signin'>Login</Link>}
            {status === 'authenticated' && <Link href='/api/auth/signout'>Log Out</Link>}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar