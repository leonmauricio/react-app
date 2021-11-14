import { db } from './FirebaseConfig';
import { Comment } from './CommentInterface';
import { useState, useEffect, useContext } from 'react';
import { notification } from 'antd';
import { UserContext } from '../context/UserContext';
const useFirebaseDatabase = (collection = "comments") => {
    const [firebaseDocuments, setFirebaseDocuments] = useState<Array<Comment>>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        getAll();
    }, []);

    const save = (values: Comment) => {
        values.userId = user?.uid;
        values.email = user?.email;
        //values.email = user?.email;
        return db.collection(collection).doc().set(values).then((result) => {
            notification.info({ message: "Guardado exitosamente" });
        }).catch((err) => {
            notification.error({ message: "Ocurrió un error" });
        });;
    }

    const getAll = () => {
        if (user?.uid){
        setLoading(true);
            return db.collection(collection)
                .where("userId", "==", user?.uid)
                .onSnapshot(querySnapshot => {
                    const firebaseCollectionData: Array<Comment> = [];
                    querySnapshot.forEach(firebaseDoc => {
                        const doc: any = { ...firebaseDoc.data(), id: firebaseDoc.id };
                        firebaseCollectionData.push(doc);
                    });
                    setFirebaseDocuments(firebaseCollectionData);
                    setLoading(false);
                });
        }
    };

    const deleteComment = (id: string) => {
        db.collection(collection).doc(id).delete().then((result) => {
            notification.success({ message: "Eliminado exitosamente" });
        })
    }

    const update = (documentId: string, task: Comment) => {
        return db.collection(collection).doc(documentId).update(task);
    };

    return {
        save,
        getAll,
        deleteComment,
        update,
        loading,
        documents: firebaseDocuments
    }
}

export default useFirebaseDatabase;