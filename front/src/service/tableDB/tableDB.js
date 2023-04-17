import firebase from 'firebase/app';
import {ref, set, push, update, get} from 'firebase/database';

import { db } from '../../components/firebase';

function createTable(uid, roomName){
    const unique_key = push(ref(db, 'rooms/')).key
    // set(ref(db, 'rooms/'), )
    addUser(unique_key, uid, true, roomName);
    return unique_key;
}

function addUser(key, uid, isOwner, roomName){
    let exist = false;
    get(ref(db, 'rooms/' + key + '/users/' + uid)).then((snapshot)=>{
        exist = snapshot.exists();
    })

    if (!exist){
        update(ref(db, 'rooms/' + key + '/users/' + uid),{
            isOwner : isOwner,
            timeTable : {}, // 시간표
        });

        update(ref(db, 'users/' + uid + '/belong/' + key),{
            roomName: roomName,
            isOnwer: isOwner,
        });
    }else{
        console.log('이미 존재하는 유저입니다.');
    }
    

    update(ref(db, 'rooms/' + key), {
        roomName : roomName,
    })
}

function getMyTableList(uid){
    return new Promise((resolve, rej) => {
        get(ref(db, 'users/' + uid)).then((snapshot)=>{
            resolve(snapshot.child('belong').exportVal());
        })
    })    

}

export {createTable, addUser, getMyTableList};