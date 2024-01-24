'use client'

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function Update() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();
    const params = useParams();
    useEffect( ()=> {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${params.id}`)
        .then(resp => resp.json())
        .then(result => {
            setTitle(result.title);
            setBody(result.body);
        });
    }, []);

    function formFunc(e) {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({title, body})
        })
        .then(resp => resp.json())
        .then(result => {
            console.log(result);
            router.push(`/read/${result.id}`);
            router.refresh();
        })
    }

    return (
        <form onSubmit={ formFunc }>
            <p>
                <input type="text" name="title" placeholder="title" value={ title }
                onChange={ e => setTitle(e.target.value) } />
            </p>
            <p>
                <textarea name="body" placeholder="body" value={ body }
                onChange={ e => setBody(e.target.value) } />
            </p>
            <p>
                <input type="submit" value="update" />
            </p>
        </form>
    )
}