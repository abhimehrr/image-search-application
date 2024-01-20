import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'

// Components
import ImageModal from '../components/ImageModal'
import Loader from '../components/loader/Loader';
import NotFound from './NotFound'


// Secret
import { baseUrl, apiKey } from '../assets/secret'

export default function SearchImage() {
    const { id } = useParams()
    const [image, setImage] = useState(null)
    const [loader, setLoader] = useState(true)
    const [notFound, setNotFound] = useState(false)

    const linkRef = useRef(null)
    const setModal = (e) => linkRef.current.click()

    useEffect(() => {
        fetch(`${baseUrl}?key=${apiKey}&id=${id}`)
        .then(res => res.json())
        .then(res => {
            setImage(res.hits[0])
            setLoader(false)
        }).catch(err => {
            setNotFound(true)
            setLoader(false)
        })
    }, [])

    return (
        <div className='min-h-screen w-full bg-gray-100 grid place-items-center'>
            {loader && <Loader />}
            {notFound && <NotFound classs={''}/>}
            {image && <ImageModal image={image} setModal={setModal} />}
            <Link ref={linkRef} to='/' />
        </div>
    )
}