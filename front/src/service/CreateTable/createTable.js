import firebase from 'firebase/app';
import {ref, set} from 'firebase/database';

import { db } from '../../components/firebase';

function createTable(userId, info){
        set(ref(db, 'rooms/' + userId), {
            info:info})
}

function addUser(){

}

export {createTable, addUser};