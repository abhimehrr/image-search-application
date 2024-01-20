import { Link } from 'react-router-dom'

export default function Footer({ classs }) {
    return (
        <div className={`flex items-center justify-center max-sm:flex-col gap-1 sm:gap-4 py-4 text-lg ${classs}`}>
          <div className="flex items-center justify-center gap-2">
            Made with <span className="text-red-500 text-2xl">♥</span> by 
            <Link className="text-pink-400 font-medium hover:text-pink-500 transition-all" target="_blank" to='https://a.shre.in'>
              Abhishek
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 sm:border-l-2 sm:border-gray-400 sm:pl-3">
            Picture factory -
            <Link className="text-green-400 font-medium hover:text-green-500 transition-all" target="_blank" to='https://pixabay.com/'>
              Pixabay
            </Link>
          </div>
        </div>
    )
}