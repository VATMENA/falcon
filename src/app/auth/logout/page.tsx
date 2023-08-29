"use client";

import React, { useEffect } from 'react'
import "./logout.css"

function Logout({ redirect }: { redirect?: string }) {

    // redirect should be formatted like: "/this"

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetch(`/api/logout`, { method: "POST", signal }).then(() => {
            return window.location.href = redirect || "/"
        }).catch(() => {
            console.error("Could not logout.")
        });

        // cleanup
        return (() => {
            controller.abort();
        })
    }, [])

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="loader"></div>
        </div>
    )
}

export default Logout