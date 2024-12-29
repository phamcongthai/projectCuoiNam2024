import '../style.scss'
import Pagination from '../Pagination';
import {useEffect, useState, memo, useRef} from 'react'
import AddItem from '../AddItem';
import { FaEye } from "react-icons/fa";
import Swal from 'sweetalert2';
import EditItem from '../EditItem';
function Tabs(){ 
    //UseState va UseEffect :
    const [data, setData] = useState([]);
    const [tab, setTab]   = useState('products');
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const dataEdit = useRef(null);
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
    const handleShowEdit = (e) => {
        setShowEdit(true);
        dataEdit.current = data.find((item) => item.id == e.target.id);
        console.log(dataEdit.current);
        
    }
    const handleOffEdit = () => {
        setShowEdit(false);
    }
    const handleDelete = async (e) => {

        try {
            const r = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              });
            if(r.isConfirmed){
                const response = await fetch(`http://localhost:3001/${tab}/${e.target.id}`, {
                    method: "DELETE",
                });
                
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                setReload(!reload);
            }  
          } catch (error) {
            console.error("Error:", error);
          }
    }
    //

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
    }, [tab, isLoading, page, reload]);
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
        {showEdit && < EditItem handleOffEdit = {handleOffEdit}  tab = {tab} dataEdit = {dataEdit.current} reloadFun = {reloadFun}/>}
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
                            <button className='list__delete' onClick={handleDelete} id={item.id}>Delete</button>
                            <button className='list__edit' onClick={handleShowEdit} id={item.id}>Edit</button>
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
                            <button className='list__delete' onClick={handleDelete} id={item.id}>Delete</button>
                            <button className='list__edit' onClick={handleShowEdit} id={item.id}>Edit</button>
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
                                <button className='list__delete' onClick={handleDelete} id={item.id}>Delete</button>
                                <button className='list__edit' onClick={handleShowEdit} id={item.id}>Edit</button>
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
export default Tabs;