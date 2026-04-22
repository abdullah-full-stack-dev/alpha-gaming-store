import React, { useEffect, useState } from 'react'
import '../CSS/ScrollBtn.css'

export const ScrollBtn = () => {

    const [visible, setvisible] = useState(false)

    useEffect(() => {

        const visibility = () => {
            if (window.scrollY > 500) {
                setvisible(true)
            }
            else {
                setvisible(false)
            }
        };
        window.addEventListener("scroll", visibility);
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div >
            {visible && (
                <button className="scroll-btn" onClick={scrollUp}>
                    <i className="fa-solid fa-arrow-up"></i>
                </button>
            )}


        </div>
    )
}
