import React, { useState, useEffect } from 'react'

export function ClickButton(props) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `${count} clicks!`
    })

    return (
        <div>
            <p>You clicked {count} times </p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    )
}

