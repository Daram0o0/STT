import firebase from 'firebase/app';
import { ref, set, push, update, get, remove } from 'firebase/database';
import { db } from '../../components/firebase';
import { schedule, time_table } from '../../interfaces';
import STTError from '../../Error';

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
    addMember(unique_key!, uid, true);
    return unique_key;
}

async function deleteRoom(roomId: String) {

    let members = await getMembers(roomId);
    for (let i = 0; i < members.length; i++) {
        let t = await get(ref(db, 'users/' + members[i].uid + '/belongs/'));
        let arrays = Object.entries(t.exportVal());
        // console.log(arrays);
        let filtered = arrays.filter((v, i) => {
            // console.log(i, v[1], roomId, v[1] == roomId);
            return v[1] != roomId;
        })
        // console.log(filtered);
        update(ref(db, 'users/' + members[i].uid + '/belongs/'), Object.fromEntries(filtered));

        for (let j = 0; j < arrays.length; j++) {
            if (arrays[j][1] == roomId) {
                await set(ref(db, 'users/' + members[i].uid + '/belongs/' + arrays[j][0]), null);
            }
        }
    }

    remove(ref(db, 'rooms/' + roomId));
}

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

    let ssObj = roomSnapshots.exportVal() as Object;
    if (ssObj == null || ssObj == undefined) {
        console.assert("no rooms");
        return [];
    }

    let roomIds = Object.values(ssObj);

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
 * 방 이름을 변경합니다.
 * @param roomId 방 ID
 * @param roomName 바꿀 방의 이름
 */
async function renameRoom(roomId: String, roomName: String) {
    set(ref(db, "rooms/" + roomId + "/roomName"), roomName);
}

/**
 * 방 ID로 방 이름을 가져옵니다.
 * @param roomId 방 ID
 * @returns 방 이름 (문자열)
 */
async function getRoomName(roomId: String): Promise<String> {
    let snapshot = await get(ref(db, 'rooms/' + roomId));
    let t = snapshot.exportVal().roomName;
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


async function renameUser(uid: String, userName: String) {
    set(ref(db, "users/" + uid + "/userName"), userName);
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
        update(ref(db, 'rooms/' + roomId + '/users/' + uid), {
            isOwner: isOwner,
            timeTable: {}, // 시간표
        });

        push(ref(db, 'users/' + uid + '/belongs'), roomId)
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
    //room에 있는 유저 삭제
    remove(ref(db, 'rooms/' + roomId + '/users/' + uid));
    let belongsSnapShot = await get(ref(db, 'users/' + uid + '/belongs'));
    let belongs = Object.entries(belongsSnapShot.exportVal());
    let filtered = belongs.filter((v, i) => {
        return v[1] != roomId;
    })
    //유저의 belongs에 있는 roomId 삭제
    set(ref(db, 'users/' + uid + '/belongs/'), Object.fromEntries(filtered));
}

interface memberInfo {
    uid: String,
    isOwner: boolean,
}

/**
 * 방의 멤버들을 가져옵니다.
 * @param roomId 방 ID
 * @returns uid 문자열 배열로 반환합니다.
 */
async function getMembers(roomId: String) {
    let snapshot = await get(ref(db, 'rooms/' + roomId + '/users'));
    let t = snapshot.exportVal();
    let entries = Object.entries(t);
    let members: memberInfo[] = [];
    for (let i = 0; i < entries.length; i++) {
        let info = entries[i];
        let uid = info[0];

        let isOwner = Object.values(info[1] as Object)[0];
        members.push({
            uid: uid,
            isOwner: isOwner,
        });
    }

    return members;
}
/**
 * 방의 소유권을 다른 사람으로 옮깁니다.
 * @param roomId 방 ID
 * @param ownerId 권한을 위임해 줄 멤버 (이전 주인) ID
 * @param targetId 권한을 위임 받을 멤버 ID
 */
async function delegateOwner(roomId: String, ownerId: String, targetId: String) {
    set(ref(db, "rooms/" + roomId + "/users/" + ownerId + "isOwner"), false);
    set(ref(db, "rooms/" + roomId + "/users/" + targetId + "isOwner"), true);
}

//Time table , Time blocks, Time block 시간표 생성 삭제 수정
async function addTimeTable(uid: String, timeTables: time_table) {
    update(ref(db, "users/" + uid + "/timeTables"), timeTables);
}

async function getTimeTable(uid: String) {
    let snapshot = await get(ref(db, 'users/' + uid + '/timeTables'));
    let obj = snapshot.exportVal() as time_table;
    if (obj == undefined || obj == null) {
        throw new STTError("timetable is missing.", 300);
    }
    if (obj.schedules == undefined || obj.schedules == null) {
        throw new STTError("schedules is missing", 301);
    }
    obj.schedules = Object.values(obj.schedules);
    return obj;
}

async function deleteTimeTable(uid: String) {
    update(ref(db, "users/" + uid + "/timeTables"), {});
}

export {
    createRoom, deleteRoom, getUserRooms, getRoomName, renameRoom, //Room
    getUserName, createUser, deleteUser, renameUser, //User
    addMember, removeMember, getMembers, delegateOwner, //Member
    addTimeTable, getTimeTable, deleteTimeTable //TimeTable
};
export type { roomInfo, memberInfo };
