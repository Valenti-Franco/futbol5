import Image from 'next/image'
import UserButton from './components/UserButton'
import Game from './components/game/Game'
import GameTable from './components/game/GameTable'
import Chat from './components/chat/chat'
import GameAll from './components/game/GameAll'
import Loading from './loading'

export default function Home() {
  return (



    <div class="h-full w-full  overflow-y-auto  m-4 flex flex-wrap items-start justify-around  rounded-tl grid-flow-col auto-cols-max gap-4 ">

      {/* <Game /> */}

      <GameAll />

    </div>



  )
}
