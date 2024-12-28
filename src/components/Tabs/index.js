import '../style.scss'
import Pagination from '../Pagination';
import {useEffect, useState, memo} from 'react'
import AddItem from '../AddItem';
import { FaEye } from "react-icons/fa";
function Tabs(){ 
    //UseState va UseEffect :
    const [data, setData] = useState([]);
    const [tab, setTab]   = useState('products');
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(true);
    //Paginate :
    const [page, setPage] = useState(1);
    const handlePaginate = (p) => {
        setIsLoading(true);
        setPage(p);
    }
    //
    const reloadFun = () => {
        setReload(!reload);
    }
    const handleClick = (e) => {
        setIsLoading(true);
        setTab(e.target.innerText.toLowerCase());
    }
    useEffect(() => {
        const fetchAPI = async (url) => {
            const response = await fetch(url);
            const result = await response.json();
            console.log(result.data);
            setData(result.data);
            setIsLoading(false);
        }
        setTimeout(()=> {
            fetchAPI(`http://localhost:3001/${tab}?_page=${page}&_per_page=20`);
        }, 2000)
    }, [tab, isLoading, page]);
    if(isLoading){
        return(
            <>Loading ...</>
        )
    }
    return(
        <div className='all'>
        <div className="tabs">
            <div className="tabs__item" onClick={handleClick}>
                Products
            </div>
            <div className="tabs__item" onClick={handleClick}>
                Posts
            </div>
            <div className="tabs__item" onClick={handleClick}>
                Users
            </div>
        </div>
        < AddItem tab = {tab} reloadFun = {reloadFun}/>
        <div className='list'>
            {data.length > 0 && data.map((item, _) => {
                if(tab === 'products' &&  item.images?.[0]){
                    return (
                        <>
                        <div className='list__product' key={item.id}>
                            <img src={item.images[0]} alt={item.title} className='list__product-image'/>
                            <p className='list__product-title'>{item.title}</p>
                            <p className='list__product-price'>Price : {item.price}$</p>
                            <p className='list__product-stock'>Stock : {item.stock}</p>
                            <p className='list__product-discount'>-{item.discountPercentage}%</p>
                        </div>

                        </>
                    )
                }else if(tab === 'users'){
                    return (
                        <div key={item.id} className="list__user">
                            <img src={item.image} alt={item.firstName} className="list__user-img" />
                            <p className="list__user-name">
                                Name : {item.firstName} {item.lastName} <br/>
                                Age : {item.age}
                            </p>
                            <p className="list__user-email">Email : {item.email}</p>
                        </div>
                    );
                }else{
                    return(
                        <>
                        <div key={item.id} className="list__post">
                                <div className="list__post-title">
                                    {item.title}
                                </div>
                                <div className="list__post-body">
                                    {item.body}
                                </div>
                                <ul className="list__post-view">
                                    <FaEye className="list__postview-icon" /> {item.views}
                                </ul>
                            </div>
                        </>
                    )
                }
                return null;
            })}
        </div>
        < Pagination tab = {tab} handlePaginate = {handlePaginate}/>
        </div>
    )
}
export default memo(Tabs);