import '../style.scss'
import {useEffect, useState} from 'react'


function Pagination (props){
    const [total, setTotal] = useState(0);
    const limit = 20;
    const handeClick = (e) => {
        props.handlePaginate(e.target.innerText);
    }
    useEffect(() => {
        const fetchAPI = async (url) => {
            const response = await fetch(url);
            const result = await response.json();
            setTotal(result);
        }
        fetchAPI(`http://localhost:3001/total${props.tab}`);
    }, [props.tab])
    
    return (
        <>
        <ul className='pagination'>
            {[...Array(Math.ceil(total / limit))].map((_, index) => (
                <li className='pagination__item' onClick={handeClick}>{index + 1}</li>
            ))}
        </ul>
        </>
    )
}
export default Pagination;