import {IoGrid} from "react-icons/io5"
import {FaList, FaSearch} from "react-icons/fa"

function HeaderOptions() {
  return (
    <div>
        <nav className="flex justify-end py-4 px-3 text-lg   gap-5  ">
            <FaList/>
            <IoGrid/>
            <FaSearch/>
        </nav>
    </div>
  )
}

export default HeaderOptions