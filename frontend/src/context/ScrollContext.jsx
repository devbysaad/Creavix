import React, { createContext, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

gsap.registerPlugin(ScrollTrigger)

export const ScrollContext = createContext()

export const ScrollProvider = ({ children }) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!scrollRef.current) return

    const locoScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    })

    locoScroll.on('scroll', ScrollTrigger.update)

    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: scrollRef.current.style.transform ? 'transform' : 'fixed',
    })

    ScrollTrigger.addEventListener('refresh', () => locoScroll.update())
    ScrollTrigger.refresh()

    return () => {
      locoScroll.destroy()
      ScrollTrigger.removeEventListener('refresh', () => locoScroll.update())
    }
  }, [])

  return (
    <ScrollContext.Provider value={{ scrollRef }}>
      <div ref={scrollRef}>{children}</div>
    </ScrollContext.Provider>
  )
}
