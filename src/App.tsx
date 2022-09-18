import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import logoImg from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'
import './styles/main.css'

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.css";

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setGames(data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} className="scale-90 mi:scale-100" alt="" />
      <h1 className="text-2xl mi:text-3xl sm:text-4xl lg:text-6xl text-white font-black mt-20 pb-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        freeMode={true}
        breakpoints={{
          420: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          980: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper w-[1344px] z-0"
      >
        {games.map(game => {
          return (
            <SwiperSlide key={game.id} className="flex w-[268px]">
              <GameBanner
                key={game.id}
                bannerUrl={game.bannerUrl} 
                title={game.title} 
                adsCount={game._count.ads} 
              />
            </SwiperSlide>
          )
        })}
        </Swiper>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
