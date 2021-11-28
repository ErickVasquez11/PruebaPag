import React from "react"
import { useState } from "react"
import { UilEditAlt } from '@iconscout/react-unicons'
import { UilSmileBeam } from '@iconscout/react-unicons'
import { UilStar } from '@iconscout/react-unicons'
import { UilAndroidPhoneSlash } from '@iconscout/react-unicons'
import { UilCommentAltLines } from '@iconscout/react-unicons'
import { useUserContext } from "../Contexts/Context"
import { useEffect } from "react"
import Services from "../Services/UserServices";
import CommentCardContainer from "./CommentContainer"


export default function Card(props) {

    const { login, token } = useUserContext();

    const [username, setUsername] = useState("");
    const [likes, setLikes] = useState(props.likes.length);
    const [commentState, setCommentState] = useState(props.comments);
    const [showComments, setShowComments] = useState(false);

    const getUsername = async () => {
    const response = await Services.verifyToken(token);
    const username = response.username;
    setUsername(username);
    setCommentState(props.comments);
    console.log(username);
    console.log(commentState);
}

    const [liked, setLiked] = useState(props.likes.some((item) => item.username === username));


    useEffect(() => {
        getUsername();
    }, []);

    async function likePost() {
        await Services.Like(token, props.id);
        if (!liked) {
            setLikes(likes + 1);
            setLiked(true);
        } else {
            setLikes(likes - 1);
            setLiked(false);
        }
    }


    return (
        <>
                <div className="p-4 sm:w-1/2 lg:w-1/3">
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                        <img className="lg:h-72 md:h-48 w-full object-cover object-center"
                            src={props.image} alt="Post img"/>
                        <div className="p-6 transition duration-300 ease-in">
                            <h2 className="text-sm font-medium text-gray-400 mb-1">{new Date(props.createdAt).toLocaleDateString()}</h2>
                            <h1 className="text-2xl font-semibold mb-3">{props.title}</h1>
                            <p className="leading-relaxed mb-3">{props.description}</p>
                            <div className="flex items-center flex-wrap ">
                                <a className="text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0">{props.username}</a>
                                <span className="text-gray-400 cursor-pointer mr-10 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm border-gray-200">
                                    <UilSmileBeam className={`cursor-pointer ${liked && 'text-yellow-400'}`} onClick={likePost}/>{props.likes.length}
                                </span>
                                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                    <UilStar/>
                                </span>
                                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                    <UilAndroidPhoneSlash/>
                                </span>
                                <span className="text-gray-400 inline-flex items-center leading-none text-sm cursor-pointer">
                                    <UilEditAlt/>
                                </span>
                            </div>
                            <div >
                            <h2 className= "text-lg font-semibold text-center text-gray-400 mt-4">Comentarios</h2>
                            {
                                props.comments && commentState.map((item) => {
                                    return <CommentCardContainer key={item.id} username={item.user.username} description={item.description}/>
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )}

