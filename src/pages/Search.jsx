import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'

// Actions
import { setImages } from '../store/reducers/pixbayAPI'

// Componensts
import Header from '../components/Header'
import Footer from '../components/Footer'
import ImageContainer from '../components/ImageContainer';
import ImageModal from '../components/ImageModal';
import Loader from '../components/loader/Loader'

// Secret
import { baseUrl, apiKey } from '../assets/secret'

export default function Search() {
    const dispatch = useDispatch()
    
    const [bgImg, setBgImg] = useState('https://pixabay.com/get/g9df1df93200359dab885239ba4434902381dbef8900e8dd459965213b06443ad15b8408bd916b8c5f9880ff37c4094c24c5274825c15479020d0a7b0d9fb7fdd_640.jpg');
    const [trendingTags, setTrendingTags] = useState([])
    const [loader, setLoader] = useState(true)

    const [imageData, setImageData] = useState(null)
    const [showImageModal, setShowImageModal] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const queryParam = searchParams.get('q')

    const searchRef = useRef(null)

    const [searchInput, setSearchInput] = useState(queryParam || '')

    const handleSearch = () => {
        if(searchInput.trim().length < 1) return

        var q = searchInput
        q= q.split(' ').filter(n => n.trim()).join('+')
        setSearchParams(`q=${q}`)
        fetchImages(q)
    }
    
    const fetchImages = async q => {
        setLoader(true)
        
        var res = await fetch(`${baseUrl}?key=${apiKey}&per_page=40&q=${q}`)
        res = await res.json()
        
        var tags = res.hits[Math.floor(Math.random() * res.hits.length)].tags + ', ' + res.hits[Math.floor(Math.random() * res.hits.length)].tags
        
        dispatch(setImages(res.hits))
        setTrendingTags(()=>tags.split(','))
        setBgImg(res.hits[Math.floor(Math.random() * res.hits.length)].webformatURL);
        
        window.scrollTo({top: 0, behavior: 'smooth'})
        setLoader(false)
    }
    
    const handleKeyDown = e => {
        if(e.key === 'Enter') handleSearch()
    }

    useEffect(() => {
        setShowImageModal(false)
        setSearchInput(queryParam || '')
        fetchImages(queryParam) 
    }, [queryParam])

    return (
        <div className="relative min-h-screen w-screen">
            <div className="w-full h-[300px] absolute">
                <img
                    className="w-full h-full object-cover"
                    src={bgImg}
                    alt="background-images-nautre"
                />
            </div>
            <div className="w-full h-[300px] absolute bg-slate-800 bg-opacity-40"></div>

            <div className="w-full p-8 z-50">
                <Header />
            </div>

            <div className="flex justify-center items-center flex-col text-gray-100">
                <div className="flex items-center justify-center gap-2 px-2 py-1 my-4 bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-md border border-gray-200 rounded-lg">
                    <label className="text-xl sm:text-2xl px-2 py-1 text-gray-100 group cursor-pointer rounded" htmlFor="search">
                        <i className="fa-solid fa-search group-hover:scale-110 transition-all"></i>
                    </label>
                    <input
                        value={searchInput}
                        onKeyDown={handleKeyDown}
                        onChange={e=>setSearchInput(e.target.value)}
                        className="sm:w-[400px] max-sm:w-[250px] font-medium text-xl placeholder:text-gray-100 py-0.5 px-2 outline-none border-l-2 border-white bg-transparent"
                        type="text"
                        name="search-query"
                        id="search"
                        placeholder="Search"
                        ref={searchRef}
                    />
                    <button onClick={handleSearch} className="py-0.5 px-2 sm:px-4 mr-1 sm:mr-3 outline-none border text-xl font-medium  hover:bg-gray-200 hover:text-gray-700 border-white bg-transparent rounded transition-all">
                        Go
                    </button>
                </div>
                <div className="relative my-5 sm:text-3xl text-2xl font-medium text-center">
                    <h1 className="text-gray-100 tracking-wide">
                        Results: {queryParam?.split('+').join(' ')}
                    </h1>
                </div>
            </div>
            <div className="w-full text-gray-800 bg-gray-200 px-8 py-4 flex flex-wrap gap-2 justify-center relative">
                {trendingTags?.map((tag, i) => (
                    <Link 
                        key={i}
                        to={`?q=${tag.trim().split(' ').join('+')}`}
                        className='px-6 py-1 border border-gray-600 hover:bg-gray-300 rounded transition-all'
                        >
                        {tag.trim()}
                    </Link>
                ))}
            </div>

            <div className="w-full text-gray-800 px-8 py-4 relative">
                {loader ? <Loader /> : 
                    <ImageContainer setImage={setImageData} setModal={setShowImageModal} /> 
                }
            </div>
            {showImageModal && <ImageModal image={imageData} setModal={setShowImageModal} />}
            <Footer classs={'text-gray-800'} />
        </div>
    )
}