import { Link } from "react-router-dom";

export default function NotFound({ classs }) {
  return (
    <div className={`min-h-screen grid place-items-center ${classs} text-3xl sm:text-5xl font-bold`}>
        <div className="text-gray-500">
            <p>Something went wrong!</p>
            <Link className="text-xl flex items-center my-4 gap-3 text-gray-800 hover:text-gray-600" to='/'>
                <i className="fa-solid fa-arrow-left"></i>
                Home
            </Link>
        </div>
    </div>
  )
}