import { Link } from 'react-router-dom'


export default function Header() {
  return (
    <header className='bg-gray-800 text-gray-50 bg-opacity-40 border-2 border-gray-300 backdrop-filter backdrop-blur-sm rounded-lg'>
        <nav className='flex items-center justify-between py-2 px-4 sm:px-10'>
            <Link className='text-xl sm:text-2xl font-bold tracking-wide' to='/'>
                Pixa-IMG
            </Link>
            <div className='flex items-center gap-4 sm:gap-8 font-medium'>
                <Link 
                    className='px-2 sm:px-4 py-1 hover:bg-gray-100 hover:text-gray-600 rounded transition-all' 
                    to='/login'
                    >
                    Login
                </Link>
                <Link 
                    className='px-2 sm:px-4 py-1 border-2 border-gray-200 hover:bg-gray-100 hover:text-gray-600 rounded transition-all' 
                    to='/sign-up'
                    >
                    Create Account
                </Link>
            </div>
        </nav>
    </header>
  )
}
