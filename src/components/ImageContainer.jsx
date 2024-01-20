import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function ImageContainer({ setImage, setModal }) {
    const { images } = useSelector(s=>s.pixabayAPI)

    const setImageData = id => {
        setImage(images.filter(i=>i.id===id)[0])
        setModal(true)
    }

    return (
        <div className='min-h-screen w-full mx-auto pb-10 columns-1 sm:columns-2 md:columns-4 space-y-3 gap-3'>
            {images?.map(img => (
                <div key={img.id}>
                    <img 
                        onClick={()=>setImageData(img.id)}
                        className="h-full -w-full object-cover rounded-lg cursor-pointer" 
                        src={img.webformatURL} alt={img.tags} 
                    />
                    <div className='px-2 flex flex-wrap gap-x-3'>
                        {img.tags?.split(',')?.map((t, i) => (
                            <Link 
                                key={i} 
                                className='odd:text-pink-600 odd:hover:text-gray-800 hover:text-pink-600 transition-all'
                                to={`?q=${t.trim().split(' ').join('+')}`}
                                >{t.trim()}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}