import firebase from 'firebase/app';
import {ref, set, push, update, get, remove} from 'firebase/database';
import { db } from '../../components/firebase';

// uid : 방을 만드는 유저의 user id 값
// roomName : 방 이름
async function createTable(uid, roomName){
    const unique_key = push(ref(db, 'rooms/')).key
    // set(ref(db, 'rooms/'), )
    addUser(unique_key, uid, true, roomName);
    return unique_key;
}

async function deleteUser(uid, roomId){
    const dbRef = ref(db, 'rooms/' + roomId + '/users/' + uid);

    return remove(dbRef);
}

async function addUser(roomId, uid, isOwner, roomName){
    let exist = false;
    get(ref(db, 'rooms/' + roomId + '/users/' + uid)).then((snapshot)=>{
        exist = snapshot.exists();
    })

    if (!exist){
        update(ref(db, 'rooms/' + roomId + '/users/' + uid),{
            isOwner : isOwner,
            timeTable : {}, // 시간표
        });

        update(ref(db, 'users/' + uid + '/belong/' + roomId),{
            roomName: roomName,
            isOnwer: isOwner,
        });
    }else{
        console.log('이미 존재하는 유저입니다.');
    }

    update(ref(db, 'rooms/' + roomId), {
        roomName : roomName,
    })
}

async function deleteTable(uid, roomId){
    const dbRef = ref(db, 'rooms/' + roomId);
    remove(dbRef);
    remove(ref(db, 'users/'+ uid + '/belong/' + roomId));
}

async function getMyTables(uid){
    return new Promise((resolve, rej) => {
        get(ref(db, 'users/' + uid)).then((snapshot)=>{
            resolve(snapshot.child('belong').exportVal());
        })
    })
    // let snapshot = await get(ref(db, 'users/' + uid));
    // console.log("ss : ", snapshot);

    // return;
}

export {createTable, addUser, getMyTables, deleteUser, deleteTable};