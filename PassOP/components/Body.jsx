import { useState, useRef, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';

const Body = () => {
    const [input, setinput] = useState({ sitename: '', username: '', password: '' });
    const [passwordArray, setpasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("password");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords));
        }
    }, []);

    const savePassword = useCallback(() => {
        if (input.sitename.length >= 3 && input.username.length >= 3 && input.password.length >= 3) {
            const updatepasswordArray = [...passwordArray, { ...input, id: uuidv4() }];
            setpasswordArray(updatepasswordArray);
            localStorage.setItem("password", JSON.stringify(updatepasswordArray));
            setinput({ sitename: '', username: '', password: '' });
        } else {
            toast.warning('Minimum 3 character Required in each field!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }, [passwordArray, input]);

    function handleChange(e) {
        setinput({ ...input, [e.target.name]: e.target.value });
    }

    const ref = useRef();
    const passwordref = useRef()
    const showPassword = () => {
        // passwordref.current.type = 'password'
        if (ref.current.src.includes("icons/hidden.png")) {
            ref.current.src = "icons/eye.png";
            passwordref.current.type = 'text'
        } else {
            ref.current.src = "icons/hidden.png";
            passwordref.current.type = 'password'
        }
    };
    // Function for Copy Text
    const copyText = (text) => {
        toast.success('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    };
    // Function for Delete Password
    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete?");
        if (confirmed) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
    };
    const handleEdit = (id) => {
        setinput(passwordArray.filter(index => index.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
    }
    return (
        <>
            {/* Use React Toastify Library */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce" />
            {/* Same as */}
            <ToastContainer />
            {/* Background Color */}
            <div className="fixed inset-0 -z-10 max-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="relative left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className='container flex flex-col text-center'>
                <h1 className="logo font-bold text-2xl mt-3 ">
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass<span className='text-green-500'>Op/</span></span>
                    <span className='text-green-500'>&gt;</span>
                </h1>
                <p>Your Own Password Manager</p>
                <form action="">
                    <div className="inputform mt-4 w-full md:w-3/4 m-auto">
                        <div className="webUrl">
                            <input className='w-[90vw]  md:w-[700px] input-css' type="text" placeholder='Enter Website Url' value={input.sitename} name='sitename' onChange={handleChange} />
                        </div>
                        <div className="mt-4 flex gap-2 md:gap-5 justify-center">
                            <input className='w-[50vw] md:w-[540px] input-css' type="text" placeholder='Enter Username' autoComplete="username" value={input.username} name='username' onChange={handleChange} />

                            <div className="relative">
                                <input className="w-[140px] input-css pl-10" autoComplete="current-password" ref={passwordref} type="password" placeholder="Enter Password" value={input.password} name='password' onChange={handleChange} />
                                <span className="absolute inset-y-0 left-[118px] w-[14px] cursor-pointer pt-[2px] flex items-center" onClick={showPassword}>
                                    <img ref={ref} src="icons/hidden.png" alt="eye" />
                                </span>
                            </div>

                        </div>
                    </div>
                </form>
                <div className='btn mt-4 flex justify-center'>
                    <button onClick={savePassword} className='btn-css w-[4.5rem]'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            style={{ width: '18px', marginRight: '5px' }} />
                        <span>Save</span>
                    </button>
                </div>
                <div className="mr-[52vw] mt-3 md:0 font-bold text-2xl">Your Passwords</div>
                {passwordArray.length === 0 && <div className='mt-5 font-bold'>No Passwords to show</div>}
                {passwordArray.length > 0 &&
                    <div className="passwords mt-1 mb-20 w-full ">
                        <table className="table-auto w-full md:w-2/3 m-auto rounded-lg overflow-hidden">
                            <thead className='bg-green-700 w-full md:w-2/3'>
                                <tr>
                                    <th className='text-sm font-normal md:font-semibold text-white '>Site</th>
                                    <th className='text-sm font-normal md:font-semibold text-white '>UserName</th>
                                    <th className='text-sm font-normal md:font-semibold text-white '>Password</th>
                                    <th className='text-sm font-normal md:font-semibold text-white '>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200'>
                                {passwordArray.map((input, id) => {
                                    return <tr key={id}>

                                        <td className='inputbtn-css flex-wrap'>
                                            <div className='flex-css' onClick={() => { copyText(input.sitename); }}>
                                                <a href={`http://${input.sitename}`} target='_blank'>{input.sitename}</a>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ width: '18px' }} // Add margin for spacing between text and icon
                                                />
                                            </div>
                                        </td>
                                        <td className='inputbtn-css flex-wrap'>
                                            <div className='flex-css' onClick={() => { copyText(input.username); }}>
                                                {input.username}
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ width: '18px' }} />
                                            </div>
                                        </td>
                                        <td className='inputbtn-css flex-wrap'>
                                            <div className='flex-css' onClick={() => { copyText(input.password); }}>
                                                {"*".repeat(input.password.length)}
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ width: '18px' }} />
                                            </div>
                                        </td>
                                        <td className='inputbtn-css'>
                                            <span className='Edit Icon' onClick={() => { handleEdit(input.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ width: '18px' }} />
                                            </span>
                                            <span className='DeleteIcon ml-2 md:ml-5' onClick={() => { handleDelete(input.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ width: '18px' }} />
                                            </span>
                                        </td>
                                    </tr>;
                                })}
                            </tbody>
                        </table>
                    </div>}
            </div>
        </>
    );
};
export default Body
