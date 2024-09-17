
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/dashboard/Index';
import { useNavigate, useLocation } from 'react-router-dom';
import { buildAIURL } from '../../Utils/URLs/api.env';
import axios from 'axios';


function BuildBot() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;


    const [messages, setMessages] = useState<any>([]);
    const [inputText, setInputText] = useState<any>("");
    const [showResponse, setShowResponse] = useState<any>(null);
    const [botReply, setBotReply] = useState<any>("");

    const handleMessageSubmit = () => {
        setShowResponse(true);
        if (inputText.trim() === "") return;
        const newMessage = {
            id: messages.length + 1,
            text: inputText,
            isUser: true
        };
        if(botReply === undefined){
            const botResponse = {
                id: messages.length + 2,
                question: newMessage?.text,
                text: "Sorry...i don't understand your request at this time!",
                isUser: false
            };
            setTimeout(() => {
                setShowResponse(false);
                setMessages([...messages, botReply]);
            }, 1000);
            setInputText("");
            
        }else{
            const body = JSON.stringify({messageContent: inputText});
            const headers = {'Content-Type': 'application/json', 'method': 'POST'}
            axios.post(`${buildAIURL}/buildbank-ai/v1/customer-chatbot`, body, {headers}).then((response:any) => {
                // console.log("response>>", response?.data?.choices[0]?.message?.content);
                setBotReply(response?.data?.choices[0]?.message?.content);
                const botResponse = {
                    id: messages.length + 2,
                    question: newMessage?.text,
                    text: response?.data?.choices[0]?.message?.content,
                    isUser: false
                };
                setTimeout(() => {
                    setShowResponse(false);
                    setMessages([...messages, botResponse]);
                }, 1000);
                setInputText("");
            }).catch((err:any) => {
                console.error("err>>", err);
            });
        }
     
    };

    useEffect(() => {
        if(localStorage.getItem('merchantDetails') !== null){
            let getMerchatDetails: any = localStorage.getItem('merchantDetails');
            let parseData = JSON.parse(getMerchatDetails);
            // console.log('data>>>', parseData);
        }
    }, [])

    return (
        <DashboardLayout>
            <p onClick={() => {
                window?.history?.go(-1);
                localStorage.removeItem('loans');
            }} className="cursor-pointer grid gap-[20px] text-[16px] font-sfpro-medium mt-[20px]">
                ⬅ &nbsp; Build Generative AI platform
            </p>
            <br /><br />

            <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg md:w-1/2 mb-[40px]">
                <h1>Welcome to Build Bank AI Chatbot</h1>
                <br />
                <div className="flex flex-col justify-between p-4">
                    {
                        showResponse === true ?
                        <div className="rounded-lg p-4 max-w-xs bg-gray-200 text-gray-700">...loading</div>
                        :
                        <div className="flex flex-col space-y-2">
                        {messages.map((message: any) => (
                            <>
                                <div
                                    key={message.id}
                                    className={"rounded-lg p-4 max-w-xs bg-gray-200 text-gray-700"}
                                >
                                    {
                                        <span className='bg-gray-200 text-gray-700'>
                                            { message.text}
                                        </span>
                                    }
                                </div>
                            </>
                        ))}
                    </div>
                    }
                  
                </div>
                <div className="p-4">
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Type a message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") handleMessageSubmit();
                        }}
                    />
                    <button
                        className="mt-2 px-4 py-2 bg-[#071B7B] text-white rounded-md"
                        onClick={handleMessageSubmit}
                    >
                        Send
                    </button>
                </div>

            </div>




        </DashboardLayout>

    )
}

export default BuildBot