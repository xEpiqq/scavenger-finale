"use client"

import React from 'react'

import YouTube from "react-youtube";

export default function DemoVideo() {
    return (
        <div className="mt-16 flow-root sm:mt-24">
            <div className="relative -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <YouTube
                    videoId="1_8XDaVmhOo"
                    iframeClassName="w-full h-full"
                    className="w-full h-full aspect-video "
                />
            </div>
        </div>
    )
}