import { Link } from "react-router-dom"

export default function NotFound () {
    return <div className="wrapper">
       <h2>Error: 404</h2>
       <h3>Page not found</h3>
       <h3>Click <Link to='/'>here</Link> to return to home.</h3>
    </div>
}