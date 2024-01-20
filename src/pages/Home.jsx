import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Components
import Header from "../components/Header";
import Footer from '../components/Footer'

// Secret
import { baseUrl, apiKey } from '../assets/secret'

export default function Home() {
  const [bgImg, setBgImg] = useState('');
  const [trendingTags, setTrendingTags] = useState([])

  const searchRef = useRef(null);
  const searchQueryRef = useRef(null);

  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    if(searchInput.trim().length < 1) return
    setSearchQuery(() => {
        var t = searchInput
        t = t.split(' ').filter(n => n.trim()).join('+')
        return '/search?q=' + t
    })

    setTimeout(() => {
        searchQueryRef.current.click()
    }, 1);
  }

  const handleKeyDown = e => {
    if(e.key === 'Enter') handleSearch()
  }

  useEffect(() => {
    fetch(`${baseUrl}?key=${apiKey}&per_page=100&q=nature`)
    .then(res => res.json())
    .then(res => {
        var tags = res.hits[Math.floor(Math.random() * res.hits.length)].tags + ', ' + res.hits[Math.floor(Math.random() * res.hits.length)].tags
        setTrendingTags(()=>tags.split(','))
        setBgImg(res.hits[Math.floor(Math.random() * res.hits.length)].webformatURL);
    })
  }, [])

  return (
    <div className="relative min-h-screen w-screen">
      <div className="w-full h-full absolute">
        {bgImg &&
            <img
            className="w-full h-full object-cover"
            src={bgImg}
            alt="background-images-nautre"
            />
        }
      </div>
      <div className="w-full h-full absolute bg-slate-800 bg-opacity-40"></div>

      <div className="fixed top-4 w-full px-8 z-50">
        <Header />
      </div>

      <div className="w-full h-screen text-white p-2 sm:p-8 flex flex-col items-center justify-center relative">
        <div className="sm:my-5 sm:text-5xl text-4xl font-bold text-center">
          <h1 className="text-gray-100 tracking-wide">
            Discover over 2,000,000 <br />
            free Stock Images
          </h1>
        </div>
        <div className="px-2 py-1 my-4 bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-md border border-gray-200 rounded-lg">
            <div className="flex items-center justify-center gap-2">
                <label className="text-xl sm:text-2xl px-1 sm:px-2 py-1 text-gray-100 group cursor-pointer rounded" htmlFor="search">
                    <i className="fa-solid fa-search group-hover:scale-110 transition-all"></i>
                </label>
                <input
                    value={searchInput}
                    onKeyDown={handleKeyDown}
                    onChange={e=>setSearchInput(e.target.value)}
                    className="sm:w-[500px] max-sm:w-[300px] font-medium text-xl placeholder:text-gray-100 py-0.5 px-2 outline-none border-l-2 border-white bg-transparent"
                    type="text"
                    name="search-query"
                    id="search"
                    placeholder="Search"
                    ref={searchRef}
                />
                <button onClick={handleSearch} className="py-0.5 px-2 sm:px-4 mr-1 sm:mr-3 outline-none border text-xl font-medium  hover:bg-gray-200 hover:text-gray-700 border-white bg-transparent rounded transition-all">
                    Go
                </button>
                <Link ref={searchQueryRef} className="hidden" to={searchQuery}></Link>
            </div>
        </div>
        <div className="px-4 py-2 my-4 bg-gray-800  bg-opacity-30 backdrop-filter backdrop-blur-sm border border-gray-200 rounded-lg">
            <div className="flex flex-wrap items-center justify-center gap-2 text-lg tracking-wide">
                <h3>Trending:</h3>
                <div className="flex flex-wrap gap-2 text-gray-200">
                    {trendingTags.map((tag, i) => (
                        <Link 
                            key={tag} 
                            to={`/search?q=${tag.trim().split(' ').join('+')}`}
                            className="hover:text-white transition-all"
                            >
                            {tag.trim()}
                            {trendingTags.length - 1 !== i && ','}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        <div className="absolute bottom-0">
          <Footer classs={'text-gray-100'} />
        </div>
      </div>
    </div>
  );
}