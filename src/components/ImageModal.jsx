import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { saveAs } from 'file-saver'

import Footer from './Footer'

import SocialShare from "./SocialShare";

export default function ImageModal({ image, setModal }) {
  const [imgSize, setImgSize] = useState('previewURL')
  const [downloadSrc, setDownloadSrc] = useState(image.previewURL)

  const getSize = e => {
    var value = e.target.value
    setImgSize(value)
    setDownloadSrc(image[value])
  }

  const handleDownload = () => {
    var filename = image.pageURL.split('/').filter(u=>!u.length<1)
    var mime = downloadSrc.split('.')
    filename = filename[filename.length - 1] + '.' + mime[mime.length-1]
    saveAs(downloadSrc, filename)
  }
  
  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className="hiddens bg-slate-800 bg-opacity-70 overflow-y-auto overflow-x-hidden fixed top-0 left-1/2 -translate-x-1/2 z-50 flex justify-center items-center w-full h-[calc(100%)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-5xl h-full">
        <div className="relative bg-gray-100 rounded-lg shadow">
          <div className="flex items-center justify-between px-4 py-2 md:px-6 md:py-3 bg-gray-300 rounded-t-lg">
            <h3 className="text-xl font-semibold text-gray-800">
              Preview ID: {image.id}
            </h3>
            <div className="flex items-center">
              <SocialShare id={image.id} />
              <button
              onClick={()=>setModal(false)}
                type="button"
                className="text-gray-700 bg-transparent border border-gray-700 hover:bg-gray-100 hover:text-gray-800 rounded-lg text-md w-8 h-8 ms-auto inline-flex justify-center items-center transition-all"
                data-modal-hide="static-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          </div>
          <div className="w-full p-4 md:p-5 flex items-start justify-between max-md:flex-col gap-4">
            <div className="bg-gray-200 w-2/3 sm:h-[400px] h-[350px] max-md:w-full rounded-lg">
              <img
                className="h-full w-full object-contain rounded-lg"
                src={image.webformatURL}
                alt={image.tags}
              />
            </div>
            <div className="w-1/3 max-md:flex max-sm:flex-col gap-3 flex-row-reverse max-md:w-full">
              <div className="mb-4 max-sm:w-full max-md:w-1/2 px-2">
                <h3 className="text-xl tracking-wide text-gray-700 font-medium">
                  Download
                </h3>
                <form onChange={getSize}>
                  <div className="my-2 space-y-2 border border-gray-300 rounded-md overflow-hidden">
                    <div className="flex items-center justify-between px-2 py-2 border-b border-b-gray-300 hover:bg-gray-200 transition-all">
                      <div className="text-lg text-gray-800 tracking-wide">
                        Small
                      </div>
                      <label
                        htmlFor="previewURL"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span className="text-gray-800">{image.previewHeight}x{image.previewWidth}</span>
                        <span className="text-lg cursor-pointer">
                          {imgSize === 'previewURL' ?
                            <i className="fa-solid fa-circle-check text-green-500"></i> :
                            <i className="fa-regular fa-circle text-gray-500"></i>
                          }
                          <input
                            type="radio"
                            id="previewURL"
                            className="hidden"
                            name="img-size"
                            value="previewURL"
                          />
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between px-2 py-2 border-b border-b-gray-300 hover:bg-gray-200 transition-all">
                      <div className="text-lg text-gray-800 tracking-wide">
                        Medium
                      </div>
                      <label
                        htmlFor="webformatURL"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span className="text-gray-800">{image.webformatHeight}x{image.webformatWidth}</span>
                        <span className="text-lg cursor-pointer">
                          {imgSize === 'webformatURL' ?
                            <i className="fa-solid fa-circle-check text-green-500"></i> :
                            <i className="fa-regular fa-circle text-gray-500"></i>
                          }
                          <input
                            type="radio"
                            id="webformatURL"
                            className="hidden"
                            name="img-size"
                            value="webformatURL"
                          />
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between px-2 py-2 border-b border-b-gray-300 hover:bg-gray-200 transition-all">
                      <div className="text-lg text-gray-800 tracking-wide">
                        Original
                      </div>
                      <label
                        htmlFor="largeImageURL"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span className="text-gray-800">{image.imageHeight}x{image.imageWidth}</span>
                        <span className="text-lg cursor-pointer">
                          {imgSize === 'largeImageURL' ?
                            <i className="fa-solid fa-circle-check text-green-500"></i> :
                            <i className="fa-regular fa-circle text-gray-500"></i>
                          }
                          <input
                            type="radio"
                            id="largeImageURL"
                            className="hidden"
                            name="img-size"
                            value="largeImageURL"
                          />
                        </span>
                      </label>
                    </div>
                  </div>
                </form>
                <div className="mt-4 w-full">
                  <button onClick={handleDownload}
                    className="w-full py-2 flex items-center justify-center bg-green-500 hover:bg-green-600 text-gray-100 text-lg font-semibold rounded-lg transition-all"
                    >
                    Download for free!
                  </button>
                </div>
              </div>
              <div className="max-md:w-1/2 max-sm:w-full px-2">
                <h3 className="text-xl tracking-wide text-gray-700 font-medium">
                  Information
                </h3>
                <div className="mt-2 flex flex-wrap gap-5">
                  <div>
                    <p className="text-sm text-gray-700">User</p>
                    <p className="font-medium capitalize text-gray-900">{image.user}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">User ID</p>
                    <p className="font-medium text-gray-900">{image.user_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Type</p>
                    <p className="font-medium capitalize text-gray-900">{image.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Views</p>
                    <p className="font-medium text-gray-900">{image.views}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Downloads</p>
                    <p className="font-medium text-gray-900">{image.downloads}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Likes</p>
                    <p className="font-medium text-gray-900">{image.likes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap px-4 pt-2 pb-5 md:px-6 md:py-3">
            <h3 className="text-xl font-semibold text-gray-800">Tag:</h3>
            {image.tags?.split(',')?.map((tag, i) => (
              <Link 
                  key={tag} 
                  to={`/search?q=${tag.trim().split(' ').join('+')}`}
                  className="px-2 py-0.5 text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded inline-flex justify-center items-center transition-all"
                  >
                  {tag.trim()}
              </Link>
            ))}
          </div>
        </div>
        <Footer classs={'text-gray-100'} />
      </div>
    </div>
  );
}