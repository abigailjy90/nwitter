import React, { useState } from "react";
import { dbService } from "fbase";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false); //edit모드인지 아닌지 알려주는 부분
    const [newNweet, setNewNweet] = useState(nweetObj.text); //input에 입력된 text 업데이트
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log(ok)
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(nweetObj, newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    };
    return (
        <div>
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input
                                type="text"
                                placeholder="Edit yout nweet"
                                value={newNweet}
                                required
                                onChange={onChange}
                            />
                            <input type="submit" value="Update Nweet"></input>
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                ) : (<><h4>{nweetObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}</>)
            }
        </div>
    );
}

export default Nweet;