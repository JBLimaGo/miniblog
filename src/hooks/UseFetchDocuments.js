import { useState, useEffect, use } from "react";
import { db } from "../firebase/config";
import {
  doc, getDoc
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, id) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // del with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadDocuments() {
      if (cancelled) return;

      setLoading(true);

      try {

        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef)

        setDocuments(docSnap.data())
        
        setLoading(false);
      } catch (error) {
        console.log(error)
        setError(error.message)
        
        setLoading(true);
      }     
    }

    loadDocuments();
  }, [docCollection,id, cancelled]);

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return { documents, error, loading };
};
