import firebase from 'firebase/app';
import { ref, set, push, update, get, remove } from 'firebase/database';
import { db } from '../../components/firebase';

//Room User Member

//==========Room==========
//Room은 다른 사람들과 시간표를 공유할 수 있는 가상 공간입니다.
//Create, Delete

/**
 * 방을 생성합니다. 만든 사람은 방의 생성자가 됩니다 (isOwner = true)
 * @param uid 유저 ID -> 방의 생성자가 됩니다.
 * @param roomName 방 이름
 * @example
 * const a = await createRoom('NgWIeqwe-Fjs8bhf9Ne', '까미일정');
 * 
 * @returns 만들어진 방의 ID를 반환합니다.
 */
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

/**
 * 해당 유저가 속해있는 방의 리스트를 반환합니다. 
 * @param uid 유저 ID
 * @returns roomInfo 배열로 반환합니다.
 */
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

/**
 * 방 ID로 방 이름을 가져옵니다.
 * @param roomId 방 ID
 * @returns 방 이름 (문자열)
 */
async function getRoomName(roomId: String) {
    let snapshot = await get(ref(db, 'rooms/' + roomId));
    let t = snapshot.exportVal().roomName;
    console.log(t);
    return t;
}

//==========User==========
//User는 STT 서비스를 사용하는 유저입니다.
//Create, Delete, getUserName

/**
 * 유저 닉네임을 받아 유저를 생성합니다.
 * @param uid 유저 ID
 * @param userName 유저 닉네임
 */
async function createUser(uid: String, userName: String): Promise<void> {
    set(ref(db, 'users/' + uid), {
        userName: userName,
    })
}

/**user를 삭제합니다.
 * @param uid 유저 아이디 문자열
 * rooms 에 있는 해당 유저도 삭제됩니다.
 */
async function deleteUser(uid: String): Promise<void> {
    //rooms 에 있는 해당 유저도 삭제됩니다.
    remove(ref(db, 'users/' + uid));
}

/** uid에 해당하는 닉네임을 가져옵니다.
 * @param uid 유저 아이디 문자열
 */
async function getUserName(uid: String): Promise<String> {
    const snapshot = await get(ref(db, 'users/' + uid + '/userName'));
    const t = snapshot.exportVal();
    return t;
}

//==========Member==========
//Member는 Room에 속하는 유저들입니다.
//addMember, removeMember

/**
 * Room에 멤버를 추가합니다
 * @param roomId 방 ID
 * @param uid 추가할 유저 아이디
 * @param isOwner 추가할 유저가 방의 생성자인지 여부
 */
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
/**
 * 방에서 멤버를 삭제합니다.
 * @param roomId 방 ID
 * @param uid 삭제할 유저 아이디
 */
async function removeMember(roomId: String, uid: String) {
    remove(ref(db, 'rooms/' + roomId + '/users/' + uid));
}

/**
 * 방의 멤버들을 가져옵니다.
 * @param roomId 방 ID
 * @returns uid 문자열 배열로 반환합니다.
 */
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
