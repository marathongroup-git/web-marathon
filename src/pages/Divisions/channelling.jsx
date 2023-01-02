import React from 'react'
import './styles.scss'
import { Swiper, SwiperSlide } from 'swiper/react'

import Title from '../../components/Title'
import Text from '../../components/Text'
import Button from '../../components/Button'

import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'

import map from '../../assets/static/divisions/marathon-soluciones-cable-management-es-MX.png'
import banner from '../../assets/static/divisions/banner.jpg'
import img1 from '../../assets/static/brands/charofil-marathongroup.png'
import img2 from '../../assets/static/brands/igus-marathongroup.png'
import img3 from '../../assets/static/brands/jupiter-marathongroup.png'
import img4 from '../../assets/static/brands/panduit-marathongroup.png'
import img5 from '../../assets/static/brands/tecnotray-marathongroup.png'
import img6 from '../../assets/static/brands/unex-marathongroup.png'

const divisions = () => {
  return (
    <div className="divisionsPage">
      <div
        className="divisionsPage__background"
        style={{
          backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5)
        ), url(${banner})`,
        }}
      >
        <Title className="title --center --white">Canalización</Title>
        <Text className="text --center --white">
          Comercializamos una extensa variedad de soportería los cuales permiten
          el cuidado de los conductores, protegiéndolos de daños mecánicos,
          químicos, altas temperaturas y humedad; así como canalización flexible
          para aplicaciones especiales.
        </Text>
      </div>
      <div className="divisionsPageContainer">
        <Title className="title --center">Aplicaciones</Title>
        <img
          src={map}
          className="divisionsPageContainer__image"
          alt="Cableado eléctrico"
        />
        <Swiper
          className="divisionsPageContainer__slider"
          spaceBetween={20}
          slidesPerView={window.screen.width <= 600 ? 1 : 3}
          slidesPerColumn={1}
          navigation={true}
          loop={true}
        >
          <SwiperSlide className="divisionsPageContainer__item">
            <img src={img1} alt="Logo" />
          </SwiperSlide>
          <SwiperSlide className="divisionsPageContainer__item">
            <img src={img2} alt="Logo" />
          </SwiperSlide>
          <SwiperSlide className="divisionsPageContainer__item">
            <img src={img3} alt="Logo" />
          </SwiperSlide>
          <SwiperSlide className="divisionsPageContainer__item">
            <img src={img4} alt="Logo" />
          </SwiperSlide>
          <SwiperSlide className="divisionsPageContainer__item">
            <img src={img5} alt="Logo" />
          </SwiperSlide>
          <SwiperSlide className="divisionsPageContainer__item">
            <img src={img6} alt="Logo" />
          </SwiperSlide>
        </Swiper>
        <div className="divisionsPageContainer__button">
          <a href="mailto: matriz@marathongroup.mx">
            <Button>Contactanos</Button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default divisions
