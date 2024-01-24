'use client'
import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();
    return (
        <form onSubmit={ (e)=> {
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.target.body.value;
            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ title, body })
            }

            fetch(`${process.env.NEXT_PUBLIC_API_URL}topics`, options)
            .then( resp => resp.json() )
            .then( result => {
                router.push( `/read/${result.id}` );
                router.refresh();
            })
        }}>
            <p>
                <input type='text' name='title' placeholder='title' />
            </p>
            <p>
                <textarea name="body" placeholder="body" />
            </p>
            <p>
                <input type="submit" value="create" />
            </p>
        </form>
    )
}