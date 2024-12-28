import '../style.scss';
import { useState } from 'react';
import Swal from 'sweetalert2';
function AddItem(props) {
    const [showModal, setShowModal] = useState(false);

    const handClickShow = () => {
        setShowModal(true);
    };

    const handClickOff = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn form reload trang
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries()); // Chuyển FormData thành object
        let url = '';

        if (props.tab === 'products') {
            url = 'http://localhost:3001/products';

            // Đảm bảo thuộc tính images là một mảng chứa một phần tử
            if (data.images) {
                data.images = [data.images]; // Chuyển giá trị thành mảng
            }
        } else if (props.tab === 'users') {
            url = 'http://localhost:3001/users';
        } else if (props.tab === 'posts') {
            url = 'http://localhost:3001/posts';
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Bạn đã thêm sản phẩm thành công !",
                    icon: "success",
                    draggable: true
                  });
                setShowModal(false);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });
            }
        } catch (error) {
            console.error('Lỗi:', error);
            alert('Đã xảy ra lỗi trong quá trình gửi dữ liệu.');
        }
    };

    return (
        <>
            <button onClick={handClickShow}>
                {props.tab === 'products' && "+Thêm sản phẩm"}
                {props.tab === 'users' && "+Thêm người dùng"}
                {props.tab === 'posts' && "+Thêm bài viết"}
            </button>

            {showModal && (
                <div className='wrap'>
                    <div className="modal">
                        {props.tab === 'products' && (
                            <form onSubmit={handleSubmit}>
                                <div className="form__group">
                                    <label htmlFor="title" className="form__label">Title : </label>
                                    <input type="text" id="title" name="title" className="form__input" />
                                </div>
                                <div className="form__group">
                                    <label htmlFor="price" className="form__label">Price : </label>
                                    <input type="number" id="price" name="price" className="form__input" />
                                </div>
                                <div className="form__group">
                                    <label htmlFor="stock" className="form__label">Stock : </label>
                                    <input type="number" id="stock" name="stock" className="form__input" />
                                </div>
                                <div className="form__group">
                                    <label htmlFor="discount" className="form__label">Discount Percentage : </label>
                                    <input type="number" id="discountPercentage" name="discountPercentage" className="form__input" />
                                </div>
                                <div className="form__group">
                                    <label htmlFor="images" className="form__label">Image URL : </label>
                                    <input type="url" id="images" name="images" className="form__input" placeholder="e.g., https://img1.com" />
                                </div>
                                <button className='form__button-submit'>Save</button>
                            </form>
                        )}

                        {props.tab === 'users' && (
                            <form onSubmit={handleSubmit}>
                                <div className="form__group">
                                    <label htmlFor="firstName" className="form__label">First Name : </label>
                                    <input type="text" id="firstName" name="firstName" className="form__input" />
                                </div>
                                <div className="form__group">
                                    <label htmlFor="lastName" className="form__label">Last Name : </label>
                                    <input type="text" id="lastName" name="lastName" className="form__input" />
                                </div>
                                <div className="form__group">
                                    <label htmlFor="age" className="form__label">Age : </label>
                                    <input type="number" id="age" name="age" className="form__input" />
                                </div>
                                <div className="form__group">
                                    <label htmlFor="email" className="form__label">Email : </label>
                                    <input type="email" id="email" name="email" className="form__input" />
                                </div>
                                <div className="form__group">
                                    <label htmlFor="image" className="form__label">Image URL : </label>
                                    <input type="url" id="image" name="image" className="form__input" />
                                </div>
                                <button className='form__button-submit'>Save</button>
                            </form>
                        )}

                        {props.tab === 'posts' && (
                            <form onSubmit={handleSubmit}>
                                <div className="form__group">
                                    <label htmlFor="title" className="form__label">Post Title : </label>
                                    <input type="text" id="title" name="title" className="form__input" />
                                </div>
                                <div className="form__group">
                                    <label htmlFor="body" className="form__label">Post Body : </label>
                                    <textarea id="body" name="body" rows="4" className="form__input"></textarea>
                                </div>
                                <div className="form__group">
                                    <label htmlFor="views" className="form__label">Views : </label>
                                    <input type="number" id="views" name="views" className="form__input" />
                                </div>
                                <button className='form__button-submit'>Save</button>
                            </form>
                        )}
                        <button className='exit' onClick={handClickOff}>Exit</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddItem;
