'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillAppstore } from "react-icons/ai";
import classnames from 'classnames';
import {useSession} from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

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
            {status === 'unauthenticated' && (
              <Link href='/api/auth/signin'>Login</Link>
            )}

            {status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar 
                    src={session.user!.image!} 
                    fallback='?'
                    size='2' 
                    radius='full' 
                    className='cursor-pointer'
                  />
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size='2'>
                     {session.user!.email}
                    </Text>
                  </DropdownMenu.Label>

                  <DropdownMenu.Item>
                    <Link href='/api/auth/signout'>Log Out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar