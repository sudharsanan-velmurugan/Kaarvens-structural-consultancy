import React,{useState,useEffect} from 'react'
import './Slideshow.css'
const images = [
    '../KaarvenssBGImages/KaarvensBG-1.jpg', 
    '../KaarvenssBGImages/KaarvensBG-2.jpg',
    '../KaarvenssBGImages/KaarvensBG-3.jpg',
    '../KaarvenssBGImages/KaarvensBG-4.jpg',
    '../KaarvenssBGImages/KaarvensBG-5.jpg',
]
const Slideshow = () => {
    const [currentImageIndex,setCurrentImageIndex]=useState(0)

    useEffect(()=>{
        const intervalIndex = setInterval(()=>{
            setCurrentImageIndex(currentIndex => (currentIndex+1)%images.length)
        },5000)
        return ()=>clearInterval(intervalIndex)
    },[])
  return (
    <div className='slideshow'>
        {            
            images.map((image,index)=>{
                <div
                key={index}
                className={`slide ${index===currentImageIndex?'active':''}`}
                style={{ backgroundImage: `url(${image})` }}
                >
                </div>
            })            
        }
    </div>
  )
}

export default Slideshow