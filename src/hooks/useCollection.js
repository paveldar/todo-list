import { useState, useEffect } from 'react'

import { db } from '../firebase/config'
import { collection, onSnapshot } from 'firebase/firestore'



export const useCollection = (c) => {
    const [documents, setDocuments] = useState(null)


useEffect(() => {
    const ref = collection(db, c)

    const unsub = onSnapshot(ref, (snapshot) => {
        let results = []
        snapshot.docs.forEach(doc => {
            results.push({...doc.data(), id: doc.id})
        })
        setDocuments(results)
    })
    return () => unsub()
  }, [c])

return { documents }
}