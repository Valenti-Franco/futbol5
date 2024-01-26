import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './Providers'
import Chat from './components/chat/chat'
import UserButton from './components/UserButton'
import Link from 'next/link'
import BtnDarkMode from './components/BtnDarkMode'
import { Avatar, Button, Tooltip } from '@nextui-org/react'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Futbol 5 Pa',
  description: 'Unite y Jugá un Partido de Futbol',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">


      <body className={inter.className}><Providers>
        <div className="h-screen w-full  relative flex overflow-hidden">


          <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">

            {/* <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
            </div> */}

            <Tooltip
              showArrow
              placement="right"
              content="Ver Todo"
              classNames={{
                base: [
                  // arrow color
                  "before:bg-neutral-400 dark:before:bg-white",
                ],
                content: [
                  "py-2 px-4 shadow-xl",
                  "text-black bg-gradient-to-br from-white to-neutral-400",
                ],
              }}
            >

              <Link href="/" className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear ">
                <svg
                  className="h-10 w-10 p-2"

                  viewBox="0 0 20 20" fill="currentColor" version="1.1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M249.754,198.772c-25.564,0-46.736,18.908-50.416,43.464h100.828C296.482,217.68,275.314,198.772,249.754,198.772z"></path> </g> </g> <g> <g> <path d="M385.126,0.004h-53.032V66.42c0,4.316-4,7.816-8.32,7.816h-22.208c-8.448,21.28-28.728,35.276-51.832,35.276 c-23.096,0-43.376-13.996-51.828-35.276h-22.224c-4.308,0-7.684-3.5-7.684-7.816V0h-53.404c-18.12,0-32.548,14.836-32.548,32.948 v209.288h101.496c3.776-33.204,32.012-59.092,66.212-59.092s62.432,25.888,66.208,59.092h102.084V32.948 C418.046,14.836,403.242,0.004,385.126,0.004z"></path> </g> </g> <g> <g> <path d="M215.266,74.236c7.14,12.044,20.044,19.648,34.468,19.648c14.424,0,27.336-7.604,34.476-19.648H215.266z"></path> </g> </g> <g> <g> <rect x="183.646" width="132.84" height="58.604"></rect> </g> </g> <g> <g> <path d="M199.41,257.86c3.876,24.328,24.944,42.996,50.344,42.996c25.396,0,46.464-18.668,50.34-42.996H199.41z"></path> </g> </g> <g> <g> <path d="M315.89,257.86c-3.992,32.976-32.1,58.624-66.136,58.624c-34.04,0-62.144-25.652-66.14-58.624H82.046v209.288 c0,18.112,14.428,32.944,32.548,32.944h53.408v-66.416c0-4.316,3.376-7.816,7.684-7.816h22.216 c8.448-21.28,28.732-35.276,51.828-35.276c23.1,0,43.384,13.996,51.828,35.276h22.22c4.32,0,8.32,3.5,8.32,7.816v66.416h53.028 c18.116,0,32.92-14.832,32.92-32.944V257.86H315.89z"></path> </g> </g> <g> <g> <path d="M249.726,406.212c-14.42,0-27.324,7.604-34.468,19.648h68.94C277.058,413.816,264.15,406.212,249.726,406.212z"></path> </g> </g> <g> <g> <rect x="183.646" y="441.488" width="132.84" height="58.604"></rect> </g> </g> </g></svg>
              </Link>
            </Tooltip>


            <Tooltip
              showArrow
              placement="right"
              content="Modo Oscuro"
              classNames={{
                base: [
                  // arrow color
                  "before:bg-neutral-400 dark:before:bg-white",
                ],
                content: [
                  "py-2 px-4 shadow-xl",
                  "text-black bg-gradient-to-br from-white to-neutral-400",
                ],
              }}
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear ">

                <BtnDarkMode />

              </div>
            </Tooltip>


            <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </aside>



          <div className="w-full h-full flex flex-col justify-between">

            <header className="h-16 w-full flex items-center relative justify-between px-5 space-x-10 bg-gray-800">
              <Link href={"/"}>
                <Avatar isBordered color="warning" src="/logo1.png" />

              </Link>

              <div className="flex flex-shrink-0 items-center space-x-4 text-white">

                <UserButton />
              </div>
            </header>


            <main className="max-w-full h-full flex relative overflow-y-hidden">

              <div className="h-full w-full xl:m-4 flex flex-wrap items-start justify-around  rounded-tl grid-flow-col auto-cols-max gap-4 ">

                {/* <Game /> */}

                {children}

              </div>
              <div className='flex w-0 xl:w-2/5 absolute xl:sticky h-screen  xl:mt-10  top-0 flex-col' >
                {/* <GameTable /> */}
                <Chat />
              </div>
            </main>
          </div>

        </div>

      </Providers> </body>

    </html>
  )
}
