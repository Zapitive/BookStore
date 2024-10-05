import React,{useState,useEffect} from "react";
import axios from "axios";
import BackButton from "../components/backbutton";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const  DeleteBooks = ()=>{
    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [publishYear,setPublishYear] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const{ id } = useParams()
    const { enqueueSnackbar } = useSnackbar()
    useEffect(()=>{
        setLoading(true)
        axios.get(`http://localhost:5555/books/${id}`)
        .then((res)=>{
            setTitle(res.data.title)
            setAuthor(res.data.author)
            setPublishYear(res.data.publishYear)
            setLoading(false)
        })
        .catch((err)=>{
            setLoading(false)
            console.log(err)
        })
    },[])

    const handleDeleteBook = ()=>{
        
        const data ={
            title,
            author,
            publishYear
        }
        setLoading(true)
        axios.delete(`http://localhost:5555/books/${id}`,data)
        .then(()=>{
            setLoading(false)
            navigate('/')
            enqueueSnackbar('Book Deleted Successfully',{variant:'success'})
            
        })
        .catch((err)=>{
            setLoading(false)
            alert('An error has occured, Please check console')
            console.log(err)
        })
    }
    


    return(
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Create Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Title:</label>
                <label className='border-2 border-gray-500 px-4 py-2 w-full'>{title}</label>
                </div>
                <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Author</label>
                <label className='border-2 border-gray-500 px-4 py-2 w-full'>{author}</label>
                </div>
                <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                <label className='border-2 border-gray-500 px-4 py-2 w-full'>{publishYear}</label>
                </div>
                <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>
                <button className='p-4 bg-red-600 text-white m-8 ' onClick={handleDeleteBook}>
                Yes, Delete it
                </button>
            </div>
    </div>
    )
}

export default DeleteBooks