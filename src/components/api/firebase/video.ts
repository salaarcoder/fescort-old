import { collection, addDoc, doc, setDoc, updateDoc, query, orderBy, limit, getDocs, QueryDocumentSnapshot, DocumentData, startAfter } from 'firebase/firestore'
import { FB_DB } from '../../../services/firebase'
import { ICreateMovieFormData, IMovie } from '../../../interfaces';
import { getCurrentEpochTimestamp } from '../../../utils/timeUtil';

const videoCollection = process.env.REACT_APP_FB_VIDEO_COLLECTION as string;

const addVideoDocument = async (videoInput: ICreateMovieFormData) => {
  const _collRef = collection(FB_DB, videoCollection);
  const _docRef = doc(_collRef);
  const _doc: IMovie = {
    videoId: _docRef.id,
    title: videoInput.title,
    slug: videoInput.slug,
    url: videoInput.url,
    imageUrl: videoInput.imageUrl,
    actors: videoInput.actors,
    categories: videoInput.categories,
    channel: videoInput.channel,
    rank: videoInput.rank,
    tags: videoInput.tags,
    status: videoInput.status,
    createdAt: getCurrentEpochTimestamp(),
    updatedAt: getCurrentEpochTimestamp(),
  }
  await setDoc(_docRef, {
    ..._doc
  });
}

const updateVideoDocument = async (videoId: string, videoUpdateInput: any) => {
  const _updateDocRef = doc(FB_DB, videoCollection, videoId);
  await updateDoc(_updateDocRef, {
    ...videoUpdateInput,
  });
}

const getVideosFirstPage = async (pageSize: number) => {
  const _collRef = collection(FB_DB, videoCollection);
  const q = query(_collRef, orderBy('createdAt'), limit(pageSize));
  const querySnapshot = await getDocs(q);
  const lastCreatedAt = querySnapshot.docs[querySnapshot.docs.length - 1]?.get('createdAt'); // Get the last document
  const data = querySnapshot.docs.map(doc => ({ ...doc.data() }));
  return { data, lastCreatedAt };
}

const getVideosNextPage = async (pageSize: number, lastVisibleDoc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
  const _collRef = collection(FB_DB, videoCollection);
  const q = query(_collRef, orderBy('createdAt'), startAfter(lastVisibleDoc), limit(pageSize));
  const querySnapshot = await getDocs(q);
  const lastCreatedAt = querySnapshot.docs[querySnapshot.docs.length - 1]?.get('createdAt'); // Update the last document
  console.log({ docs: querySnapshot.docs, l: lastCreatedAt });
  const data = querySnapshot.docs.map(doc => ({ ...doc.data() }));
  return { data, lastCreatedAt };
}


// const readVideoDocument = async (videoId: string, videoUpdateInput: any) => {
//   const _updateDocRef = doc(FB_DB, videoCollection, videoId);
//   await updateDoc(_updateDocRef, {
//     ...videoUpdateInput,
//     updatedAt: getCurrentEpochTimestamp(),
//   });
// }

export {
  addVideoDocument, updateVideoDocument, getVideosFirstPage, getVideosNextPage
}
