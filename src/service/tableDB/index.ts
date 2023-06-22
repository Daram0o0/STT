import firebase from 'firebase/app';
import { ref, set, push, update, get, remove } from 'firebase/database';
import { db } from '../../components/firebase';

//Room User Member

//==========Room==========
//Room은 다른 사람들과 시간표를 공유할 수 있는 가상 공간입니다.
//Create, Delete
async function createRoom(uid: String, roomName: String): Promise<String | null> {
    const unique_key = push(ref(db, 'rooms/')).key;

    update(ref(db, 'rooms/' + unique_key), {
        roomName: roomName
    })

    push(ref(db, 'users/' + uid + "/belongs"), unique_key)
    addMember(unique_key!, uid, true);
    return unique_key;
}

async function DeleteRoom(roomId: String) { }

type roomInfo = {
    roomId: String,
    roomName: String,
}

async function getUserRooms(uid: String): Promise<roomInfo[]> {

    let roomSnapshots = await get(ref(db, 'users/' + uid + "/belongs"));
    let roomIds = Object.values(roomSnapshots.exportVal() as Object);
    let roomInfos: roomInfo[] = [];

    for (let i = 0; i < roomIds.length; i++) {
        let room_name = await getRoomName(roomIds[i]);

        let info: roomInfo = {
            roomId: roomIds[i],
            roomName: room_name,
        }

        roomInfos.push(info);
    }

    return roomInfos;
}

async function getRoomName(roomId: String) {
    let snapshot = await get(ref(db, 'rooms/' + roomId));
    let t = snapshot.exportVal().roomName;
    console.log(t);
    return t;
}

//==========User==========
//User는 STT 서비스를 사용하는 유저입니다.
//Create, Delete, getUserName
async function createUser(uid: String, userName: String): Promise<void> {
    set(ref(db, 'users/' + uid), {
        userName: userName,
    })
}

//user를 삭제합니다.
//rooms 에 있는 해당 유저도 삭제됩니다.
async function deleteUser(uid: String): Promise<void> {
    //rooms 에 있는 해당 유저도 삭제됩니다.
    remove(ref(db, 'users/' + uid));
}

//uid에 해당하는 닉네임을 가져옵니다.
async function getUserName(uid: String): Promise<String> {
    return get(ref(db, 'users/' + uid)).then((e) => {
        return Object.entries(e.exportVal())[1] && "";
    }).catch((err) => {
        throw new Error(err);
    });
}

//==========Member==========
//Member는 Room에 속하는 유저들입니다.
//addMember, removeMember, 

async function addMember(roomId: String, uid: String, isOwner: boolean) {
    let exist = false;

    //유저 중복검사
    get(ref(db, 'rooms/' + roomId + '/users/' + uid)).then((snapshot) => {
        exist = snapshot.exists();
    })

    if (!exist) {
        getUserName(uid).then((user_name) => {
            update(ref(db, 'rooms/' + roomId + '/users/' + uid), {
                userName: user_name,
                isOwner: isOwner,
                timeTable: {}, // 시간표
            });

        })
    } else {
        console.log('이미 존재하는 유저입니다.');
    }
}

async function removeMember(roomId: String, uid: String) {
    remove(ref(db, 'rooms/' + roomId + '/users/' + uid));
}

function getMembers(roomId: String): String[] {
    var t: String[] = [];
    get(ref(db, 'rooms/' + roomId)).then((ss) => {
        t = ss.exportVal();
        console.log("t : ", t);
        // members = Object.entries(ss.exportVal());
    })

    return t;
}

//Time table , Time blocks, Time block 시간표 생성 삭제 수정
async function createTimeTable() {

}

async function deleteTimeTable() {

}

async function createTimeBlock() {

}

export { createRoom, DeleteRoom, getUserRooms, getUserName, createUser, deleteUser, addMember, removeMember, getMembers };
export type { roomInfo };
